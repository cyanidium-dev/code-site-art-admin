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
      validation: (Rule: any) =>
        Rule.required().error(`Поле "${lang.title}" обязательно для заполнения`),
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
      validation: (Rule: any) =>
        Rule.required().error(`Поле "${lang.title}" обязательно для заполнения`),
    })),
    validation: (Rule: any) => Rule.required().error('Необходимо заполнить хотя бы один язык'),
    options: {
      collapsible: true,
      collapsed: false,
    },
  })
}

// Функция для создания мультиязычного поля с массивом строк
export const createMultilangArrayField = (name: string, title: string, description?: string) => {
  return defineField({
    name,
    title,
    description,
    type: 'object',
    fields: SUPPORTED_LANGUAGES.map((lang) => ({
      name: lang.id,
      title: `[${lang.id.toUpperCase()}] ${lang.title}`,
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule: any) =>
        Rule.required().min(1).error(`Добавьте хотя бы один элемент для "${lang.title}"`),
    })),
    validation: (Rule: any) => Rule.required().error('Необходимо заполнить хотя бы один язык'),
    options: {
      collapsible: true,
      collapsed: false,
    },
  })
}

// Функция для создания мультиязычного поля с богатым контентом (Portable Text + изображения)
export const createMultilangRichContentField = (
  name: string,
  title: string,
  description?: string,
) => {
  return defineField({
    name,
    title,
    description,
    type: 'object',
    fields: SUPPORTED_LANGUAGES.map((lang) => ({
      name: lang.id,
      title: `[${lang.id.toUpperCase()}] ${lang.title}`,
      type: 'array',
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
                    validation: (Rule: any) => Rule.required(),
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
      validation: (Rule: any) => Rule.required().min(1).error('Добавьте контент статьи'),
    })),
    validation: (Rule: any) => Rule.required().error('Необходимо заполнить хотя бы один язык'),
    options: {
      collapsible: true,
      collapsed: false,
    },
  })
}
