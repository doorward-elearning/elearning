import React from 'react';
import Icon from '@doorward/ui/components/Icon';
import translate from '@doorward/common/lang/translate';

const PdfToolbar: React.FunctionComponent<PdfToolbarProps> = ({ numPages, currentPage, onChangePage }): JSX.Element => {
  return (
    <div className="ed-pdf-viewer-toolbar">
      <Icon
        onClick={() => onChangePage(1)}
        icon="first_page"
        title={translate('firstPageTitle')}
        disabled={currentPage === 1}
      />
      <div className="page-navigation">
        <Icon
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          icon="keyboard_arrow_left"
          title={translate('previousPageTitle')}
        />
        <span>{translate('pageCountLabel', { numPages, currentPage })}</span>
        <Icon
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === numPages}
          icon="navigate_next"
          title={translate('nextPageTitle')}
        />
      </div>
      <Icon
        onClick={() => onChangePage(numPages)}
        disabled={currentPage === numPages}
        icon="last_page"
        title={translate('lastPageTitle')}
      />
    </div>
  );
};

export interface PdfToolbarProps {
  numPages: number;
  currentPage: number;
  onChangePage: (page) => void;
}

export default PdfToolbar;
