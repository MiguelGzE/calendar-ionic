import { Component, OnChanges, Input } from '@angular/core';
import { DateStruct, MonthStruct } from 'src/app/core/models/interfaces';
import { CalendarView, CalendarViewOption, Locale, Theme } from 'src/app/core/models/types';


@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss']
})
export class MainCalendarComponent implements OnChanges {

  @Input() calendarViewSelected: CalendarViewOption;
  @Input() locale: Locale;
  @Input() isSideBarCollapsed: boolean;
  @Input() isChangeOfViewFromSideBar: boolean;
  calendarLoading: boolean = true;
  calendarView: CalendarView;
  dateSelected: DateStruct;
  currentYear: number;
  yearSelected: number;
  monthSelected: number;
  daySelected: number;
  monthsList: Array<MonthStruct>;
  weekDaysList: Array<any>;
  calendarData: Object;
  showDateSelector: boolean = false;

  // dictionaryMonths = {
  //   en: {
  //     monthNames: [
  //       { long: 'January', short: 'Jan' }, { long: 'February', short: 'Feb' }, { long: 'March', short: 'Mar' },
  //       { long: 'April', short: 'Apr' }, { long: 'May', short: 'May' }, { long: 'June', short: 'Jun' },
  //       { long: 'July', short: 'Jul' }, { long: 'August', short: 'Aug' }, { long: 'September', short: 'Sep' },
  //       { long: 'October', short: 'Oct' }, { long: 'November', short: 'Nov' }, { long: 'December', short: 'Dec' }
  //     ],
  //     dayNames: [
  //       { long: 'Sun', short: 'S' }, { long: 'Mon', short: 'M' }, { long: 'Tue', short: 'T' },
  //       { long: 'Wed', short: 'W' }, { long: 'Thu', short: 'T' }, { long: 'Fri', short: 'F' },
  //       { long: 'Sat', short: 'S' }
  //     ]
  //   },
  //   es: {
  //     monthNames: [
  //       { long: 'Enero', short: 'Ene' }, { long: 'Febrero', short: 'Feb' }, { long: 'Marzo', short: 'Mar' },
  //       { long: 'Abril', short: 'Abr' }, { long: 'Mayo', short: 'May' }, { long: 'Junio', short: 'Jun' },
  //       { long: 'Julio', short: 'Jul' }, { long: 'Agosto', short: 'Ago' }, { long: 'Septiembre', short: 'Sep' },
  //       { long: 'Octubre', short: 'Oct' }, { long: 'Noviembre', short: 'Nov' }, { long: 'Diciembre', short: 'Dic' }
  //     ],
  //     dayNames: [
  //       { long: 'Dom', short: 'D' }, { long: 'Lun', short: 'L' }, { long: 'Mar', short: 'M' },
  //       { long: 'Mié', short: 'M' }, { long: 'Jue', short: 'J' }, { long: 'Vie', short: 'V' },
  //       { long: 'Sáb', short: 'S' }
  //     ]
  //   }
  // };
  isMonthSelected: boolean = false;

  constructor() { }

  ngOnChanges() {
    if (this.isChangeOfViewFromSideBar) {
      this.calendarLoading = true;
      this.calendarView = this.calendarViewSelected.view;
      const currentDate = new Date();
      this.currentYear = currentDate.getFullYear();
      this.yearSelected = this.currentYear;
      this.monthSelected = currentDate.getMonth();
      this.daySelected = currentDate.getDate();
      this.setDataOfCalendarView();
      this.calendarLoading = false;
    }
  }

  // changeCalendarView() {
  //   this.calendarView = this.calendarView === 'month' ? 'year' : 'month';
  // }

  setDataOfCalendarView() {
    // this.calendarView = newCalendarView;
    this.isMonthSelected = false;
    // if (this.calendarView == 'month') {
    //   const arrayMonthsIds = [this.monthSelected];
    //   this.setDataCalendarForMonthsView(arrayMonthsIds);
    // } else if (this.calendarView == 'year') {
    // const arrayMonthsIds = Array.from(Array(12).keys());
    // this.setDataCalendarForMonthsView(arrayMonthsIds);
    // }
    if (this.calendarView === 'month' || this.calendarView === 'year') {
      const arrayMonthsIds = Array.from(Array(12).keys());
      this.setDataCalendarForMonthsView(arrayMonthsIds);
    }
  }

