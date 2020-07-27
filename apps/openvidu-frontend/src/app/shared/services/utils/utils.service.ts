import { Injectable, ViewChild } from '@angular/core';
import { OpenViduLayoutOptions } from '../../layout/openvidu-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogErrorComponent } from '../../components/dialog-error/dialog-error.component';
import { LayoutBigElement } from '../../types/layout-type';
import { OpenviduTheme } from '@doorward/common/types/openvidu';
import updateTheme from '@doorward/ui/themes/updateTheme';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertDialogButton, AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { SideNavComponents } from '../../../video-room/video-room.component';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private dialogRef: MatDialogRef<DialogErrorComponent, any>;
  themeObs: BehaviorSubject<OpenviduTheme>;

  @ViewChild('sidenav') private chatSidenav: MatSidenav;

  private sideNavOpenBehaviourSubject = new BehaviorSubject<SideNavComponents | null>(undefined);

  theme: Observable<OpenviduTheme>;
  sidenavContentObs: Observable<SideNavComponents>;

  private alertDialogRef: MatDialogRef<AlertDialogComponent>;

  private refreshTheme: () => void;
  private themeEventListener: (e: KeyboardEvent) => void;

  constructor(public dialog: MatDialog) {
    this.themeObs = new BehaviorSubject(OpenviduTheme.DARK);
    this.theme = this.themeObs.asObservable();
    this.sidenavContentObs = this.sideNavOpenBehaviourSubject.asObservable();
  }

  setSideNav(sideNav: MatSidenav) {
    this.chatSidenav = sideNav;
  }

  setTheme(theme: OpenviduTheme) {
    if (this.refreshTheme) {
      this.refreshTheme();
    }
    this.refreshTheme = updateTheme(theme);
    this.themeObs.next(theme);
  }

  isChatOpen() {
    return this.getSideNavComponent() === SideNavComponents.CHAT;
  }

  isParticipantsOpen() {
    return this.getSideNavComponent() === SideNavComponents.PARTICIPANTS;
  }

  getSideNavComponent(): SideNavComponents {
    return this.sideNavOpenBehaviourSubject.getValue();
  }

  toggleSideNav(component: SideNavComponents) {
    if (this.sideNavOpenBehaviourSubject.getValue() === component) {
      this.sideNavOpenBehaviourSubject.next(null);
      this.chatSidenav.toggle(false);
    } else {
      this.sideNavOpenBehaviourSubject.next(component);
      this.chatSidenav.toggle(true);
    }
  }

  getTheme(): OpenviduTheme {
    return (localStorage.getItem('theme') as OpenviduTheme) || OpenviduTheme.DARK;
  }

  isDarkTheme(): boolean {
    return this.getTheme() === OpenviduTheme.DARK;
  }

  isLightTheme(): boolean {
    return this.getTheme() === OpenviduTheme.LIGHT;
  }

  toggleTheme() {
    this.setTheme(this.isDarkTheme() ? OpenviduTheme.LIGHT : OpenviduTheme.DARK);
  }

  subscribeToThemeChangeShortcut(): Observable<OpenviduTheme> {
    const eventListener = (e: KeyboardEvent): void => {
      const fire = e.which === 186 && (e.ctrlKey || e.metaKey);
      if (fire) {
        this.toggleTheme();
      }
    };
    document.addEventListener('keydown', eventListener);
    this.themeEventListener = eventListener;
    return this.theme;
  }

  unsubscribeFromThemeChangeShortcut() {
    document.removeEventListener('keydown', this.themeEventListener);
  }

  toggleFullscreen(elementId: string) {
    const document: any = window.document;
    const fs = document.getElementById(elementId);
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  getOpenViduAvatar(): string {
    return 'https://openvidu.io/img/logos/openvidu_globe_bg_transp_cropped.png';
  }

  handlerScreenShareError(error: any) {
    if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
      alert('Your browser does not support screen sharing');
    } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
      alert('You need to enable screen sharing extension');
    } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
      // alert('You need to choose a window or application to share');
    }
  }

  getOpenviduLayoutOptions(): OpenViduLayoutOptions {
    const options = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 15, // The widest ratio that will be used (default 16x9)
      fixedRatio: false /* If this is true then the aspect ratio of the video is maintained
      and minRatio and maxRatio are ignored (default false) */,
      bigClass: LayoutBigElement.BIG_ELEMENT_CLASS, // The class to add to elements that should be sized bigger
      bigPercentage: 0.85, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };
    return options;
  }

  generateNickname(): string {
    return 'Doorward ' + Math.floor(Math.random() * 100) + '_User';
  }

  isFF(): boolean {
    return /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent);
  }

  isMobile(): boolean {
    return this.isAndroid() || this.isIos();
  }

  showErrorMessage(header: string, message: string, disableClose = false, redirectUrl?: string) {
    this.dialogRef = this.dialog.open(DialogErrorComponent, {
      data: { header: header, message: message, onClose: redirectUrl },
      disableClose,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getElementsByClassName(className: string): Array<Element> {
    const elements = [];
    const found = document.getElementsByClassName(className);
    let i = 0;
    while (i < found.length) {
      elements.push(found[i++]);
    }
    return elements;
  }

  getHTMLElementByClassName(element: HTMLElement, className: string): HTMLElement {
    while (!!element && element !== document.body) {
      if (element.className.includes(className)) {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  }

  toggleClass(element: HTMLElement | Element, className: string) {
    if (element?.className.includes(className)) {
      element?.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }

  toggleBigElementClass(element: HTMLElement | Element) {
    this.toggleClass(element, LayoutBigElement.BIG_ELEMENT_CLASS);
  }

  removeAllBigElementClass() {
    const elements: HTMLCollectionOf<Element> = document.getElementsByClassName(LayoutBigElement.BIG_ELEMENT_CLASS);
    while (elements.length > 0) {
      this.toggleBigElementClass(elements[0]);
    }
  }

  private isAndroid(): boolean {
    return /\b(\w*Android\w*)\b/.test(navigator.userAgent) && /\b(\w*Mobile\w*)\b/.test(navigator.userAgent);
  }

  private isIos(): boolean {
    return /\b(\w*iOS\w*)\b/.test(navigator.userAgent);
  }

  alert(title: string, message: string, buttons: Array<AlertDialogButton>, disableClose = false) {
    this.alertDialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title,
        message,
        buttons,
      },
      disableClose,
    });
  }

  confirmSync(
    title: string,
    message: string,
    disableClose = false,
    buttons?: {
      positive?: string;
      negative?: string;
    }
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.alertDialogRef = this.dialog.open(AlertDialogComponent, {
        data: {
          title,
          message,
          buttons: [
            {
              text: buttons?.positive || 'Okay',
              onClick: resolve,
            },
            {
              text: buttons?.negative || 'Cancel',
              onClick: reject,
            },
          ],
        },
        disableClose,
      });
    });
  }

  closeAlert() {
    if (this.alertDialogRef) {
      this.alertDialogRef.close();
    }
  }
}
