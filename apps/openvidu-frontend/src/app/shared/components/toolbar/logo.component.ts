import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar-logo',
  template: `
    <div id="navSessionInfo">
      <img id="header_img" alt="Logo" [src]="logoUrl" />
    </div>
  `,
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarLogoComponent {
  @Input() lightTheme: boolean;
  @Input() compact: boolean;
  @Input() sessionId: string;
  @Input() logoUrl: string;

  constructor() {}
}
