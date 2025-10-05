// Russian translations
export default {
  nav: {
    home: 'Главная',
    modules: 'Модули',
    statistics: 'Статистика',
    projects: 'Проекты',
    faq: 'Вопросы',
    latest: 'Обновления',
    collaboration: 'Сотрудничество'
  },
  course: {
    modules: 'Модули курса',
    topics: 'Темы',
    lessons: 'Уроки',
    duration: 'Длительность',
    tasks: 'Задач',
    minutes: 'мин',
    module: 'Модуль',
    topic: 'Тема'
  },
  accordion: {
    expandAll: 'Развернуть всё',
    collapseAll: 'Свернуть всё'
  },
  stats: {
    title: 'Статистика курса',
    totalLessons: 'Всего уроков',
    totalVideos: 'Всего видео',
    totalDuration: 'Общая длительность',
    students: 'Студентов',
    modules: 'Модулей',
    topics: 'Тем',
    tasks: 'Задач'
  },
  faq: {
    title: 'Часто задаваемые вопросы'
  },
  projects: {
    title: 'Проекты студентов',
    viewProject: 'Посмотреть проект',
    noProjects: 'Проекты скоро появятся!'
  },
  latest: {
    title: 'Последние обновления'
  },
  collaboration: {
    title: 'Сотрудничество'
  },
  footer: {
    copyright: 'Все права защищены'
  },
  cta: {
    ready: 'Готовы начать обучение?',
    explore: 'Изучите все модули или свяжитесь для сотрудничества'
  }
} as const;

// Optional: Export type for other locales to follow
export type LocaleMessages = typeof import('./ru').default;
