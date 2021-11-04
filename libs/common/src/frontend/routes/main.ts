const ROUTES = {
  home: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    password: {
      create: '/auth/password/create/:resetToken',
      reset: '/auth/password/reset/:resetToken',
      forgot: '/auth/password/forgot',
    },
  },
  classrooms: {
    list: '/classrooms',
    classroom: '/classrooms/:schoolId',
  },
  meeting: {
    join: '/meeting/:meetingId',
  },
  dashboard: '/dashboard',
  assessments: {
    publicExam: '/assessments/public/exam/:assessmentId',
    exam: '/assessments/exam/:assessmentId',
    quiz: '/assessments/quiz/:assessmentId',
    submissions: {
      list: '/assessments/:assessmentId/submissions',
      grade: '/assessments/submissions/:submissionId',
    },
  },
  courses: {
    list: '/courses',
    view: '/courses/:courseId',
    create: '/courses/create',
    students: {
      list: '/courses/:courseId/students',
      create: '/courses/:courseId/students/create',
    },
    modules: {
      items: {
        view: '/courses/modules/items/:itemId',
        update: '/courses/modules/items/:itemId/update',
        addQuestion: '/courses/modules/items/:itemId/update/addQuestion',
      },
      assignments: {
        list: '/courses/:courseId/modules/assignments',
        create: '/courses/modules/:moduleId/assignments/create',
      },
      pages: {
        create: '/courses/modules/:moduleId/pages/create',
      },
      quizzes: {
        create: '/courses/modules/:moduleId/quizzes/create',
        addQuestion: '/courses/modules/:moduleId/quizzes/create/addQuestion',
      },
      exams: {
        create: '/courses/modules/:moduleId/exams/create',
        addQuestion: '/courses/modules/:moduleId/exams/create/addQuestion',
      },
      videos: {
        create: '/courses/modules/:moduleId/videos/create',
      },
    },
    discussionGroups: {
      view: '/courses/discussionGroups/:discussionGroupId',
    },
  },
  students: {
    list: '/students',
    create: '/students/create',
    view: '/students/:studentId',
  },
  teachers: {
    list: '/teachers',
    create: '/teachers/create',
  },
  profile: {
    view: '/profile/:username',
    changePassword: '/profile/:username/changePassword',
  },
  reports: {
    students: {
      list: '/reports/students',
      view: '/reports/students/:studentId',
    },
    teachers: {
      list: '/reports/teachers',
      view: '/reports/teachers/:teacherId',
    },
    courses: {
      list: '/reports/courses',
    },
  },
  groups: {
    teachers: {
      list: '/groups/teachers/',
      create: '/groups/teachers/create',
      update: '/groups/teachers/:groupId/update',
      view: '/groups/teachers/:groupId',
    },
    students: {
      list: '/groups/students',
      create: '/groups/students/create',
      view: '/groups/students/:groupId',
      update: '/groups/students/:groupId/update',
    },
  },
  organizations: {
    list: '/organizations',
    create: '/organizations/create',
    update: '/organizations/:organizationId/update',
  },
  chat: {
    home: '/chat',
  },
};

export default ROUTES;
