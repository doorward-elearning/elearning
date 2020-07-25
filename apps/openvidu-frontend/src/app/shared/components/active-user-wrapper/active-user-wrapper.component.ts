import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import _ from 'lodash';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-active-user-wrapper',
  templateUrl: './active-user-wrapper.component.html',
  styleUrls: ['./active-user-wrapper.component.css'],
})
export class ActiveUserWrapperComponent implements OnInit, AfterViewInit, OnDestroy {
  hidden = false;
  mouseMoveListener: () => void;

  @Output() contentHidden = new EventEmitter<boolean>();

  @Input() delay = 2000;

  @Input() parent: HTMLElement;

  @ViewChild('userWrapper') wrapper;

  element: any;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.mouseMoveListener = _.debounce(() => {
      this.hidden = true;
      this.contentHidden.emit(true);
    }, this.delay);

    if (this.parent) {
      this.element = this.parent;
    } else {
      this.element = this.document.body;
    }

    this.element.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onMouseMove() {
    if (this.hidden) {
      this.contentHidden.emit(false);
    }
    this.hidden = false;
    this.mouseMoveListener();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    if (this.element) {
      this.element.removeEventListener('mousemove', this.onMouseMove());
    }
  }
}
