import React, { ReactNode, useRef } from 'react';
import './Accordion.scss';
import Icon from '../Icon';
import classNames from 'classnames';
import useAccordion from '../../../hooks/useAccordion';
import Row from '../Row';
import IfElse from '../IfElse';
import useHeightTransition from '../../../hooks/useHeightTransition';

const Accordion: React.FunctionComponent<AccordionProps> = props => {
  const body: { current: HTMLDivElement | null } = useRef(null);
  const accordion = useAccordion(props.open || false);

  useHeightTransition(body, accordion.open, [accordion.open], 400);

  return (
    <div
      className={classNames({
        'ed-accordion': true,
        open: accordion.open,
        bordered: props.bordered,
      })}
    >
      <div
        className={classNames({
          'ed-accordion__title': true,
          noIcon: props.noIcon,
        })}
      >
        <Icon className="ed-accordion__title__arrow" icon="keyboard_arrow_right" onClick={accordion.toggle} />
        <Row style={{ justifyContent: 'space-between', zIndex: 'auto' }}>
          <div className="clickable" onClick={accordion.toggle}>
            {props.title()}
          </div>
          <IfElse condition={!!props.action}>
            <div className="ed-accordion__title__action">{props.action && props.action()}</div>
          </IfElse>
        </Row>
      </div>
      <div className="ed-accordion__body" ref={body}>
        {props.children}
      </div>
    </div>
  );
};

export interface AccordionProps {
  children: ReactNode;
  title: () => JSX.Element;
  action?: () => JSX.Element;
  open?: boolean;
  bordered?: boolean;
  noIcon?: boolean;
}

export default Accordion;
