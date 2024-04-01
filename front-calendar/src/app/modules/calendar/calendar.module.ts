import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
// import { CalendarComponent } from './pages/calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { MonthsViewComponent } from './components/months-view/months-view.component';
import { WeekViewComponent } from './components/week-view/week-view.component';
import { DayViewComponent } from './components/day-view/day-view.component';
import { CalendarComponent } from './calendar.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MainCalendarComponent } from './pages/main-calendar/main-calendar.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';

@NgModule({
  declarations: [
    SidebarComponent, HeaderComponent, CalendarComponent, MainCalendarComponent,
    MonthsViewComponent, WeekViewComponent, DayViewComponent, DateSelectorComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule,
    // LayoutModule
  ]
})
export class CalendarModule { }
