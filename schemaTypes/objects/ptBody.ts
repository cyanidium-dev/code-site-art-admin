import {defineArrayMember, defineType} from 'sanity'

/**
 * Тело статьи: Portable Text + кастомные блоки.
 * Внутренние ссылки только на blogPost (локаль и slug резолвятся в GROQ на фронте).
 */
export const blogPostBody = defineType({
  name: 'blogPostBody',
  title: 'Текст статьи',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Параграф', value: 'normal'},
        {title: 'Заголовок 2', value: 'h2'},
        {title: 'Заголовок 3', value: 'h3'},
        {title: 'Цитата', value: 'blockquote'},
      ],
      lists: [
        {title: 'Маркированный', value: 'bullet'},
        {title: 'Нумерованный', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Жирный', value: 'strong'},
          {title: 'Курсив', value: 'em'},
          {title: 'Подчёркнутый', value: 'underline'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Внешняя ссылка',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) => Rule.required(),
              },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: 'Новая вкладка',
                initialValue: true,
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Внутренняя ссылка (статья)',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Статья',
                to: [{type: 'blogPost'}],
                options: {disableNew: true},
                validation: (Rule) => Rule.required(),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({type: 'ptImage'}),
    defineArrayMember({type: 'ptGallery'}),
    defineArrayMember({type: 'ptTable'}),
    defineArrayMember({type: 'ptCta'}),
    defineArrayMember({type: 'quoteBlock'}),
  ],
})
