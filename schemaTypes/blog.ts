import {defineType, defineField} from 'sanity'
import {createMultilangField} from '../components/MultilangField'

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
      ...createMultilangField('description', 'Описание статьи', 'Краткое описание статьи на разных языках'),
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
    
    // Основной текст статьи
    {
      ...defineField({
        name: 'content',
        title: 'Основной текст',
        type: 'array',
        description: 'Основной контент статьи с поддержкой HTML разметки',
        of: [
          {
            type: 'block',
            styles: [
              {title: 'Обычный', value: 'normal'},
              {title: 'Заголовок 1', value: 'h1'},
              {title: 'Заголовок 2', value: 'h2'},
              {title: 'Заголовок 3', value: 'h3'},
              {title: 'Заголовок 4', value: 'h4'},
              {title: 'Цитата', value: 'blockquote'},
            ],
            lists: [
              {title: 'Маркированный список', value: 'bullet'},
              {title: 'Нумерованный список', value: 'number'},
            ],
            marks: {
              decorators: [
                {title: 'Жирный', value: 'strong'},
                {title: 'Курсив', value: 'em'},
                {title: 'Подчеркнутый', value: 'underline'},
                {title: 'Зачеркнутый', value: 'strike-through'},
              ],
              annotations: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'Ссылка',
                  fields: [
                    {
                      name: 'href',
                      type: 'url',
                      title: 'URL',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'blank',
                      type: 'boolean',
                      title: 'Открыть в новой вкладке',
                      initialValue: true,
                    },
                  ],
                },
              ],
            },
          },
          {
            type: 'image',
            title: 'Изображение',
            options: {
              hotspot: true,
            },
          },
        ],
        validation: (Rule) => Rule.required().min(1).error('Добавьте контент статьи'),
      }),
      fieldset: 'content',
    },
    
    // SEO поля
    {
      ...createMultilangField('seoTitle', 'SEO Заголовок', 'SEO заголовок на разных языках'),
      fieldset: 'seo',
    },
    
    {
      ...createMultilangField('seoSubtitle', 'SEO Подзаголовок', 'SEO подзаголовок на разных языках'),
      fieldset: 'seo',
    },
    
    {
      ...createMultilangField('seoKeywords', 'SEO Ключевые слова', 'Ключевые слова для SEO на разных языках'),
      fieldset: 'seo',
    },
    
    // Схема организации
    {
      ...defineField({
        name: 'schemaOrg',
        title: 'Схема организации',
        type: 'object',
        description: 'Данные для структурированной разметки Schema.org',
        fields: [
          {
            name: 'type',
            title: 'Тип контента',
            type: 'string',
            options: {
              list: [
                {title: 'Статья', value: 'Article'},
                {title: 'Блог пост', value: 'BlogPosting'},
                {title: 'Новость', value: 'NewsArticle'},
              ],
              layout: 'dropdown',
            },
            initialValue: 'Article',
            validation: (Rule) => Rule.required(),
          },
          {
            ...createMultilangField('author', 'Автор', 'Имя автора на разных языках'),
            validation: (Rule) => Rule.required(),
          },
          {
            ...createMultilangField('publisher', 'Издатель', 'Название издателя на разных языках'),
            validation: (Rule) => Rule.required(),
          },
        ],
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
