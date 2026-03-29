import {defineArrayMember, defineField, defineType} from 'sanity'

const galleryItem = defineArrayMember({
  type: 'object',
  name: 'ptGalleryItem',
  title: 'Элемент галереи',
  fields: [
    defineField({
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt',
      type: 'string',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'caption',
      title: 'Подпись',
      type: 'string',
    }),
  ],
  preview: {
    select: {media: 'image', alt: 'alt'},
    prepare({media, alt}) {
      return {title: alt || 'Элемент', media}
    },
  },
})

export const ptGallery = defineType({
  name: 'ptGallery',
  title: 'Галерея',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Изображения',
      type: 'array',
      of: [galleryItem],
      validation: (Rule) => Rule.required().min(1).max(50),
    }),
    defineField({
      name: 'layout',
      title: 'Отображение',
      type: 'string',
      options: {
        list: [
          {title: 'Сетка', value: 'grid'},
          {title: 'Слайдер', value: 'slider'},
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    select: {items: 'items', layout: 'layout'},
    prepare({items, layout}) {
      const n = Array.isArray(items) ? items.length : 0
      return {
        title: 'Галерея',
        subtitle: `${n} фото · ${layout === 'slider' ? 'слайдер' : 'сетка'}`,
        media: items?.[0]?.image,
      }
    },
  },
})
