import {defineType, defineField} from 'sanity'
import {createMultilangField} from '../components/MultilangField'

export const projectTypeSchema = defineType({
  name: 'projectType',
  title: 'Тип проекта',
  type: 'document',
  fields: [
    // Название типа
    createMultilangField('name', 'Название типа', 'Название типа проекта на разных языках'),
    
    // Иконка типа
    defineField({
      name: 'icon',
      title: 'Иконка',
      type: 'string',
      description: 'Название иконки (например: web, mobile, design)',
      validation: (Rule) => Rule.required(),
    }),
  ],
  
  // Предварительный просмотр в списке
  preview: {
    select: {
      title: 'name.ru',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title || 'Без названия',
      }
    },
  },
})
