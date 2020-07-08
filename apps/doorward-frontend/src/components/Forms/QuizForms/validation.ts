import * as Yup from 'yup';

export default Yup.object({
  title: Yup.string()
    .required('The title is required')
    .nullable(),
  content: Yup.object({
    instructions: Yup.string()
      .required('The instructions are required.')
      .nullable(),
    options: Yup.object({
      shuffleAnswers: Yup.boolean(),
      timeLimit: Yup.object({
        allow: Yup.boolean(),
        minutes: Yup.number()
          .typeError('Please specify a number')
          .nullable()
          .when('allow', {
            is: value => !!value,
            then: Yup.number()
              .typeError('Please specify a number')
              .required('Enter the time limit in minutes'),
          }),
      }),
      attempts: Yup.object({
        multiple: Yup.boolean(),
        keepScore: Yup.string().when('multiple', {
          is: value => !!value,
          then: Yup.string()
            .required('Please choose the score to keep')
            .oneOf(['Highest', 'Lowest', 'Average'], 'Please choose the score to keep.'),
        }),
        max: Yup.number()
          .nullable()
          .when('multiple', {
            is: value => !!value,
            then: Yup.number().required('Enter the maximum number of trials.'),
          }),
      }),
      questions: Yup.object({
        oneAtATime: Yup.boolean(),
        lockAfterAnswering: Yup.boolean(),
      }),
      restrictions: Yup.object({
        accessCode: Yup.object({
          require: Yup.boolean(),
          code: Yup.string()
            .nullable()
            .when('require', {
              is: value => !!value,
              then: Yup.string().required('Please enter the access code'),
            }),
        }),
      }),
      responses: Yup.object({
        show: Yup.boolean(),
        frequency: Yup.object({
          onlyOnce: Yup.boolean(),
          range: Yup.object({
            allow: Yup.boolean(),
            from: Yup.string().nullable(),
            to: Yup.string().nullable(),
          }),
        }),
      }),
      dueDate: Yup.string().nullable(),
      availability: Yup.object({
        from: Yup.string().nullable(),
        to: Yup.string().nullable(),
      }),
    }),
    questions: Yup.array(
      Yup.object({
        question: Yup.string()
          .required('Please enter the question')
          .nullable(),
        answers: Yup.array(
          Yup.object({
            answer: Yup.string().required('Enter a possible answer.'),
          })
        ),
      })
    ),
  }),
});
