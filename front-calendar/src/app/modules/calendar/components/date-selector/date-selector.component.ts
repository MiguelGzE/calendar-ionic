import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MonthStruct } from 'src/app/core/models/interfaces';
import { Locale } from 'src/app/core/models/types';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {

  @Input() yearSelected: number;
  @Input() monthSelected: number;
  @Input() locale: Locale;
  @Output() newDateSelected: any = new EventEmitter();
  monthsList: Array<MonthStruct>;
  indexYearSelected;
  dateSelectorView: string = 'months';
  dataToShow: any;
  yearsList: Array<any>;
  dateSelectorTitle: any;
  oldYearSelected: number;

  @ViewChild('items') items: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    const arrayMonthsIds = Array.from(Array(12).keys());
    this.monthsList = this.getMonthsList(arrayMonthsIds);
    this.yearsList = this.getYearsList();
    this.dataToShow = this.monthsList;
    this.dateSelectorTitle = this.yearSelected;
    // document.getElementById("items").onmousemove = e => {
    //   let dom = document.getElementsByClassName("item") as HTMLCollection;
    //   console.log(dom);

    //   for (const item of dom) {
    //     const rect = item.getBoundingClientRect(),
    //       x = e.clientX - rect.left,
    //       y = e.clientY - rect.top;

    //     item.style.setProperty("--mouse-x", `${x}px`);
    //     item.style.setProperty("--mouse-y", `${y}px`);
    //   };
    // }

    // console.log(this.monthsList);
    // const yearsList = this.getYearsList();
    // console.log(yearsList);
    // console.log(this.indexYearSelected);

  }
  ngAfterViewInit() {
    let items = (<HTMLElement>this.items.nativeElement);    
    items.onmousemove = e => {
      let dom: any = document.getElementsByClassName("item") as HTMLCollection;
      for (const item of dom) {
        const rect = item.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        item.style.setProperty("--mouse-x", `${x}px`);
        item.style.setProperty("--mouse-y", `${y}px`);
      };
    }

    // const items = (<HTMLElement>this.items.nativeElement);
    // console.log(items);

    // items.addEventListener('onmousemove', () => {
    //   console.log('Buton was clicked');
    // });
    // this.renderer.listen(items, 'onmousemove', () => {
    //   alert('Buton was moved');
    // });

    // this.items.nativeElement.change();

    // btnElement.addEventListener('click', () => {
    //   alert('Buton was clicked');
    // });
  }

  getSectionYears() {
    const i = this.indexYearSelected['i'];
    // const j = this.indexYearSelected['j'];
    const sectionYears = this.yearsList[i];
    return sectionYears;
  }

  getYearsList() {
    const minYear = 1893;
    const maxYear = 2109;
    let arrayLength = maxYear - minYear;
    let numberSections = arrayLength / 12;
    let yearsList = Array.from({ length: numberSections }, x => []);
    let year = minYear;
    for (let i = 0; i < yearsList.length; i++) {
      for (let j = 0; j < 12; j++) {
        if (year == this.yearSelected) {
          this.indexYearSelected = { i: i, j: j };
        }
        yearsList[i].push(year);
        year++;
      }
    }
    return yearsList;
  }

  getMonthsList(arrayMonthsIds) {
    const intlMonth = new Intl.DateTimeFormat(this.locale, { month: 'long' });
    const monthsList = arrayMonthsIds.map(monthIndex => {
      const monthNameLong = intlMonth.format(new Date(this.yearSelected, monthIndex));
      const monthNameShort = monthNameLong.substring(0, 3);
      const nextMonthIndex = monthIndex + 1;
      const daysOfMonth = new Date(this.yearSelected, nextMonthIndex, 0).getDate();
      const startsOn = new Date(this.yearSelected, monthIndex, 1).getDay();
      const endsOn = new Date(this.yearSelected, nextMonthIndex, 0).getDay();
      const daysOfPreviousMonth = new Date(this.yearSelected, monthIndex, 0).getDate();
      const selected = monthIndex == this.monthSelected ? true : false;
      return {
        monthIndex,
        monthNameLong,
        monthNameShort,
        daysOfMonth,
        startsOn,
        endsOn,
        daysOfPreviousMonth,
        selected,
      }
    });
    return monthsList;
  }

  checkViewSelected() {
    if (this.dateSelectorView == 'months') {

    }
  }

  changeView() {
    // this.isMonthSelected = true;
    const newView = this.getNewView();
    switch (newView) {
      case 'years':
        const sectionYears = this.getSectionYears();
        this.dateSelectorTitle = sectionYears[0] + ' - ' + sectionYears[(sectionYears.length - 1)];
        console.log(this.indexYearSelected);


        this.dataToShow = sectionYears;
        console.log(this.dataToShow[this.indexYearSelected['j']]);
        console.log(this.dataToShow);

        // this.isMonthSelected = true;
        // this.monthsList = [data];
        // this.calendarData['monthsList'] = this.monthsList;
        break;
      case 'months':
        this.dateSelectorTitle = this.yearSelected;
        this.dataToShow = this.monthsList;
        // this.monthsList = [data];
        // this.calendarData['monthsList'] = this.monthsList;
        break;
      default:
        break;
    }
    this.dateSelectorView = newView;
    console.log(this.dateSelectorView);

  }

  getNewView() {
    const defaultView = 'months';
    const dictionaryChangeViews = {
      years: 'months',
      months: 'years'
    };
    return dictionaryChangeViews[this.dateSelectorView] ? dictionaryChangeViews[this.dateSelectorView] : defaultView;
  }

  selectNewMonth(newMonth) {
    this.monthsList[this.monthSelected]['selected'] = false;
    this.monthSelected = newMonth.monthIndex;
    this.monthsList[this.monthSelected]['selected'] = true;
    let newData = { newYearSelected: this.yearSelected, newMonthSelected: this.monthSelected };
    this.newDateSelected.emit(newData);
  }

  selectNewYear(newYear) {
    this.oldYearSelected = this.yearSelected;
    this.yearSelected = newYear;
    this.changeView();
  }


}
