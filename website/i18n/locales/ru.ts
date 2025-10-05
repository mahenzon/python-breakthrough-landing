// Russian translations
export default {
  brand: {
    name: 'Python ПРОрыв',
  },
  nav: {
    home: 'Главная',
    modules: 'Модули',
    statistics: 'Статистика',
    projects: 'Проекты',
    faq: 'Вопросы',
    latest: 'Обновления',
    collaboration: 'Сотрудничество',
  },
  course: {
    modules: 'Модули курса',
    topics: 'Тема',
    topicsCount: 'Тем',
    lessons: 'Уроки',
    lessonsCount: 'Уроков',
    duration: 'Длительность',
    videoDuration: 'Длительность видео',
    totalVideo: 'Всего видео на',
    tasks: 'Задач',
    tasksCount: 'Заданий',
    minutes: 'мин',
    hours: 'ч',
    module: 'Модуль',
    topic: 'Тема',
  },
  accordion: {
    expandAll: 'Развернуть всё',
    collapseAll: 'Свернуть всё',
  },
  stats: {
    title: 'Статистика курса',
    totalLessons: 'Всего уроков',
    totalVideos: 'Всего видео',
    totalVideosDuration: 'Общая длительность видео',
    students: 'Студентов',
    modules: 'Модулей',
    topics: 'Тем',
    tasks: 'Задач',
  },
  faq: {
    title: 'Часто задаваемые вопросы',
  },
  projects: {
    title: 'Проекты студентов',
    courseProjectsTitle: 'Проекты курса',
    courseProjectsDescription: 'Проекты, которые вы разработаете в процессе обучения',
    viewProject: 'Посмотреть проект',
    noProjects: 'Проекты скоро появятся!',
    comingSoon: 'Скоро',
  },
  latest: {
    title: 'Последние обновления',
  },
  collaboration: {
    title: 'Сотрудничество',
  },
  footer: {
    copyright: 'Все права защищены',
  },
  cta: {
    ready: 'Готовы начать обучение?',
    explore: 'Изучите все модули или свяжитесь для сотрудничества',
  },
  home: {
    shortDescription: 'Знакомство с веб-разработкой на Python от и до. Всё, что нужно знать и уметь веб-разработчику на Python.',
    whatYouLearn: 'Чему вы научитесь',
    aboutCourse: 'О курсе',
    aboutCourseText: 'Вы научитесь разрабатывать настоящие приложения, создадите несколько проектных работ, которые защитите перед остальными студентами и добавите в своё портфолио.',
    forWhom: 'Для кого этот курс',
    requirements: 'Начальные требования',
    requirementsText: 'Что нужно уметь до старта:',
    howItWorks: 'Как проходит обучение',
    whatYouGet: 'Что вы получаете',
  },
} as const

// Optional: Export type for other locales to follow
export type LocaleMessages = typeof import('./ru').default;
