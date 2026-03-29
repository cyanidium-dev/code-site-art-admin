import {defineArrayMember, defineField, defineType} from 'sanity'

/** Ячейка: текст + опционально выделение (простое форматирование). */
const ptTableCell = defineArrayMember({
  type: 'object',
  name: 'ptTableCell',
  title: 'Ячейка',
  fields: [
    defineField({
      name: 'text',
      title: 'Текст',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'strong',
      title: 'Жирный',
      type: 'boolean',
      description: 'Условное выделение на фронте (например semibold)',
      initialValue: false,
    }),
  ],
  preview: {
    select: {text: 'text', strong: 'strong'},
    prepare({text, strong}) {
      return {title: strong ? `${text} (жирн.)` : text || 'Ячейка'}
    },
  },
})

const ptTableRow = defineArrayMember({
  type: 'object',
  name: 'ptTableRow',
  title: 'Строка',
  fields: [
    defineField({
      name: 'cells',
      title: 'Ячейки',
      type: 'array',
      of: [ptTableCell],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {cells: 'cells'},
    prepare({cells}) {
      const preview = Array.isArray(cells)
        ? cells.map((c: {text?: string}) => c?.text).filter(Boolean).slice(0, 3).join(' · ')
        : ''
      return {title: preview || 'Строка'}
    },
  },
})

export const ptTable = defineType({
  name: 'ptTable',
  title: 'Таблица',
  type: 'object',
  fields: [
    defineField({
      name: 'caption',
      title: 'Подпись к таблице',
      type: 'string',
    }),
    defineField({
      name: 'hasHeaderRow',
      title: 'Первая строка — заголовок',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'rows',
      title: 'Строки',
      type: 'array',
      of: [ptTableRow],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {caption: 'caption', rows: 'rows'},
    prepare({caption, rows}) {
      const n = Array.isArray(rows) ? rows.length : 0
      return {
        title: caption || 'Таблица',
        subtitle: `${n} строк`,
      }
    },
  },
})
