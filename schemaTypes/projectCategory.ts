import {defineType, defineField} from 'sanity'
import {createMultilangField} from '../components/MultilangField'

export const projectCategorySchema = defineType({
  name: 'projectCategory',
  title: 'Категория проекта',
  type: 'document',
  fields: [
    // Название категории
    createMultilangField('name', 'Название категории', 'Название категории проекта на разных языках'),
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
