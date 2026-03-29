/**
 * Собирает article1-sanity-content.json: ru (исправленный хвост), en, uk.
 */
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import {
  enParagraphs,
  ukParagraphs,
  tableEn,
  tableUk,
  enMeta,
  ukMeta,
  enTailBlocks,
  ukTailBlocks,
} from './article-translations.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const span = (text, marks = []) => ({_type: 'span', text, ...(marks.length ? {marks} : {})})
const p = (text) => ({_type: 'block', style: 'normal', children: [span(text)]})
const h2 = (text) => ({_type: 'block', style: 'h2', children: [span(text)]})
const h3 = (text) => ({_type: 'block', style: 'h3', children: [span(text)]})
const bullet = (text) => ({
  _type: 'block',
  style: 'normal',
  listItem: 'bullet',
  level: 1,
  children: [span(text)],
})
const lead = (bold, rest) => ({
  _type: 'block',
  style: 'normal',
  children: [span(bold, ['strong']), span(rest)],
})

function cloneBlockWithText(block, text) {
  const b = structuredClone(block)
  if (b._type !== 'block') return b
  if (b.children?.length === 1) {
    b.children[0].text = text
    delete b.children[0].marks
  }
  return b
}

function buildHeadFromTemplate(template, paragraphs, table) {
  const out = []
  let t = 0
  for (let i = 0; i < template.length; i++) {
    if (i === 9) {
      out.push(structuredClone(table))
      continue
    }
    const src = template[i]
    if (src._type === 'ptTable') continue
    out.push(cloneBlockWithText(src, paragraphs[t++]))
  }
  return out
}

const basePath = path.join(root, 'article1-sanity-content.json')
const base = JSON.parse(fs.readFileSync(basePath, 'utf8'))
const ruHead = base.ru.body.slice(0, 71)

const ruTail = [
  lead(
    'Конструктор',
    ' стоит выбирать, если вам нужен очень простой сайт, лендинг, временное решение, MVP или быстрый тест гипотезы.',
  ),
  lead(
    'WordPress',
    ' может подойти, если проект не слишком сложный, у вас ограниченный бюджет, и вы понимаете риски, связанные с плагинами, поддержкой и производительностью.',
  ),
  lead(
    'Кодовую разработку',
    ' нужно выбирать, если сайт это не просто «страничка в интернете», а полноценный бизнес-инструмент: с SEO, с ростом, с интеграциями, с нестандартной логикой, с каталогом, блогом, мультиязычностью, аналитикой, CRM и планами на масштабирование.',
  ),
  h2('Частые вопросы'),
  h3('Правда ли, что конструктор всегда дешевле?'),
  p(
    'На старте часто да. На дистанции очень часто нет. Подписки, доплаты, ограничения, комиссии, дорогие тарифы на росте и последующая миграция могут сделать его самым дорогим вариантом.',
  ),
  h3('Правда ли, что WordPress это «почти как код, только дешевле»?'),
  p(
    'Нет. WordPress это CMS с экосистемой плагинов. Он может быть удобным, но это не то же самое, что проект, собранный под конкретную бизнес-логику и архитектуру.',
  ),
  h3('Правда ли, что кодовая разработка подходит только крупным компаниям?'),
  p(
    'Нет. Она подходит всем, для кого сайт является рабочим инструментом, а не просто визиткой. Да, входной порог выше. Но в ряде ниш это окупается очень быстро.',
  ),
  h3('Можно ли сделать хороший сайт на WordPress?'),
  p(
    'Можно. Но вопрос в том, насколько долго он останется хорошим, если проект активно растёт, обрастает функциями и зависит от множества сторонних решений.',
  ),
  h3('Можно ли сделать хороший сайт на конструкторе?'),
  p(
    'Можно, если это небольшой проект без сложных требований. Но на долгой дистанции именно ограничения платформы чаще всего становятся главной проблемой.',
  ),
  h3('Кто владеет сайтом на конструкторе?'),
  p(
    'Вы владеете контентом и доменом, но не владеете системой в полноценном смысле. Вы зависите от платформы и её правил.',
  ),
  h3('Кто владеет сайтом на WordPress?'),
  p(
    'Чаще всего вы владеете доменом, хостингом, файлами и базой данных, но можете оставаться зависимыми от лицензий, плагинов и подрядчика.',
  ),
  h3('Кто владеет кодовым сайтом?'),
  p(
    'При нормальной передаче проекта владельцем являетесь вы. Это полноценный цифровой актив бизнеса.',
  ),
  h3('Что надёжнее?'),
  p(
    'При прочих равных самая предсказуемая и управляемая модель, это качественная кодовая разработка. Конструкторы зависят от платформы. WordPress зависит от экосистемы плагинов и качества сборки.',
  ),
  h2('Вывод'),
  p(
    'Если вам нужен сайт «лишь бы был», можно брать что угодно. Конструктор, WordPress, шаблон, неважно. Для такой задачи почти любое решение подойдёт.',
  ),
  p(
    'Но если вы строите бизнес, а не просто страницу, тогда сайт должен быть активом, а не набором компромиссов. Он должен быть быстрым, надёжным, масштабируемым, удобным в управлении, адаптированным под SEO и не превращаться в тыкву из-за того, что вы забыли оплатить очередную подписку или какой-то плагин решил умереть в самый неподходящий момент.',
  ),
  p(
    'Конструкторы хороши как временное решение. WordPress хорош как компромисс. Кодовая разработка хороша как система, на которой можно расти.',
  ),
  p(
    'И вот тут вся магия заканчивается простой мыслью: дешёвый сайт почти всегда дорогой в эксплуатации. А сайт, который изначально сделан как нормальный инструмент, почти всегда окупается лучше, чем вся эта бесконечная возня с подписками, плагинами, ограничениями и внезапными поломками.',
  ),
]

const out = {
  ru: {
    ...base.ru,
    body: [...ruHead, ...ruTail],
  },
  en: {
    title: enMeta.title,
    excerpt: enMeta.excerpt,
    body: [...buildHeadFromTemplate(ruHead, enParagraphs, tableEn), ...enTailBlocks],
    seo: enMeta.seo,
  },
  uk: {
    title: ukMeta.title,
    excerpt: ukMeta.excerpt,
    body: [...buildHeadFromTemplate(ruHead, ukParagraphs, tableUk), ...ukTailBlocks],
    seo: ukMeta.seo,
  },
}

const target = path.join(root, 'article1-sanity-content.json')
fs.writeFileSync(target, JSON.stringify(out, null, 2), 'utf8')
console.log('Wrote', target, 'blocks ru:', out.ru.body.length, 'en:', out.en.body.length, 'uk:', out.uk.body.length)
