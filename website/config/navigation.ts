export interface NavigationLink {
  to: string
  labelKey: string
  exact?: boolean
}

export const navigationLinks: NavigationLink[] = [
  { to: '/', labelKey: 'nav.home', exact: true },
  { to: '/modules', labelKey: 'nav.modules' },
  { to: '/links', labelKey: 'nav.courseLinks' },
  { to: '/statistics', labelKey: 'nav.statistics' },
  { to: '/projects', labelKey: 'nav.projects' },
  { to: '/faq', labelKey: 'nav.faq' },
  { to: '/changelog', labelKey: 'nav.changelog' },
  { to: '/contacts', labelKey: 'nav.contacts' },
]
