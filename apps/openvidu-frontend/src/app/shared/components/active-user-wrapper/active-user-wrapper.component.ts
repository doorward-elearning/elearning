import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-active-user-wrapper',
  templateUrl: './active-user-wrapper.component.html',
  styleUrls: ['./active-user-wrapper.component.css'],
})
export class ActiveUserWrapperComponent implements OnInit, AfterViewInit {
  hidden = false;
  mouseMoveListener: () => void;

  @Output() contentHidden = new EventEmitter<boolean>();

  @Input() delay = 2000;

  @ViewChild('userWrapper') wrapper;

  constructor() {
    this.mouseMoveListener = _.debounce(() => {
      this.hidden = true;
      this.contentHidden.emit(true);
    }, this.delay);
  }

  ngOnInit(): void {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove() {
    if (this.hidden) {
      this.contentHidden.emit(false);
    }
    this.hidden = false;
    this.mouseMoveListener();
  }

  ngAfterViewInit(): void {}
}
