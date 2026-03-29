import {defineField, defineType} from 'sanity'

export const ptCta = defineType({
  name: 'ptCta',
  title: 'Кнопка / CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Текст',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'variant',
      title: 'Стиль',
      type: 'string',
      options: {
        list: [
          {title: 'Основной', value: 'primary'},
          {title: 'Вторичный', value: 'secondary'},
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Размер',
      type: 'string',
      options: {
        list: [
          {title: 'Маленький', value: 'sm'},
          {title: 'Средний', value: 'md'},
          {title: 'Крупный', value: 'lg'},
        ],
        layout: 'radio',
      },
      initialValue: 'md',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Иконка (имя)',
      type: 'string',
      description: 'Ключ иконки для фронта (например lucide:arrow-right)',
    }),
    defineField({
      name: 'externalUrl',
      title: 'Внешний URL',
      type: 'url',
    }),
    defineField({
      name: 'internalReference',
      title: 'Внутренняя статья',
      type: 'reference',
      to: [{type: 'blogPost'}],
      options: {disableNew: true},
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Открывать в новой вкладке',
      type: 'boolean',
      description: 'Для внешних ссылок',
      initialValue: false,
    }),
    defineField({
      name: 'trackingId',
      title: 'ID для аналитики',
      type: 'string',
      description: 'Стабильный идентификатор события (data-analytics / GTM)',
    }),
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      const url = fields?.externalUrl
      const ref = fields?.internalReference
      if (url && ref) {
        return 'Укажите либо внешний URL, либо внутреннюю статью'
      }
      if (!url && !ref) {
        return 'Нужен внешний URL или внутренняя статья'
      }
      return true
    }),
  preview: {
    select: {
      label: 'label',
      variant: 'variant',
      size: 'size',
      url: 'externalUrl',
    },
    prepare({label, variant, size, url}) {
      return {
        title: label || 'CTA',
        subtitle: [url ? 'внешняя' : 'внутр.', variant, size].filter(Boolean).join(' · '),
      }
    },
  },
})
