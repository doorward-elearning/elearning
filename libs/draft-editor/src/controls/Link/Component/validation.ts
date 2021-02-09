import * as Yup from 'yup';
import translate from '@doorward/common/lang/translate';

export default () =>
  Yup.object({
    linkTitle: Yup.string().required(),
    linkTarget: Yup.string().url(translate('urlInvalid')).required(translate('linkTargetIsRequired')),
  });
