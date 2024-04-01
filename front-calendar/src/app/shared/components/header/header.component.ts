// import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Locale, Theme } from 'src/app/core/models/types';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // animations: [
  //   trigger('rotate', [
  //     transition(':enter', [
  //       animate('1000ms',
  //         keyframes([
  //           style({ transform: 'rotate(0deg)', offset: '0' }),
  //           style({ transform: 'rotate(1turn)', offset: '1' }),
  //         ]),
  //       )
  //     ])
  //   ])
  // ]
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() isSideBarCollapsed: boolean;
  @Output() onToggleSideBar: EventEmitter<SideBarToggle> = new EventEmitter();
  @Output() onChangeTheme: EventEmitter<Theme> = new EventEmitter();
  @Output() onChangeLocale: EventEmitter<Locale> = new EventEmitter();

  screenWidth = 0;
  theme: Theme = 'dark-theme';
  locale: Locale = 'es';
  // @HostListener('window:resize', ['event'])
  // onResize(event: any) {
  //   this.screenWidth = window.innerWidth;
  //   if (this.screenWidth <= 768) {
  //     this.isSideBarCollapsed = true;      
  //   }
  // }

  constructor() { }

  ngOnInit() {
    // this.switchTheme();
  }

  ngOnChanges() {
  }

  toggleCollapseSidebar(): void {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
    this.onToggleSideBar.emit({ collapsed: this.isSideBarCollapsed, screenWidth: this.screenWidth });
  }

  switchTheme() {
    this.theme = this.theme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.onChangeTheme.emit(this.theme);
  }

}
