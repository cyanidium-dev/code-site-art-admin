import {reviewSchema} from './review'
import {projectSchema} from './project'
import {projectCategorySchema} from './projectCategory'
import {projectTypeSchema} from './projectType'
import {textBlockSchema, imageBlockSchema, reviewBlockSchema} from './projectBlock'
import {blogSchema} from './blog'

export const schemaTypes = [
  reviewSchema,
  projectSchema,
  projectCategorySchema,
  projectTypeSchema,
  textBlockSchema,
  imageBlockSchema,
  reviewBlockSchema,
  blogSchema,
]
