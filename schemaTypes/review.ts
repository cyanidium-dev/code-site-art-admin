import {defineType, defineField} from 'sanity'
import {createMultilangField, createMultilangTextField} from '../components/MultilangField'

export const reviewSchema = defineType({
  name: 'review',
  title: 'Отзыв',
  type: 'document',
  fields: [
    // Имя автора отзыва
    {
      ...createMultilangField('authorName', 'Имя автора', 'Имя человека, оставившего отзыва'),
      fieldset: 'content',
    },
    
    // Описание отзыва
    {
      ...createMultilangTextField('description', 'Описание отзыва', 'Текст отзыва на разных языках'),
      fieldset: 'content',
    },
    
    // Ссылка на проект (опционально)
    {
      ...defineField({
        name: 'projectLink',
        title: 'Ссылка на проект',
        type: 'url',
        description: 'Ссылка на проект автора отзыва (необязательно)',
      }),
      fieldset: 'content',
    },
    
    // Тип контента - переключатель между видео и текстом
    {
      ...defineField({
        name: 'contentType',
        title: 'Тип контента',
        type: 'string',
        options: {
          list: [
            {title: 'Видео', value: 'video'},
            {title: 'Текст', value: 'text'},
          ],
          layout: 'radio',
        },
        initialValue: 'text',
        validation: (Rule) => Rule.required(),
      }),
      fieldset: 'content',
    },
    
    // Ссылка на видео (показывается только если выбран тип "видео")
    {
      ...defineField({
        name: 'videoUrl',
        title: 'Ссылка на видео',
        type: 'url',
        description: 'Ссылка на видео отзыва (YouTube, Vimeo и т.д.)',
        hidden: ({document}) => document?.contentType !== 'video',
        validation: (Rule) => Rule.custom((value, context) => {
          const contentType = context.document?.contentType
          if (contentType === 'video' && !value) {
            return 'Ссылка на видео обязательна при выборе типа "Видео"'
          }
          return true
        }),
      }),
      fieldset: 'content',
    },
    
    // Текст отзыва (показывается только если выбран тип "текст")
    {
      ...createMultilangTextField('reviewText', 'Текст отзыва', 'Текст отзыва на разных языках'),
      fieldset: 'content',
      hidden: ({document}) => document?.contentType !== 'text',
      validation: (Rule) => Rule.custom((value, context) => {
        const contentType = context.document?.contentType
        if (contentType === 'text' && (!value || !value.ru)) {
          return 'Текст отзыва обязателен при выборе типа "Текст"'
        }
        return true
      }),
    },
    
    // Рейтинг отзыва (опционально)
    {
      ...defineField({
        name: 'rating',
        title: 'Рейтинг',
        type: 'number',
        description: 'Рейтинг от 1 до 5 звезд (необязательно)',
        validation: (Rule) => Rule.min(1).max(5).integer(),
      }),
      fieldset: 'settings',
    },
    
    // Порядок отзыва в списке
    {
      ...defineField({
        name: 'order',
        title: 'Порядок',
        type: 'number',
        description: 'Порядок отзыва в списке (чем меньше число, тем выше в списке)',
        validation: (Rule) => Rule.required().integer().min(0),
      }),
      fieldset: 'settings',
    },
    
    // Дата создания отзыва
    {
      ...defineField({
        name: 'createdAt',
        title: 'Дата создания',
        type: 'datetime',
        initialValue: () => new Date().toISOString(),
        readOnly: true,
      }),
      fieldset: 'settings',
    },
    
    // Статус отзыва
    {
      ...defineField({
        name: 'status',
        title: 'Статус',
        type: 'string',
        options: {
          list: [
            {title: 'Опубликован', value: 'published'},
            {title: 'Черновик', value: 'draft'},
            {title: 'Архив', value: 'archived'},
          ],
          layout: 'radio',
        },
        initialValue: 'draft',
        validation: (Rule) => Rule.required(),
      }),
      fieldset: 'settings',
    },
  ],
  
  // Предварительный просмотр в списке
  preview: {
    select: {
      title: 'authorName.ru',
      subtitle: 'description.ru',
      projectLink: 'projectLink',
      status: 'status',
    },
    prepare(selection) {
      const {title, subtitle, projectLink, status} = selection
      const statusEmoji = {
        published: '[OK]',
        draft: '[DRAFT]',
        archived: '[ARCHIVE]',
      }[status] || '[DRAFT]'
      
      return {
        title: title || 'Без имени',
        subtitle: `${statusEmoji} ${subtitle || 'Без описания'}`,
        media: projectLink ? 'link' : undefined,
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
      name: 'settings',
      title: 'Настройки',
      options: {collapsible: true, collapsed: true},
    },
  ],
})