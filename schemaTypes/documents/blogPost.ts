import {defineField, defineType} from 'sanity'
import type {SanityDocument} from 'sanity'

function idsForUniquenessCheck(documentId: string | undefined): string[] {
  if (!documentId) return []
  if (documentId.startsWith('drafts.')) {
    const published = documentId.replace(/^drafts\./, '')
    return [documentId, published].filter(Boolean)
  }
  return [documentId, `drafts.${documentId}`]
}

type LocaleShape = {
  title?: string
  body?: unknown[]
} | null

type BlogPostDoc = SanityDocument & {
  ru?: LocaleShape
  slug?: {current?: string}
}

function pickDoc(doc: BlogPostDoc | null | undefined): BlogPostDoc | null {
  if (!doc) return null
  return doc
}

/**
 * Одна статья = один документ. Языки — вкладки RU / UK / EN (groups).
 * Статус заголовка по языкам — бейджи RU/UK/EN в шапке документа (document.badges).
 */
export const blogPost = defineType({
  name: 'blogPost',
  title: 'Статья блога',
  type: 'document',
  groups: [
    {name: 'ru', title: 'RU', default: true},
    {name: 'uk', title: 'UK'},
    {name: 'en', title: 'EN'},
    {name: 'shared', title: 'Общее'},
  ],
  validation: (Rule) =>
    Rule.custom((raw) => {
      const doc = pickDoc(raw as BlogPostDoc)
      if (!doc) {
        return true
      }
      const ru = doc.ru
      if (!ru?.title?.trim()) {
        return 'Укажите заголовок русской версии (вкладка RU)'
      }
      if (!Array.isArray(ru.body) || ru.body.length < 1) {
        return 'Добавьте текст статьи на русском (вкладка RU → Текст)'
      }
      const slugCurrent = doc.slug?.current?.trim()
      if (!slugCurrent) {
        return 'Укажите slug (вкладка Общее)'
      }
      return true
    }),
  fields: [
    defineField({
      name: 'ru',
      type: 'blogPostLocaleContent',
      title: 'Русский',
      description: 'Заголовок, текст и SEO для русской версии.',
      group: 'ru',
    }),
    defineField({
      name: 'uk',
      type: 'blogPostLocaleContent',
      title: 'Українська',
      description: 'Заголовок, текст и SEO для української версії.',
      group: 'uk',
    }),
    defineField({
      name: 'en',
      type: 'blogPostLocaleContent',
      title: 'English',
      description: 'Title, body and SEO for the English version.',
      group: 'en',
    }),

    defineField({
      name: 'coverImage',
      title: 'Обложка',
      description: 'Used for previews, cards and SEO',
      type: 'image',
      group: 'shared',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      description:
        'Короткий адрес без языка в строке. Генерируется из английского заголовка (если пуст — из русского). Можно править вручную. Не используйте префикс pending-.',
      type: 'slug',
      group: 'shared',
      options: {
        source: (doc: Record<string, unknown> | undefined) => {
          const en = doc?.en as {title?: string} | undefined
          const ru = doc?.ru as {title?: string} | undefined
          return en?.title || ru?.title || ''
        },
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-'),
      },
      validation: (Rule) =>
        Rule.required()
          .custom((value) => {
            const current = value?.current?.trim()
            if (!current) {
              return 'Укажите slug'
            }
            if (current.length < 3) {
              return 'Slug: минимум 3 символа'
            }
            if (current.toLowerCase().startsWith('pending-')) {
              return 'Slug не может начинаться с «pending-»'
            }
            return true
          })
          .custom(async (value, context) => {
            const current = value?.current?.trim()
            if (!current) return true
            const {document, getClient} = context
            const client = getClient({apiVersion: '2024-11-21'})
            const ids = await client.fetch<string[]>(
              `*[_type == "blogPost" && slug.current == $slug]._id`,
              {slug: current},
            )
            const exclude = new Set(idsForUniquenessCheck(document?._id as string | undefined))
            const conflict = ids.find((id) => !exclude.has(id))
            return conflict ? 'Статья с таким slug уже существует' : true
          }),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата публикации',
      description: 'Для сайта и сортировки списков. По умолчанию — текущий момент.',
      type: 'datetime',
      group: 'shared',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Автор',
      description: 'Имя на сайте.',
      type: 'string',
      group: 'shared',
      validation: (Rule) => Rule.max(120),
    }),
  ],
  orderings: [
    {
      title: 'Дата публикации (новые)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      ruTitle: 'ru.title',
      ukTitle: 'uk.title',
      enTitle: 'en.title',
      media: 'coverImage',
      slug: 'slug.current',
    },
    prepare({ruTitle, ukTitle, enTitle, media, slug}) {
      const title =
        (enTitle as string) || (ruTitle as string) || (ukTitle as string) || 'Без заголовка'
      return {
        title,
        subtitle: slug ? String(slug) : '',
        media,
      }
    },
  },
})
