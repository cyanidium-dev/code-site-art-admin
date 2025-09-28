import React from 'react'
import {defineField} from 'sanity'
import {SUPPORTED_LANGUAGES} from '../config/languages'

// Функция для создания мультиязычного поля
export const createMultilangField = (name: string, title: string, description?: string) => {
  return defineField({
    name,
    title,
    description,
    type: 'object',
    fields: SUPPORTED_LANGUAGES.map((lang) => ({
      name: lang.id,
      title: `[${lang.id.toUpperCase()}] ${lang.title}`,
      type: 'string',
      validation: (Rule: any) => Rule.required().error(`Поле "${lang.title}" обязательно для заполнения`),
    })),
    validation: (Rule: any) => Rule.required().error('Необходимо заполнить хотя бы один язык'),
    options: {
      collapsible: true,
      collapsed: false,
    },
  })
}

// Функция для создания мультиязычного текстового поля (textarea)
export const createMultilangTextField = (name: string, title: string, description?: string) => {
  return defineField({
    name,
    title,
    description,
    type: 'object',
    fields: SUPPORTED_LANGUAGES.map((lang) => ({
      name: lang.id,
      title: `[${lang.id.toUpperCase()}] ${lang.title}`,
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required().error(`Поле "${lang.title}" обязательно для заполнения`),
    })),
    validation: (Rule: any) => Rule.required().error('Необходимо заполнить хотя бы один язык'),
    options: {
      collapsible: true,
      collapsed: false,
    },
  })
}
