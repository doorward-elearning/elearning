import React, { useEffect, useState } from 'react';
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
import withFullScreen, { FullScreenComponentProps } from '@doorward/ui/hoc/withFullScreen';

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
  const [dimensions, setDimensions] = useState({ width: props.width, height: props.height });

  useEffect(() => {
    if (props.isFullScreen) {
      if (props.viewPortWidth !== dimensions.width || props.viewPortHeight !== dimensions.height) {
        setDimensions({ width: props.viewPortWidth, height: props.viewPortHeight });
      }
    } else {
      if (props.width !== dimensions.width || props.height !== dimensions.height) {
        setDimensions({ width: props.width, height: props.height });
      }
    }
  }, [props.width, props.height, props.isFullScreen, props.viewPortWidth, props.viewPortHeight]);

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
      <Document
        {...props}
        file={props.file}
        onLoadSuccess={(data) => {
          onLoadSuccess(data);
          if (props.onLoadSuccess) {
            props.onLoadSuccess(data);
          }
        }}
        loading={<PDFLoadingView width={dimensions.width} height={dimensions.height} />}
      >
        {props.displayType === 'stack' ? (
          <Panel className="ed-pdf-viewer-stack">
            <Page
              onLoadSuccess={onPageLoad}
              pageNumber={page}
              width={props.isFullScreen ? 0 : dimensions.width}
              height={dimensions.height - 100}
              loading={<PDFLoadingView {...pageDimensions} />}
            />
            {!props.hideToolbar && <PdfToolbar numPages={numPages} currentPage={page} onChangePage={setPage} />}
          </Panel>
        ) : (
          <ScrollLayout
            scrollType={props.displayType as any}
            maxHeight={dimensions.height}
            scrollBy={pageDimensions.width}
            className={classNames('ed-pdf-viewer-pages', props.displayType)}
            style={{ width: dimensions.width, height: dimensions.height }}
          >
            {_.range(0, numPages).map((page) => {
              const padding = 20;
              const width = props.isFullScreen
                ? 0
                : props.displayType === 'horizontal'
                ? 0
                : dimensions.width - padding;
              const height = props.isFullScreen
                ? dimensions.height
                : props.displayType === 'vertical'
                ? 0
                : dimensions.height - padding;
              return (
                <Panel className="ed-pdf-viewer-page">
                  <Page
                    pageNumber={page + 1}
                    onLoadSuccess={onPageLoad}
                    width={width}
                    height={height}
                    loading={<PDFLoadingView {...pageDimensions} />}
                  />
                </Panel>
              );
            })}
          </ScrollLayout>
        )}
      </Document>
    </div>
  );
};

PDFViewer.defaultProps = {
  displayType: 'stack',
};

export type PDFDisplayType = 'horizontal' | 'vertical' | 'stack';

export interface PDFLoadingViewProps {
  width?: number;
  height?: number;
}

export interface PDFViewerBaseProps extends Props, FullScreenComponentProps {
  displayType?: PDFDisplayType;
}

export type PDFViewerProps =
  | (PDFViewerBaseProps & {
      displayType: 'horizontal' | 'vertical';
      width: number;
      height: number;
    })
  | (PDFViewerBaseProps & {
      displayType?: 'stack';
      width?: number;
      height?: number;
      hideToolbar?: boolean;
    });

export default withFullScreen(PDFViewer, 'pdf-viewer-box');
