import Toast, { ToastProps } from '../components/ui/Toast';
import * as React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
global.toasts = [];

const removeToast = (toast: any): Promise<any> => {
  return new Promise<any>((resolve): void => {
    const element = toast.querySelector('.ed-toast');
    if (element) {
      element.classList.add('fade');
      setTimeout(() => {
        try {
          document.body.removeChild(toast);
        } catch (err) {}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        global.toasts = global.toasts.filter(t => t != toast);
        resolve();
      }, 500);
    }
  });
};

const toast = {
  show: (props: ToastProps & { timeout?: number }): void => {
    toast.clear().then(() => {
      const container = document.createElement('div');
      container.id = 'ed-toast';
      document.body.appendChild(container);

      const timer = setTimeout(() => {
        removeToast(container).then();
      }, props.timeout || 2000);

      const closeToast = (): void => {
        removeToast(container).then();
        clearTimeout(timer);
      };

      ReactDOM.render(<Toast closeToast={closeToast} {...props} />, container);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      global.toasts.push(container);
    });
  },
  clear: (): Promise<any> => {
    return Promise.all(
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      global.toasts.map(removeToast)
    );
  },
};

export default toast;
