import * as Yup from 'yup';

export default Yup.object({
  video: Yup.string()
    .required('Please provide the Youtube URL')
    .matches(
      /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/,
      'Please provide a valid Youtube URL'
    )
    .nullable(),
});
