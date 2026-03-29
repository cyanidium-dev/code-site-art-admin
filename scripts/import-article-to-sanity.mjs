/**
 * Импорт article1-sanity-content.json в Sanity как черновик blogPost.
 * Требует: SANITY_API_TOKEN с правами на запись (в `.env` или в окружении).
 * Запуск: node scripts/import-article-to-sanity.mjs
 */
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import {Buffer} from 'node:buffer'
import {createClient} from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

/** Подхватывает KEY=value из `.env` в корне (без пакета dotenv). */
function loadEnvFile() {
  try {
    const p = path.join(root, '.env')
    const s = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '')
    for (const line of s.split(/\r?\n/)) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const eq = t.indexOf('=')
      if (eq < 1) continue
      const key = t.slice(0, eq).trim()
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue
      let val = t.slice(eq + 1).trim().replace(/\r$/, '')
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      /* .env перекрывает уже заданные переменные окружения (иначе старый SANITY_API_TOKEN в системе ломает импорт) */
      process.env[key] = val.trim()
    }
  } catch {
    /* нет файла — ок */
  }
}

loadEnvFile()

/** 1×1 PNG — если в проекте ещё нет image assets */
const TINY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

const projectId = 'vh20xg14'
const dataset = 'production'
const apiVersion = '2024-11-21'

function k() {
  return Math.random().toString(36).slice(2, 10)
}

function prepBody(blocks) {
  if (!Array.isArray(blocks)) return blocks
  return blocks.map((b) => {
    if (b._type === 'block') {
      return {
        _key: k(),
        _type: 'block',
        style: b.style || 'normal',
        ...(b.listItem ? {listItem: b.listItem, level: b.level ?? 1} : {}),
        children: (b.children || []).map((s) => ({
          _key: k(),
          _type: 'span',
          text: s.text ?? '',
          ...(Array.isArray(s.marks) && s.marks.length ? {marks: s.marks} : {}),
        })),
      }
    }
    if (b._type === 'ptTable') {
      return {
        _key: k(),
        _type: 'ptTable',
        caption: b.caption,
        hasHeaderRow: Boolean(b.hasHeaderRow),
        rows: (b.rows || []).map((r) => ({
          _key: k(),
          _type: 'ptTableRow',
          cells: (r.cells || []).map((c) => ({
            _key: k(),
            _type: 'ptTableCell',
            text: c.text,
            ...(c.strong ? {strong: true} : {}),
          })),
        })),
      }
    }
    return {_key: k(), ...b}
  })
}

function prepLocale(loc) {
  if (!loc) return loc
  return {
    title: loc.title,
    excerpt: loc.excerpt,
    body: prepBody(loc.body),
    seo: loc.seo
      ? {
          metaTitle: loc.seo.metaTitle,
          metaDescription: loc.seo.metaDescription,
          ogTitle: loc.seo.ogTitle,
          ogDescription: loc.seo.ogDescription,
        }
      : undefined,
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .slice(0, 96)
}

async function main() {
  const token = String(process.env.SANITY_API_TOKEN || '').trim()
  if (!token) {
    console.error('Задайте SANITY_API_TOKEN в `.env` (одна строка, без кавычек) или в окружении.')
    process.exit(1)
  }
  const client = createClient({projectId, dataset, apiVersion, token, useCdn: false})

  const raw = JSON.parse(fs.readFileSync(path.join(root, 'article1-sanity-content.json'), 'utf8'))

  let coverRef = await client.fetch(
    `*[_type == "blogPost" && defined(coverImage.asset)][0].coverImage.asset._ref`,
  )
  if (!coverRef) {
    coverRef = await client.fetch(`*[_type == "sanity.imageAsset"][0]._id`)
  }
  if (!coverRef) {
    const asset = await client.assets.upload('image', TINY_PNG, {
      filename: 'article-placeholder-1x1.png',
      contentType: 'image/png',
    })
    coverRef = asset._id
    console.log('Загружен placeholder-asset для обложки:', coverRef)
  }

  const enTitle = raw.en?.title || ''
  const slugCurrent = slugify(enTitle || raw.ru?.title || 'blog-post-article-1')

  const doc = {
    _id: `drafts.article-import-${Date.now()}`,
    _type: 'blogPost',
    ru: prepLocale(raw.ru),
    uk: prepLocale(raw.uk),
    en: prepLocale(raw.en),
    slug: {_type: 'slug', current: slugCurrent},
    publishedAt: new Date().toISOString(),
    coverImage: {
      _type: 'image',
      asset: {_type: 'reference', _ref: coverRef},
    },
    author: 'Редакция',
  }

  const res = await client.createOrReplace(doc)
  console.log('Создан/обновлён черновик:', res._id)
  console.log('Slug:', slugCurrent)
  console.log('Откройте Sanity Studio → Статья блога → черновик с этим slug.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
