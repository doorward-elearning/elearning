import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { ChatMessage } from '../../types/chat-type';
import { Subscription } from 'rxjs/internal/Subscription';
import { UtilsService } from '../../services/utils/utils.service';
import { SideNavComponents } from '../../../video-room/video-room.component';

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatScroll') chatScroll: ElementRef;
  @ViewChild('chatInput') chatInput: ElementRef;

  @Input() lightTheme: boolean;

  @Output() closeButtonClicked = new EventEmitter<any>();

  message = '';

  emojiKeyboardVisible: boolean;

  messageList: ChatMessage[] = [];
  chatOpened: boolean;

  private chatMessageSubscription: Subscription;

  constructor(private chatService: ChatService, private utilsService: UtilsService) {}

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.chatOpened) {
      this.close();
    }
  }

  ngOnInit() {
    this.subscribeToMessages();
    this.subscribeToToggleChat();
  }

  ngOnDestroy(): void {
    if (this.chatMessageSubscription) {
      this.chatMessageSubscription.unsubscribe();
    }
  }

  eventKeyPress(event) {
    // Pressed 'Enter' key
    if (event && event.keyCode === 13) {
      this.sendMessage();
    }
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  close() {
    this.closeButtonClicked.emit();
  }

  handleEmojiSelected(e) {
    this.message += e.char;
    this.emojiKeyboardVisible = false;
  }

  private subscribeToMessages() {
    this.chatMessageSubscription = this.chatService.messagesObs.subscribe((messages: ChatMessage[]) => {
      this.messageList = messages;
      this.scrollToBottom();
    });
  }

  private subscribeToToggleChat() {
    this.utilsService.sidenavContentObs.subscribe(open => {
      this.chatOpened = open === SideNavComponents.CHAT;
      if (this.chatOpened) {
        this.scrollToBottom();
        setTimeout(() => {
          this.chatInput.nativeElement.focus();
        });
      }
    });
  }
}
