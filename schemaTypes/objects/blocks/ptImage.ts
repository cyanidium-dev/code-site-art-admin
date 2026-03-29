import {defineField, defineType} from 'sanity'

export const ptImage = defineType({
  name: 'ptImage',
  title: 'Изображение',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      title: 'Файл',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt',
      type: 'string',
      description: 'Краткое описание для доступности и SEO',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'caption',
      title: 'Подпись',
      type: 'string',
    }),
    defineField({
      name: 'orientation',
      title: 'Ориентация',
      type: 'string',
      options: {
        list: [
          {title: 'Горизонтально', value: 'landscape'},
          {title: 'Вертикально', value: 'portrait'},
        ],
        layout: 'radio',
      },
      initialValue: 'landscape',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {media: 'asset', alt: 'alt', orientation: 'orientation'},
    prepare({media, alt, orientation}) {
      return {
        title: alt || 'Изображение',
        subtitle: orientation,
        media,
      }
    },
  },
})
