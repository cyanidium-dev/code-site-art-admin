import {DocumentBadgeComponent} from 'sanity'
import type {SanityDocument} from 'sanity'

function titleOk(doc: SanityDocument | null, key: 'ru' | 'uk' | 'en'): boolean {
  if (!doc) return false
  const block = doc[key] as {title?: string} | undefined
  return Boolean(block?.title?.trim())
}

function makeBadge(
  label: string,
  locale: 'ru' | 'uk' | 'en',
  hint: string,
): DocumentBadgeComponent {
  return function LocaleTitleBadge(props) {
    const doc = (props.draft || props.published) as SanityDocument | null
    const ok = titleOk(doc, locale)
    return {
      label: `${label} ${ok ? '✓' : '✗'}`,
      color: ok ? 'success' : 'danger',
      title: `${hint}: ${ok ? 'заголовок есть' : 'нет заголовка'}`,
    }
  }
}

/** Индикаторы по языкам (заголовок заполнен или нет). Вкладки схемы не поддерживают динамические подписи — бейджи в шапке документа. */
export const blogPostRuLocaleBadge = makeBadge('RU', 'ru', 'Русский')
export const blogPostUkLocaleBadge = makeBadge('UK', 'uk', 'Українська')
export const blogPostEnLocaleBadge = makeBadge('EN', 'en', 'English')

export const blogPostLocaleBadges: DocumentBadgeComponent[] = [
  blogPostRuLocaleBadge,
  blogPostUkLocaleBadge,
  blogPostEnLocaleBadge,
]
