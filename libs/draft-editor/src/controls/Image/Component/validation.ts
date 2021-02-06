import * as Yup from 'yup';
import translate from '@doorward/common/lang/translate';

export default Yup.object({
  imgSrc: Yup.string().url(translate('urlInvalid')).required(translate('urlRequired')),
  height: Yup.string(),
  width: Yup.string(),
});
