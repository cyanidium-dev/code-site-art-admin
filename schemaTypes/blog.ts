import {defineType, defineField} from 'sanity'
import {createMultilangField} from '../components/MultilangField'
import {createMultilangRichContentField} from '../components/MultilangField'

export const blogSchema = defineType({
  name: 'blog',
  title: 'Блог',
  type: 'document',
  fields: [
    // Название статьи
    {
      ...createMultilangField('name', 'Название статьи', 'Название статьи на разных языках'),
      fieldset: 'content',
    },

    // Описание статьи
    {
      ...createMultilangField(
        'description',
        'Описание статьи',
        'Краткое описание статьи на разных языках',
      ),
      fieldset: 'content',
    },

    // Слаг статьи
    {
      ...defineField({
        name: 'slug',
        title: 'Слаг',
        type: 'slug',
        description: 'URL-адрес статьи (например: my-awesome-article)',
        options: {
          source: 'name.ru',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      }),
      fieldset: 'content',
    },

    // Фото превью
    {
      ...defineField({
        name: 'previewImage',
        title: 'Фото превью',
        type: 'image',
        description: 'Главное фото статьи для превью',
        options: {
          hotspot: true,
        },
        validation: (Rule) => Rule.required(),
      }),
      fieldset: 'content',
    },

    // Фото главное мобильное
    {
      ...defineField({
        name: 'mainImageMobile',
        title: 'Фото главное (мобильное)',
        type: 'image',
        description: 'Главное фото статьи для мобильных устройств',
        options: {
          hotspot: true,
        },
        validation: (Rule) => Rule.required(),
      }),
      fieldset: 'content',
    },

    // Фото главное для компьютера
    {
      ...defineField({
        name: 'mainImageDesktop',
        title: 'Фото главное (компьютер)',
        type: 'image',
        description: 'Главное фото статьи для компьютера',
        options: {
          hotspot: true,
        },
        validation: (Rule) => Rule.required(),
      }),
      fieldset: 'content',
    },

    // Основной текст статьи (мультиязычный)
    {
      ...createMultilangRichContentField(
        'content',
        'Основной текст',
        'Основной контент статьи с поддержкой HTML разметки',
      ),
      fieldset: 'content',
    },

    // SEO поля
    {
      ...createMultilangField('seoTitle', 'SEO Заголовок', 'SEO заголовок на разных языках'),
      fieldset: 'seo',
    },

    {
      ...createMultilangField(
        'seoSubtitle',
        'SEO Подзаголовок',
        'SEO подзаголовок на разных языках',
      ),
      fieldset: 'seo',
    },

    {
      ...createMultilangField(
        'seoKeywords',
        'SEO Ключевые слова',
        'Ключевые слова для SEO на разных языках',
      ),
      fieldset: 'seo',
    },

    // Схема организации (JSON-файл)
    {
      ...defineField({
        name: 'schemaOrg',
        title: 'Схема организации',
        type: 'file',
        description: 'Завантажте JSON з даними для структурованої розмітки Schema.org',
        options: {
          accept: 'application/json',
        },
        validation: (Rule) => Rule.required().error('Завантажте JSON-файл Schema.org'),
      }),
      fieldset: 'seo',
    },

    // Порядок статьи
    {
      ...defineField({
        name: 'order',
        title: 'Порядок',
        type: 'number',
        description: 'Порядок статьи в списке (чем меньше число, тем выше в списке)',
        validation: (Rule) => Rule.required().integer().min(0),
      }),
      fieldset: 'settings',
    },
  ],

  // Предварительный просмотр в списке
  preview: {
    select: {
      title: 'name.ru',
      subtitle: 'description.ru',
      media: 'previewImage',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Без названия',
        subtitle: subtitle || 'Без описания',
        media: media,
      }
    },
  },

  // Группировка полей в админке
  fieldsets: [
    {
      name: 'content',
      title: 'Основной контент',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'seo',
      title: 'SEO настройки',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'settings',
      title: 'Настройки',
      options: {collapsible: true, collapsed: true},
    },
  ],
})
