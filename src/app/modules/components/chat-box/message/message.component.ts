import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { IChatMessage } from 'app/modules/interfaces/chat-message';
import { ScrollToBottomDirective } from 'app/directives/scroll-to-bottom.directive';
import { ChatBoxService } from '../chat-box.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment'

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewInit {
  @ViewChild(ScrollToBottomDirective) scroll: ScrollToBottomDirective;
  @Input() public messages: Array<IChatMessage>;
  public lastDate: string;

  constructor(
    public chatBoxService: ChatBoxService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.messages.length > 0) {
      this.lastDate = this.getDate(this.messages[0]); // this.datePipe.transform(this.messages[0], 'MM-dd-yyyy');
    }
  }

  public getDate(date, format = 'MM-dd-yyyy') {
    return this.datePipe.transform(date, format);
  }

  public setLastDate(date) {
    this.lastDate = this.getDate(date);
    return true;
  }

  public showDate(date) {
    let generateDate = new Date(this.getDate(date)).getTime();
    let currentDate = new Date();
    let yesterday = moment(currentDate.setDate(currentDate.getDate() - 1)).format();
    moment(date, "DD-MM-YYYY").format("MM/DD/YYYY");

    if (moment(generateDate).format("DD-MM-YYYY") === moment(new Date()).format("DD-MM-YYYY")) {
      return 'Today';
    } else if (moment(generateDate).format("DD-MM-YYYY") === moment(yesterday).format("DD-MM-YYYY")) {
      return 'Yesterday';
    } else {
      return this.getDate(date, 'dd MMM yyyy');
    }
  }

}
