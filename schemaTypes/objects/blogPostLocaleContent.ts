import {defineField, defineType} from 'sanity'

type LocaleBlock = {
  title?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogTitle?: string
    ogDescription?: string
  }
} | null

/**
 * Контент и SEO для одного языка внутри единого документа blogPost.
 * Порядок: заголовок → анонс → тело → SEO (внизу, сворачиваемый блок).
 */
export const blogPostLocaleContent = defineType({
  name: 'blogPostLocaleContent',
  title: 'Контент языка',
  type: 'object',
  validation: (Rule) =>
    Rule.custom((block) => {
      const b = block as LocaleBlock
      if (!b?.title?.trim()) {
        return true
      }
      const seo = b.seo
      if (!seo?.metaTitle?.trim()) {
        return 'Заполните SEO: meta title (есть заголовок статьи)'
      }
      if (!seo?.metaDescription?.trim()) {
        return 'Заполните SEO: meta description (есть заголовок статьи)'
      }
      return true
    }),
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      description: 'Заголовок статьи на этом языке.',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'excerpt',
      title: 'Краткое описание',
      description: 'Анонс для списков и карточек.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'body',
      title: 'Текст',
      description: 'Основной текст: абзацы, блоки, изображения.',
      type: 'blogPostBody',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description:
        'Метаданные для поиска и соцсетей на этом языке. Обязательны, если заполнен заголовок статьи выше.',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta title',
          description:
            'Тег <title> и основной заголовок сниппета в поиске. Обычно близок к заголовку статьи, до ~60 символов. Обязателен, если заполнен заголовок статьи.',
          type: 'string',
          validation: (Rule) => Rule.max(70),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta description',
          description:
            'Краткое описание под заголовком в выдаче (meta description). Ориентир до ~160 символов. Обязателен, если заполнен заголовок статьи.',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(320),
        }),
        defineField({
          name: 'ogTitle',
          title: 'Open Graph title',
          description:
            'Заголовок при расшаривании (og:title). Если пусто, чаще подставляют meta title на фронте.',
          type: 'string',
          validation: (Rule) => Rule.max(100),
        }),
        defineField({
          name: 'ogDescription',
          title: 'Open Graph description',
          description:
            'Текст превью в соцсетях (og:description). Если пусто, можно использовать meta description.',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(320),
        }),
      ],
    }),
  ],
})
