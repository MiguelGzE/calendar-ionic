import { Component, OnInit, HostListener } from '@angular/core';
import { CalendarViewOption, Locale, Theme } from 'src/app/core/models/types';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  isSideBarCollapsed: boolean = true;
  screenWidth = 0;
  calendarViewSelected: CalendarViewOption;
  theme: Theme = 'dark-theme';
  locale: Locale = 'es';
  isChangeOfViewFromSideBar: boolean = false;

  @HostListener('window:resize', ['event'])
  onResize(event: any) {
    this.getScreenWidth();
  }

  constructor() {
    this.getScreenWidth();
  }

  ngOnInit() {
  }

  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.isSideBarCollapsed = true;
    }
  }

  onToggleSideBar(data: SideBarToggle): void {
    // this.screenWidth = data.screenWidth;
    this.isSideBarCollapsed = data.collapsed;
    this.isChangeOfViewFromSideBar = false;
    // this.getBodyClass();
  }

  // getBodyClass(): string {
  //   let styleClass = '';
  //   if (this.isSideBarCollapsed) {
  //     styleClass = 'body-trimmed';
  //   } else {
  //     styleClass = 'body-md-screen';
  //   }
  //   // if (this.isSideBarCollapsed && this.screenWidth > 768) {
  //   //   styleClass = 'body-md-screen';
  //   // } else if (this.isSideBarCollapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
  //   //   styleClass = 'body-trimmed';
  //   // }
  //   return styleClass;
  // }

  getNewCalendarView(calendarView: CalendarViewOption) {
    this.calendarViewSelected = calendarView;
    this.isSideBarCollapsed = true;
    this.isChangeOfViewFromSideBar = true;
  }

  getTheme(theme: Theme) {
    this.theme = theme;
  }
}
