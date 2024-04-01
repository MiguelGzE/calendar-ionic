// import { trigger, transition, animate, style, keyframes } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarView, CalendarViewOption, Theme } from 'src/app/core/models/types';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  // animations: [
  //   trigger('fadeIn', [
  //     transition(':enter', [
  //       style({ opacity: 0 }),
  //       animate('1000ms',
  //         style({ opacity: 1 })
  //       )
  //     ]),
  //     // transition(':leave', [
  //     //   style({ opacity: 1 }),
  //     //   animate('100ms',
  //     //     style({ opacity: 0 })
  //     //   )
  //     // ])
  //   ]),
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
export class SidebarComponent implements OnInit {

  @Output() onToggleSideBar: EventEmitter<SideBarToggle> = new EventEmitter();
  @Output() onChangeCalendarView: EventEmitter<CalendarViewOption> = new EventEmitter();
  @Input() collapsed: boolean = false;
  screenWidth = 0;
  calendarView: CalendarView = 'month';
  calendarViewList: Array<CalendarViewOption> = [
    { icon: 'fa fa-calendar', label: 'Año', view: 'year' }, { icon: 'fa fa-calendar', label: 'Mes', view: 'month' },
    { icon: 'fa fa-calendar', label: 'Semana', view: 'week' }, { icon: 'fa fa-calendar-o', label: 'Día', view: 'day' }
  ];
  calendarViewSelected: CalendarViewOption;
  showMenu: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const monthView = this.calendarViewList.find(c => c.view === 'month');
    this.setCalendarView(monthView);
  }

  setCalendarView(calendarView) {
    this.calendarViewSelected = calendarView;
    this.onChangeCalendarView.emit(this.calendarViewSelected);
  }

  // toggleCollapse(): void {
  //   this.collapsed = !this.collapsed;    
  //   this.onToggleSideBar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  // }

  // closeSidebar(): void {
  //   this.collapsed = true;
  //   this.onToggleSideBar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  // }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  logOut() {
    // this._usuarioService.guardaFechaUltSesion(this.identity.usuario_id).subscribe(
    //     response => {
    //         if (response && response['status']) {
    //             console.log(response['msg']);
    //         }
    //     }, error => {
    //         console.log(<any>error);
    //     });

    this.router.navigateByUrl('/login');
    // localStorage.removeItem('identity');
    // localStorage.removeItem('jwt');
    // localStorage.removeItem('privilege');
    // localStorage.removeItem('selectedRol');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('privilegeSelected');
  }
}
