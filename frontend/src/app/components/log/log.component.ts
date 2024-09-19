import { Component, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('logContainer') private logContainer!: ElementRef;
  private client: Client;
  public logs: string[] = [];
  isLoading: boolean = true;  

  constructor() {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS("http://localhost:8080/api-arcade/ws") as any; 
    }; 
  }

  ngOnInit() {
    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      this.client.subscribe('/topic/logs', (message: IMessage) => {
        this.onMessageReceived(message);
      });
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

  ngOnDestroy() {
    this.client.deactivate();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['logs']) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    try {
      this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight;
    } catch(err) { 
      console.error('Could not scroll log container:', err);
    }
  }

  private onMessageReceived(message: IMessage) {
    console.log('Message received: ' + message.body);
    this.logs.push(message.body);
    this.scrollToBottom();
  }
}
