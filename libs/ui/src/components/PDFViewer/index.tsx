import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import classNames from 'classnames';
import _ from 'lodash';
import Spinner from '@doorward/ui/components/Spinner';
import './PDFViewer.scss';
import Panel from '@doorward/ui/components/Panel';
import { Props } from 'react-pdf/dist/Document';
import PdfToolbar from '@doorward/ui/components/PDFViewer/PDFToolbar';
import { PDFPageProxy } from 'react-pdf';
import ScrollLayout from '@doorward/ui/components/ScrollLayout';
import getViewPort from '@doorward/ui/utils/getViewPort';
import Modal from '@doorward/ui/components/Modal';
import useModal from '@doorward/ui/hooks/useModal';
import Dropdown, { DropdownMenuProps } from '@doorward/ui/components/Dropdown';
import Icon from '@doorward/ui/components/Icon';

const pdfToolbarHeight = 60;

const PDFLoadingView: React.FunctionComponent<PDFLoadingViewProps> = ({ width, height }): JSX.Element => (
  <Panel>
    <div style={{ width, height }} className="pdf-loading-view">
      <Spinner width={20} height={20} />
    </div>
  </Panel>
);

PDFLoadingView.defaultProps = { width: 100, height: 200 };

const PDFViewer: React.FunctionComponent<PDFViewerProps> = (props): JSX.Element => {
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });
  let [viewportWidth, viewportHeight] = getViewPort();
  const modal = useModal();

  viewportHeight = viewportHeight - props.paddingVertical * 2;
  viewportWidth = viewportWidth - props.paddingHorizontal * 2;

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPageLoad = (page: PDFPageProxy) => {
    if (pageDimensions.width === 0 && pageDimensions.height === 0) {
      setPageDimensions({
        width: page.width,
        height: page.height,
      });
    }
  };

  return (
    <div className={classNames('ed-pdf-viewer')}>
      <div
        className="ed-pdf-viewer-preview"
        style={{ width: props.width, height: props.height }}
        onClick={() => modal.openModal()}
      >
        {props.actionMenu && (
          <span className="ed-pdf-viewer-preview__action" onClick={(e) => e.stopPropagation()}>
            <Dropdown positionX="right" positionY="bottom">
              <Icon icon="keyboard_arrow_down" />
              {props.actionMenu}
            </Dropdown>
          </span>
        )}
        <Document file={props.file} loading={<PDFLoadingView width={props.width} height={props.height} />}>
          <Page
            onLoadSuccess={onPageLoad}
            pageNumber={1}
            width={props.width}
            height={props.height}
            loading={<PDFLoadingView {...pageDimensions} />}
          />
        </Document>
      </div>
      <Modal useModal={modal}>
        <Document
          {...props}
          file={props.file}
          onLoadSuccess={(data) => {
            onLoadSuccess(data);
            if (props.onLoadSuccess) {
              props.onLoadSuccess(data);
            }
          }}
          loading={<PDFLoadingView width={props.width} height={props.height} />}
        >
          <Modal.Body style={{ padding: 0, display: 'grid', placeItems: 'center' }}>
            <div className={'ed-pdf-viewer'}>
              {props.displayType === 'stack' ? (
                <Panel className="ed-pdf-viewer-stack">
                  <Page
                    onLoadSuccess={onPageLoad}
                    pageNumber={page}
                    loading={<PDFLoadingView {...pageDimensions} />}
                    height={viewportHeight - pdfToolbarHeight}
                  />
                  {!props.hideToolbar && (
                    <PdfToolbar
                      height={pdfToolbarHeight}
                      numPages={numPages}
                      currentPage={page}
                      onChangePage={setPage}
                    />
                  )}
                </Panel>
              ) : (
                <ScrollLayout
                  scrollType={props.displayType as any}
                  maxHeight={viewportHeight}
                  scrollBy={pageDimensions.width}
                  className={classNames('ed-pdf-viewer-pages', props.displayType)}
                  style={{ height: viewportHeight }}
                >
                  {_.range(0, numPages).map((page) => {
                    return (
                      <Panel className="ed-pdf-viewer-page">
                        <Page
                          pageNumber={page + 1}
                          onLoadSuccess={onPageLoad}
                          height={viewportHeight}
                          loading={<PDFLoadingView {...pageDimensions} />}
                        />
                      </Panel>
                    );
                  })}
                </ScrollLayout>
              )}
            </div>
          </Modal.Body>
        </Document>
      </Modal>
    </div>
  );
};

PDFViewer.defaultProps = {
  displayType: 'stack',
  width: 300,
  height: 200,
  paddingVertical: 50,
  paddingHorizontal: 150,
};

export type PDFDisplayType = 'horizontal' | 'vertical' | 'stack';

export interface PDFLoadingViewProps {
  width?: number;
  height?: number;
}

export interface PDFViewerBaseProps extends Props {
  displayType?: PDFDisplayType;
  width?: number;
  height?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  actionMenu?: JSX.Element;
}

export type PDFViewerProps =
  | (PDFViewerBaseProps & {
      displayType: 'horizontal' | 'vertical';
    })
  | (PDFViewerBaseProps & {
      displayType?: 'stack';
      hideToolbar?: boolean;
    });

export default PDFViewer;
