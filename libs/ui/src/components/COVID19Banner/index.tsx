import React from 'react';
import './COVID19Banner.scss';
import Header from '@doorward/ui/components/Header';
import Container from '@doorward/ui/components/Container';
import Anchor from '@doorward/ui/components/Anchor';
import EImage from '@doorward/ui/components/Image';
import man from '../../../assets/images/man_with_mask.svg';
import woman from '../../../assets/images/woman_with_mask.svg';
import Panel from '@doorward/ui/components/Panel';
import translate from '@doorward/common/lang/translate';

const COVID19Banner: React.FunctionComponent<COVID19BannerProps> = (props): JSX.Element => {
  return (
    <Container>
      <Panel>
        <div className="ed-covid19-banner">
          <div>
            <div className="header">
              <EImage src={man} size="small" />
              <EImage src={woman} size="small" />
              <div>
                <Header size={4}>{translate('covid19')}</Header>
                <div>{translate('getTheLatestInformationFromWHO')}</div>
              </div>
            </div>
          </div>
          <Anchor href="https://who.int" target="_blank" rel="noreferrer noopener">
            {translate('learnMore')}
          </Anchor>
        </div>
      </Panel>
    </Container>
  );
};

export interface COVID19BannerProps {}

export default COVID19Banner;
