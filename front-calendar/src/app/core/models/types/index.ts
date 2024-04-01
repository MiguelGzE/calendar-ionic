import { DateStruct } from "../interfaces";

export type Theme = 'light-theme' | 'dark-theme';
export type Locale = 'es' | 'en';
export type CalendarView = 'year' | 'month' | 'week' | 'day';
export type CalendarViewOption = {
    icon: string;
    label: string;
    view: CalendarView;
}



// export declare type DayViewModel = {
//     date: NgbDate;
//     context: DayTemplateContext;
//     tabindex: number;
//     ariaLabel: string;
//     hidden: boolean;
// };

// export declare type WeekViewModel = {
//     number: number;
//     days: DayViewModel[];
//     collapsed: boolean;
// };
// export declare type MonthViewModel = {
//     firstDate: DateStruct;
//     lastDate: DateStruct;
//     number: number;
//     year: number;
//     weeks: WeekViewModel[];
//     weekdays: number[];
// };
// export declare type DatepickerViewModel = {
//     dayTemplateData?: NgbDayTemplateData;
//     disabled: boolean;
//     displayMonths: number;
//     firstDate?: NgbDate;
//     firstDayOfWeek: number;
//     focusDate?: NgbDate;
//     focusVisible: boolean;
//     lastDate?: NgbDate;
//     markDisabled?: NgbMarkDisabled;
//     maxDate?: NgbDate;
//     minDate?: NgbDate;
//     months: MonthViewModel[];
//     navigation: 'select' | 'arrows' | 'none';
//     outsideDays: 'visible' | 'collapsed' | 'hidden';
//     prevDisabled: boolean;
//     nextDisabled: boolean;
//     selectBoxes: {
//         years: number[];
//         months: number[];
//     };
//     selectedDate: NgbDate;
// };
// export declare enum NavigationEvent {
//     PREV = 0,
//     NEXT = 1
// }