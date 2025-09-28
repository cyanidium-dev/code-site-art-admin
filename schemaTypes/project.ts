import {defineType, defineField} from 'sanity'
import {createMultilangField} from '../components/MultilangField'

export const projectSchema = defineType({
  name: 'project',
  title: 'Проект',
  type: 'document',
  fields: [
    // Название проекта
    {
      ...createMultilangField('name', 'Название проекта', 'Название проекта на разных языках'),
      fieldset: 'content',
    },
    
    // Краткое описание
    {
      ...createMultilangField('shortDescription', 'Краткое описание', 'Краткое описание проекта на разных языках'),
      fieldset: 'content',
    },
    
    // Слаг проекта
    {
      ...defineField({
        name: 'slug',
        title: 'Слаг',
        type: 'slug',
        description: 'URL-адрес проекта (например: my-awesome-project)',
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
        description: 'Главное фото проекта для превью',
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
        description: 'Главное фото проекта для мобильных устройств',
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
        description: 'Главное фото проекта для компьютера',
        options: {
          hotspot: true,
        },
        validation: (Rule) => Rule.required(),
      }),
      fieldset: 'content',
    },
    
    // Категории проекта
    {
      ...defineField({
        name: 'categories',
        title: 'Категории',
        type: 'array',
        description: 'Выберите одну или несколько категорий для проекта',
        of: [
          {
            type: 'reference',
            to: [{type: 'projectCategory'}],
          },
        ],
        validation: (Rule) => Rule.required().min(1).error('Выберите хотя бы одну категорию'),
      }),
      fieldset: 'content',
    },
    
    // Тип проекта
    {
      ...defineField({
        name: 'type',
        title: 'Тип',
        type: 'reference',
        to: [{type: 'projectType'}],
        validation: (Rule) => Rule.required(),
      }),
      fieldset: 'content',
    },
    
    // Блоки проекта
    {
      ...defineField({
        name: 'blocks',
        title: 'Блоки проекта',
        type: 'array',
        description: 'Добавьте блоки для проекта (текст, фото, отзыв)',
        of: [
          {
            type: 'textBlock',
            title: 'Текстовый блок',
          },
          {
            type: 'imageBlock',
            title: 'Фото блок',
          },
          {
            type: 'reviewBlock',
            title: 'Блок отзыва',
          },
        ],
        validation: (Rule) => Rule.required().min(1).error('Добавьте хотя бы один блок'),
      }),
      fieldset: 'content',
    },
    
    // Порядок проекта
    {
      ...defineField({
        name: 'order',
        title: 'Порядок',
        type: 'number',
        description: 'Порядок проекта в списке (чем меньше число, тем выше в списке)',
        validation: (Rule) => Rule.required().integer().min(0),
      }),
      fieldset: 'settings',
    },
    
  ],
  
  // Предварительный просмотр в списке
  preview: {
    select: {
      title: 'name.ru',
      subtitle: 'shortDescription.ru',
      media: 'previewImage',
      categories: 'categories[].name.ru',
      type: 'type.name.ru',
    },
    prepare(selection) {
      const {title, subtitle, media, categories, type} = selection
      const categoriesText = categories && categories.length > 0 
        ? categories.join(', ') 
        : 'Без категорий'
      return {
        title: title || 'Без названия',
        subtitle: `${categoriesText} • ${type || 'Без типа'} • ${subtitle || 'Без описания'}`,
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
      name: 'settings',
      title: 'Настройки',
      options: {collapsible: true, collapsed: true},
    },
  ],
})

