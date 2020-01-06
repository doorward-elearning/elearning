import Toast, { ToastProps } from '../components/Toast';
import * as React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
let toasts = [];

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
        toasts = toasts.filter(t => t != toast);
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

      const startTimer = (): any => {
        const timeout = props.timeout || 2000;
        if (timeout > 0) {
          return setTimeout(() => {
            removeToast(container).then();
          }, props.timeout || 2000);
        }
      };
      let timer: any = startTimer();

      container.addEventListener('mouseover', () => {
        if (timer) {
          clearTimeout(timer);
        }
      });

      container.addEventListener('mouseout', () => {
        timer = startTimer();
      });

      const closeToast = (): void => {
        removeToast(container).then();
        clearTimeout(timer);
      };

      ReactDOM.render(<Toast closeToast={closeToast} {...props} />, container);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      toasts.push(container);
    });
  },
  clear: (): Promise<any> => {
    return Promise.all(
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      toasts.map(removeToast)
    );
  },
};

export default toast;