  setDataCalendarForMonthsView(arrayMonthsIds) {
    this.weekDaysList = this.getWeekDaysList();
    this.monthsList = this.getMonthsList(arrayMonthsIds);
    this.calendarData = {
      currentYear: this.currentYear,
      yearSelected: this.yearSelected,
      monthsList: this.monthsList,
      weekDaysList: this.weekDaysList
    };
  }

  getWeekDaysList() {
    const weekDays = Array.from(Array(7).keys());
    const intlWeekDay = new Intl.DateTimeFormat(this.locale, { weekday: 'long' });
    const weekDaysList = weekDays.map(weekDay => {
      const dateStartsOnMonday = new Date(2021, 10, (weekDay + 1));
      const weekDayName = intlWeekDay.format(dateStartsOnMonday);
      const weekDayNameLong = weekDayName.substring(0, 3);
      const weekDayNameShort = weekDayNameLong.substring(0, 1);
      return {
        weekDayNameLong,
        weekDayNameShort
      }
    });
    return weekDaysList;
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
      const isSelectedMonth = this.monthSelected == monthIndex ? true : false;
      return {
        monthIndex,
        monthNameLong,
        monthNameShort,
        daysOfMonth,
        startsOn,
        endsOn,
        daysOfPreviousMonth,
        isSelectedMonth
      }
    });
    return monthsList;
  }

  changeView(data) {
    this.isChangeOfViewFromSideBar = false;
    // this.isMonthSelected = true;
    const newView = this.getNewView();
    // switch (newView) {
    //   case 'month':
    //     // this.isMonthSelected = true;
    //     // this.monthsList = [data];
    //     // this.calendarData['monthsList'] = this.monthsList;
    //     break;
    //   // case 'month':
    //   //   // this.monthsList = [data];
    //   //   // this.calendarData['monthsList'] = this.monthsList;
    //   //   break;
    //   default:
    //     break;
    // }
    this.calendarView = newView;
  }

  getNewView() {
    const defaultView = 'year';
    const dictionaryChangeViews = {
      year: 'month',
      month: 'day'
    };
    return dictionaryChangeViews[this.calendarView] ? dictionaryChangeViews[this.calendarView] : defaultView;
  }

  openDateSelector(monthSelected) {
    this.monthSelected = monthSelected;
    this.showDateSelector = !this.showDateSelector;
    // const arrayMonthsIds = Array.from(Array(12).keys());
    // const arrayMonths = this.getMonthsList(arrayMonthsIds);
  }

  setNewDataSelected(newData) {
    this.yearSelected = newData['newYearSelected'];
    this.monthSelected = newData['newMonthSelected'];
    this.setDataOfCalendarView();
    setTimeout(() => {
      this.showDateSelector = false;
    }, 100);
  }

  // getStyleObject(): Object {
  //   if (this.calendarView === 'year') {
  //     return { height: '90%', bottom: '0' }
  //   }
  //   return { height: '50%' };
  // }

  // setMonths() {

  //   this.arrayMonths = Array.from({ length: this.months.length }, (x, i) => ({ month: this.months[i] }));
  //   let lastDayMonth, prevLastDayMonth, firstDayIndex, lastDayIndex, nextDays, days;

  //   this.months.forEach((month, _index) => {
  //     lastDayMonth = new Date(month.year, month.value + 1, 0).getDate();
  //     prevLastDayMonth = new Date(month.year, month.value, 0).getDate();
  //     firstDayIndex = new Date(month.year, month.value, 1).getDay();
  //     lastDayIndex = new Date(month.year, month.value + 1, 0).getDay();
  //     days = [];


  //     if (firstDayIndex > 0) {
  //       for (let i = firstDayIndex; i > 0; i--) {
  //         days.push(
  //           { class: 'prev-month', value: prevLastDayMonth - i + 1 }
  //         );
  //       }
  //     }

  //     for (let i = 1; i <= lastDayMonth; i++) {
  //       if (this.tipoCalendario == 0) {
  //         if (
  //           i === new Date().getDate() &&
  //           month.value === new Date().getMonth()
  //           && month.year === new Date().getFullYear()
  //         ) {
  //           days.push({ class: 'today', value: i, style: { 'background-color': '#299e4c' }, events: [] });
  //         } else {
  //           let obj = { class: 'day', value: i, events: [] };

  //           if (
  //             (month.value == this.fechaInicio.getMonth() && i == this.fechaInicio.getDate() &&
  //               month.year == this.fechaInicio.getFullYear()) ||
  //             (month.value == this.fechaFin.getMonth() && i == this.fechaFin.getDate() &&
  //               month.year == this.fechaFin.getFullYear())
  //           ) {
  //             obj['class'] = "day day-active";
  //             obj['style'] = { 'background-color': '#00addf' };
  //             obj['events'].push({
  //               color: '#00addf',
  //               evento_nombre: this.Ciclo['ciclo_desc'],
  //               fecha_inicio: this.Ciclo['fecha_inicio'],
  //               fecha_fin: this.Ciclo['fecha_fin']
  //             })
  //           }

  //           // PARA PINTAR LOS DIAS ENTRE 2 FECHAS.
  //           // if(this.fechaFin.getFullYear() == this.fechaInicio.getFullYear()) {
  //           // this.anioInicio = this.fechaInicio.getFullYear();
  //           // this.anioFin = this.ani;

  //           //   if (
  //           //     (i >= this.fechaInicio.getDate() && month.value == this.fechaInicio.getMonth()) ||
  //           //     (month.value > this.fechaInicio.getMonth() && month.value < this.fechaFin.getMonth()) ||
  //           //     (month.value == this.fechaFin.getMonth() && i <= this.fechaFin.getDate())
  //           //   ) {
  //           //     obj['class'] = "day day-active"
  //           //   }
  //           // }else if (this.fechaFin.getFullYear() > this.fechaInicio.getFullYear()) {
  //           //   if (
  //           //     ( i >= this.fechaInicio.getDate() && month.value == this.fechaInicio.getMonth() 
  //           //       && month.year == this.fechaInicio.getFullYear()) ||
  //           //     (month.value > this.fechaInicio.getMonth() && month.year == this.fechaInicio.getFullYear()) ||
  //           //     (month.year > this.fechaInicio.getFullYear() && month.value < this.fechaFin.getMonth()) ||
  //           //     (month.year > this.fechaInicio.getFullYear() && month.value == this.fechaFin.getMonth() &&
  //           //     i <= this.fechaFin.getDate())
  //           //   )
  //           //   {
  //           //     obj['class'] = "day day-active"
  //           //   }
  //           // }
  //           days.push(obj);
  //         }
  //       } else {
  //         let obj = { class: 'day', value: i };
  //         days.push(obj);
  //       }
  //     }

  //     days.length <= 35 ? nextDays = 13 - (lastDayIndex) : nextDays = 6 - (lastDayIndex);

  //     if (nextDays > 0) {
  //       for (let j = 1; j <= nextDays; j++) {
  //         days.push({ class: 'next-month', value: j });
  //       }
  //     }

  //     let length = days.length / 7;
  //     let module = days.length % 7;

  //     let arrayLength = Array.from({ length: length }, x => 7);
  //     if (module != 0) {
  //       arrayLength.push(module)
  //     }

  //     let indexArray = 0;
  //     let index = 0;
  //     this.arrayMonths[_index]['weeks'] = Array.from({ length: arrayLength.length }, x => []);

  //     for (let i = 0; i < arrayLength.length; i++) {
  //       for (let j = 0; j < arrayLength[indexArray]; j++) {
  //         this.arrayMonths[_index]['weeks'][i].push(days[index]);
  //         index++;
  //       }
  //       indexArray++;
  //     }
  //   });

  //   // if (this.Events) {
  //   //   let _inicio, _fin, _fechaInicio, _fechaFin;
  //   //   this.Events.forEach(event => {

  //   //     _inicio = event['fecha_inicio'].split('-');
  //   //     _fin = event['fecha_fin'].split('-');

  //   //     _fechaInicio = new Date(_inicio[0], parseInt(_inicio[1]) - 1, _inicio[2]);
  //   //     _fechaFin = new Date(_fin[0], parseInt(_fin[1]) - 1, _fin[2], 23, 59, 59);

  //   //     let mesInicio = this.arrayMonths.find(m => m.month.value == _fechaInicio.getMonth()
  //   //       && m.month.year == _fechaInicio.getFullYear());
  //   //     let mesFin = this.arrayMonths.find(m => m.month.value == _fechaFin.getMonth()
  //   //       && m.month.year == _fechaFin.getFullYear());

  //   //     if (mesInicio && mesFin && mesInicio == mesFin) {
  //   //       mesInicio.weeks.forEach(week => {
  //   //         week.forEach(day => {
  //   //           if (day.value >= _fechaInicio.getDate() && day.value <= _fechaFin.getDate()) {
  //   //             this.setBackground(day, _fechaInicio, _fechaFin, event);
  //   //           }
  //   //         });
  //   //       });
  //   //     } else if (mesInicio && mesFin && mesInicio != mesFin) {

  //   //       let mes = _fechaInicio.getMonth();
  //   //       let mesF = _fechaFin.getMonth();
  //   //       let anio = _fechaInicio.getFullYear();
  //   //       let anioF = _fechaFin.getFullYear();

  //   //       let _mesInicio = this.arrayMonths.map(m => { return m.month }).findIndex(_m => _m.value == mes && _m.year == anio);
  //   //       let _mesFin = this.arrayMonths.map(m => { return m.month }).findIndex(_m => _m.value == mesF && _m.year == anioF);

  //   //       for (let i = _mesInicio; i <= _mesFin; i++) {
  //   //         //i es igual al indice del mes en arrayMonths
  //   //         this.arrayMonths[i].weeks.forEach(week => {
  //   //           week.forEach(day => {
  //   //             if (
  //   //               (day.value >= _fechaInicio.getDate() && i == _mesInicio) ||
  //   //               (i > _mesInicio && i < _mesFin) ||
  //   //               (i == _mesFin && day.value <= _fechaFin.getDate())
  //   //             ) {
  //   //               this.setBackground(day, _fechaInicio, _fechaFin, event);
  //   //             }
  //   //           });
  //   //         });
  //   //       }
  //   //     }
  //   //   });
  //   // }

  //   setTimeout(() => {
  //     this.loading = false;
  //   }, 1);
  // }

  // setBackground(day, _fechaInicio, _fechaFin, event) {
  //   if (day.class != 'prev-month' && day.class != 'next-month') {
  //     day['events'].push({
  //       color: event.color,
  //       evento_nombre: event.evento_nombre,
  //       evento_desc: event.evento_desc,
  //       fecha_inicio: event.fecha_inicio,
  //       fecha_fin: event.fecha_fin
  //     });
  //     if (day['style']) {
  //       if (day['style']['background-color']) {
  //         day['style'] = { 'background': `linear-gradient(to bottom, ${day['style']['background-color']} 50%, ${event['color']} 50%)`, 'color': 'white' }
  //       } else if (day['style']['background']) {
  //         let init = day['style']['background'].indexOf('(');
  //         let fin = day['style']['background'].indexOf(')');
  //         let array = day['style']['background'].substring(init + 1, fin).split(',');
  //         let colors = array.splice(1);
  //         let string_colors = "";
  //         let arrayColors = [];
  //         colors.forEach(color => {
  //           let _color = color.split(' ')[1];
  //           if (arrayColors.indexOf(_color) == -1) arrayColors.push(_color)
  //         });
  //         let percent = (100 / (arrayColors.length + 1));

  //         arrayColors.forEach((color, i) => {
  //           string_colors += `${color} ${percent * (i)}%, `
  //           string_colors += `${color} ${percent * (i + 1)}%, `
  //         });
  //         string_colors += `${event['color']} ${percent * (arrayColors.length)}%, `
  //         string_colors += `${event['color']} 100%`;

  //         day['style'] = { 'background': `linear-gradient(to bottom, ${string_colors})`, 'color': 'white' }
  //       }
  //     } else {
  //       day['style'] = { 'background-color': event['color'], 'color': 'white' };
  //     }
  //   }
  // }

  // openModal(modal, month, day) {
  //   this.monthSelected = month;
  //   this.monthSelected['day'] = day;
  //   this.eventsDate = this.monthSelected['day']['events'];
  //   this._modalService.open(modal, { size: "lg" });
  // }

  // setDate(month, day) {
  //   function toInt(object) {
  //     Object.keys(object).forEach(el => {
  //       object[el] = parseInt(object[el]);
  //     });
  //     return object;
  //   }

  //   //Hora que se seleccionó en formulario, se convierte a enteros
  //   let hourSelected = toInt(this.Datos.hora_inicio);
  //   //Duración que se seleccionó en formulario, se convierte a enteros
  //   let duration = toInt(this.Datos.duracion);

  //   let horas = hourSelected.hour;
  //   let minutos = hourSelected.minute;
  //   let fin_horas = duration.hours;
  //   let fin_minutos = duration.minutes;

  //   let horas_Segundos = (horas * 3600) + (fin_horas * 3600);
  //   let minutos_Segundos = (minutos * 60) + (fin_minutos * 60);

  //   let segundos = minutos_Segundos + horas_Segundos;

  //   let hours = Math.floor(segundos / 3600);
  //   let minutes: any = Math.floor((segundos % 3600) / 60);

  //   // minutes = minutes < 10 ? '0' + minutes : minutes;

  //   // Hora y minutos de fin, si es mayor de 24 es error
  //   if (hours >= 24) {
  //     alertify.error('La duración de la videoconferencia no debe pasar del día seleccionado')
  //   } else {
  //     let duracion = hours - parseInt(horas);
  //     if (duracion > 8 || (duracion == 8 && minutes > 0)) {
  //       alertify.error('La videoconferencia no debe durar más de 8 horas').dismissOthers();
  //     } else {
  //       //Fecha que se selecciona del calendario
  //       let dateSelected = JSON.stringify({
  //         "year": month.year,
  //         "month": month.value,
  //         "day": day.value
  //       });

  //       let sameDay = this.Datos.lista.filter(d => JSON.stringify(d.fecha_inicio.fecha) == dateSelected);
  //       if (sameDay.length > 0) {
  //         let copiedDate = JSON.parse(dateSelected);
  //         let date = { year: copiedDate.year, month: parseInt(copiedDate.month) + 1, day: parseInt(copiedDate.day) }

  //         let fechaInicio = this._fechaService.formatoFecha(date, hourSelected, 0);
  //         let fechaFin = this._fechaService.formatoFecha(date, { hour: hours, minute: minutes }, 0);

  //         let flag = true;

  //         sameDay.forEach(d => {
  //           let inicio = d.fecha_inicio;
  //           let fin = d.fecha_fin;
  //           let fecha = { year: inicio.fecha.year, month: parseInt(inicio.fecha.month) + 1, day: parseInt(inicio.fecha.day) }
  //           let fechaInicioBd = this._fechaService.formatoFecha(fecha, inicio.hora, 0);
  //           let fechaFinBd = this._fechaService.formatoFecha(fecha, fin.hora, 0);

  //           let validation = this.validateDate(fechaInicioBd, fechaFinBd, fechaInicio, fechaFin);
  //           if (!validation) {
  //             flag = false;
  //           }
  //         });

  //         if (flag) {
  //           this.selectDate(dateSelected, day)
  //         } else {
  //           alertify.error('Ya existe una videollamada programada en el horario seleccionado').dismissOthers();
  //         }
  //       } else {
  //         this.selectDate(dateSelected, day);
  //       }

  //     }
  //   }

  //   // let exist = this.Datos.lista.find(d => JSON.stringify(d.fecha_inicio.fecha) == dateSelected 
  //   //   && JSON.stringify(d.fecha_inicio.hora) == hourSelected);

  //   // if (!exist) {

  //   // } else {
  //   //   alertify.error('La fecha ya existe').dismissOthers();
  //   // }
  // }


  // validateDate(from, to, checkFrom, checkTo){
  //     let getvalidDate =  (d) => { return new Date(d) }

  //     if (
  //       (getvalidDate(checkFrom) >= getvalidDate(from) && getvalidDate(checkFrom) < getvalidDate(to)) ||
  //       (getvalidDate(checkFrom) <= getvalidDate(from) && getvalidDate(checkTo) > getvalidDate(from))
  //       ) {
  //       return false;
  //     }else {
  //       return true;
  //     }
  // }

  // selectDate(dateSelected, day) {
  //   let duplicated = this.arraySelected.find(s => s === dateSelected);

  //   if (!duplicated && (day.class == 'day' || day.class == 'day day-selected')) {
  //     this.arraySelected.push(dateSelected);
  //     day['class'] = "day day-selected";
  //     day['style'] = { 'background-color': '#d1ecf1' };
  //     this.Fechas.emit(this.arraySelected);
  //   } else if (duplicated && (day.class == 'day' || day.class == 'day day-selected')) {
  //     let index = this.arraySelected.findIndex(s => s === dateSelected);
  //     this.arraySelected.splice(index, 1);
  //     day['class'] = "day";
  //     delete day['style'];
  //     this.Fechas.emit(this.arraySelected);
  //   }
  // }
}
