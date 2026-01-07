import {defineType, defineField} from 'sanity'
import {createMultilangField, createMultilangArrayField} from '../components/MultilangField'

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

    // Название клиента
    {
      ...createMultilangField(
        'clientName',
        'Название клиента',
        'Название клиента на разных языках',
      ),
      fieldset: 'content',
    },

    // Краткое описание
    {
      ...createMultilangField(
        'shortDescription',
        'Краткое описание',
        'Краткое описание проекта на разных языках',
      ),
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
          source: (doc: any) => {
            const clientName = doc?.clientName?.uk || ''
            const projectName = doc?.name?.uk || ''
            return `${clientName}-${projectName}`.toLowerCase().replace(/\s+/g, '-')
          },
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
      fieldset: 'portfolio',
    },

    // Фото главное
    {
      ...defineField({
        name: 'mainImageDesktop',
        title: 'Фото главное',
        type: 'image',
        description: 'Главное фото проекта',
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
        // validation: (Rule) => Rule.required().min(1).error('Добавьте хотя бы один блок'),
      }),
      fieldset: 'content',
    },

    // Ссылка на сайт
    {
      ...defineField({
        name: 'websiteUrl',
        title: 'Ссылка на сайт',
        type: 'url',
        description: 'Внешняя ссылка на сайт проекта (должна начинаться с https)',
        validation: (Rule) =>
          Rule.required()
            .uri({
              scheme: ['https'],
            })
            .error('Ссылка должна начинаться с https'),
      }),
      fieldset: 'content',
    },

    // Преимущества
    {
      ...createMultilangArrayField(
        'advantages',
        'Преимущества',
        'Список преимуществ проекта на разных языках',
      ),
      fieldset: 'portfolio',
    },

    // Заголовок для секции портфолио
    {
      ...createMultilangField(
        'portfolioTitle',
        'Заголовок',
        'Заголовок для секции портфолио на главной странице',
      ),
      fieldset: 'portfolio',
    },

    // Описание для секции портфолио
    {
      ...createMultilangField(
        'portfolioDescription',
        'Описание',
        'Описание для секции портфолио на главной странице',
      ),
      fieldset: 'portfolio',
    },

    // Начальный цвет градиента
    {
      ...defineField({
        name: 'gradientStartColor',
        title: 'Начальный цвет градиента',
        type: 'color',
        description: 'Начальный цвет градиента фона секции портфолио',
        options: {
          disableAlpha: true,
        },
        validation: (Rule) =>
          Rule.required().error('Обязательно выберите начальный цвет градиента'),
      }),
      fieldset: 'portfolio',
    },

    // Конечный цвет градиента
    {
      ...defineField({
        name: 'gradientEndColor',
        title: 'Конечный цвет градиента',
        type: 'color',
        description: 'Конечный цвет градиента фона секции портфолио',
        options: {
          disableAlpha: true,
        },
        validation: (Rule) => Rule.required().error('Обязательно выберите конечный цвет градиента'),
      }),
      fieldset: 'portfolio',
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
      subtitle: 'clientName.ru',
      media: 'previewImage',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Без названия',
        subtitle: subtitle || 'Без клиента',
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
      name: 'portfolio',
      title: 'Секция портфолио на главной странице',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'settings',
      title: 'Настройки',
      options: {collapsible: true, collapsed: true},
    },
  ],
})
