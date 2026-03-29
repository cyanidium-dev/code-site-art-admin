import {reviewSchema} from './review'
import {projectSchema} from './project'
import {projectCategorySchema} from './projectCategory'
import {projectTypeSchema} from './projectType'
import {textBlockSchema, imageBlockSchema, reviewBlockSchema} from './projectBlock'
import {blogPostLocaleContent} from './objects/blogPostLocaleContent'
import {blogPost} from './documents/blogPost'
import {blogPostBody} from './objects/ptBody'
import {ptImage} from './objects/blocks/ptImage'
import {ptGallery} from './objects/blocks/ptGallery'
import {ptTable} from './objects/blocks/ptTable'
import {ptCta} from './objects/blocks/ptCta'
import {quoteBlock} from './objects/blocks/quoteBlock'

export const schemaTypes = [
  reviewSchema,
  projectSchema,
  projectCategorySchema,
  projectTypeSchema,
  textBlockSchema,
  imageBlockSchema,
  reviewBlockSchema,
  ptImage,
  ptGallery,
  ptTable,
  ptCta,
  quoteBlock,
  blogPostLocaleContent,
  blogPostBody,
  blogPost,
]
