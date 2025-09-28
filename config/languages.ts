// Конфигурация поддерживаемых языков
// Для добавления нового языка просто добавьте объект в массив
// Для удаления языка - удалите соответствующий объект

export interface Language {
  id: string
  title: string
  flag: string
  isDefault?: boolean
}

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    id: 'ru',
    title: 'Русский',
    flag: '🇷🇺',
    isDefault: true, // Язык по умолчанию
  },
  {
    id: 'en',
    title: 'English',
    flag: '🇺🇸',
  },
  {
    id: 'uk',
    title: 'Українська',
    flag: '🇺🇦',
  },
  // Добавьте новые языки здесь:
  // {
  //   id: 'fr',
  //   title: 'Français',
  //   flag: '🇫🇷',
  // },
  // {
  //   id: 'de',
  //   title: 'Deutsch',
  //   flag: '🇩🇪',
  // },
]

// Получить язык по умолчанию
export const getDefaultLanguage = (): Language => {
  return SUPPORTED_LANGUAGES.find(lang => lang.isDefault) || SUPPORTED_LANGUAGES[0]
}

// Получить все ID языков
export const getLanguageIds = (): string[] => {
  return SUPPORTED_LANGUAGES.map(lang => lang.id)
}

// Получить язык по ID
export const getLanguageById = (id: string): Language | undefined => {
  return SUPPORTED_LANGUAGES.find(lang => lang.id === id)
}
