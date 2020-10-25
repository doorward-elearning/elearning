import * as Yup from 'yup';
import translate from '@doorward/common/lang/translate';

export default Yup.object({
  rating: Yup.number().nullable().required(translate.pleaseProvideARating()),
});
