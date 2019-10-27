import React, { ReactNode, useRef } from 'react';
import './Accordion.scss';
import Icon from '../Icon';
import classNames from 'classnames';
import useHeightTransition from '../../../hooks/useHeightTransition';
import { UseAccordion } from '../../../hooks/useAccordion';

const Accordion: React.FunctionComponent<AccordionProps> = props => {
  const body: { current: HTMLDivElement | null } = useRef(null);
  const { open } = props.useAccordion;

  useHeightTransition(body, open, [open], 400);

  return (
    <div
      className={classNames({
        'ed-accordion': true,
        open,
      })}
    >
      <div className="ed-accordion__title">
        <Icon className="ed-accordion__title__arrow" icon="keyboard_arrow_right" />
        {props.children[0]}
      </div>
      <div className="ed-accordion__body" ref={body}>
        {props.children[1]}
      </div>
    </div>
  );
};

export interface AccordionProps {
  children: [ReactNode, ReactNode];
  useAccordion: UseAccordion;
}

export default Accordion;
