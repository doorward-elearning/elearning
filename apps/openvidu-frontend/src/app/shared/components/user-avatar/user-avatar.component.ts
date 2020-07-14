import { Component, Input, OnInit } from '@angular/core';
import Tools from '@doorward/common/utils/Tools';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
})
export class UserAvatarComponent implements OnInit {
  @Input() name: string;
  @Input() avatar: string;
  @Input() fontSize: string;

  color: string;

  constructor() {}

  ngOnInit(): void {
    this.color = Tools.color(name);
  }

  getInitials(user: string) {
    const words = (user || '').trim().split(/\s+/);
    return words
      .filter(word => word.length)
      .reduce((acc, cur) => acc + cur.charAt(0), '')
      .toUpperCase();
  }
}
