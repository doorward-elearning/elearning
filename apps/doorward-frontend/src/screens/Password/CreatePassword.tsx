import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import NewPasswordForm from '../../components/Forms/NewPasswordForm';
import './CreatePassword.scss';
import PasswordPolicy from '../../components/UI/PasswordPolicy';
import createPassword from '../../assets/illustrations/create_new_password.svg';
import EImage from '@doorward/ui/components/Image';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import Row from '@doorward/ui/components/Row';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';
import { useHistory } from 'react-router';

const CreatePassword: React.FunctionComponent<CreatePasswordProps> = (props) => {
  const form = useForm();
  const history = useHistory();

  const onSuccess = (): void => {
    history.push('/login');
  };

  return (
    <Layout
      {...props}
      header={translate('createANewPassword')}
      navFeatures={[NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT]}
      features={[LayoutFeatures.HEADER]}
    >
      <Row style={{ alignItems: 'start', gridTemplateColumns: '2fr 1fr' }}>
        <div>
          <PasswordPolicy />
          <NewPasswordForm form={form} onSuccess={onSuccess} onCancel={onSuccess} />
        </div>
        <div>
          <EImage src={createPassword} size="responsive" />
        </div>
      </Row>
    </Layout>
  );
};

export interface CreatePasswordProps extends PageComponent {}

export default CreatePassword;
