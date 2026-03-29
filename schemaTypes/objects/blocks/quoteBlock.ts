import {defineField, defineType} from 'sanity'

export const quoteBlock = defineType({
  name: 'quoteBlock',
  title: 'Цитата',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Текст',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Автор / источник',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Должность / подзаголовок',
      type: 'string',
    }),
  ],
  preview: {
    select: {text: 'text', author: 'author'},
    prepare({text, author}) {
      const t = typeof text === 'string' ? text : ''
      return {
        title: t.slice(0, 80) + (t.length > 80 ? '…' : ''),
        subtitle: author,
      }
    },
  },
})
