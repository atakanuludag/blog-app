import ILocalStorage from '@/models/ILocalStroge'

const THEME_SETTINGS = {
  DRAWER_WITDH: 280,
}

const QUERY_NAMES = {
  ARTICLE: 'article',
}

const LS_DARK_MODE: ILocalStorage = {
  key: 'DARK_MODE',
}

const LS_AUTH: ILocalStorage = {
  key: 'AUTH',
}

const LOCAL_STORAGES = {
  LS_DARK_MODE,
  LS_AUTH,
}

export { THEME_SETTINGS, QUERY_NAMES, LOCAL_STORAGES }
