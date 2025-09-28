import {defineType, defineField} from 'sanity'

// Блок с двумя параграфами текста
export const textBlockSchema = defineType({
  name: 'textBlock',
  title: 'Текстовый блок',
  type: 'object',
  fields: [
    {
      name: 'firstParagraph',
      title: 'Первый параграф',
      type: 'object',
      fields: [
        {
          name: 'ru',
          title: '[RU] Русский',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'en',
          title: '[EN] English',
          type: 'text',
          rows: 4,
        },
        {
          name: 'uk',
          title: '[UK] Українська',
          type: 'text',
          rows: 4,
        },
      ],
    },
    {
      name: 'secondParagraph',
      title: 'Второй параграф',
      type: 'object',
      fields: [
        {
          name: 'ru',
          title: '[RU] Русский',
          type: 'text',
          rows: 4,
        },
        {
          name: 'en',
          title: '[EN] English',
          type: 'text',
          rows: 4,
        },
        {
          name: 'uk',
          title: '[UK] Українська',
          type: 'text',
          rows: 4,
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'firstParagraph.ru',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title || 'Текстовый блок',
        subtitle: 'Два параграфа текста',
      }
    },
  },
})

// Блок с фото
export const imageBlockSchema = defineType({
  name: 'imageBlock',
  title: 'Фото блок',
  type: 'object',
  fields: [
    {
      name: 'mobileImage',
      title: 'Фото для мобильных',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'desktopImage',
      title: 'Фото для компьютера',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'Alt текст',
      type: 'object',
      fields: [
        {
          name: 'ru',
          title: '[RU] Русский',
          type: 'string',
        },
        {
          name: 'en',
          title: '[EN] English',
          type: 'string',
        },
        {
          name: 'uk',
          title: '[UK] Українська',
          type: 'string',
        },
      ],
    },
  ],
  preview: {
    select: {
      media: 'mobileImage',
      alt: 'alt.ru',
    },
    prepare(selection) {
      const {media, alt} = selection
      return {
        title: 'Фото блок',
        subtitle: alt || 'Без alt текста',
        media: media,
      }
    },
  },
})

// Блок с отзывом
export const reviewBlockSchema = defineType({
  name: 'reviewBlock',
  title: 'Блок отзыва',
  type: 'object',
  fields: [
    {
      name: 'review',
      title: 'Отзыв',
      type: 'reference',
      to: [{type: 'review'}],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'review.authorName.ru',
      subtitle: 'review.description.ru',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Отзыв не выбран',
        subtitle: subtitle || 'Без описания',
      }
    },
  },
})

