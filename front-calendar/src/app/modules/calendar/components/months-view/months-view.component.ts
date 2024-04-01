import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DateStruct, MonthStruct } from 'src/app/core/models/interfaces';
import { CalendarView } from 'src/app/core/models/types';

@Component({
  selector: 'app-months-view',
  templateUrl: './months-view.component.html',
  styleUrls: ['./months-view.component.scss']
})
export class MonthsViewComponent implements OnChanges {

  @Input() calendarView: CalendarView;
  @Input() calendarData;
  @Input() isMonthSelected: boolean;
  @Input() dictionaryMonthsSelected: Array<DateStruct>;
  @Input() isChangeOfViewFromSideBar: boolean;
  @Output() monthViewEmit: EventEmitter<any> = new EventEmitter();
  @Output() clickOnMonth: EventEmitter<DateStruct> = new EventEmitter();
  @Output() clickOnMonthName: EventEmitter<number> = new EventEmitter();
  yearSelected: number;
  monthsList: Array<MonthStruct>;
  weekDaysList: Array<MonthStruct>;
  typeText: string;
  yearText: string;

  constructor() { }

  ngOnChanges() {
    // if (!this.isMonthSelected) {

    if (this.isChangeOfViewFromSideBar) {
      this.typeText = this.calendarView === 'year' ? 'Short' : 'Long';
      const currentYear = this.calendarData.currentYear;
      this.yearSelected = this.calendarData.yearSelected;
      this.monthsList = JSON.parse(JSON.stringify(this.calendarData.monthsList));
      this.weekDaysList = this.calendarData.weekDaysList;
      this.yearText = currentYear != this.yearSelected ? ' - ' + this.yearSelected : '';
      // this.setSelectedMonth();
      this.setDaysOfAllMonths();
      console.log(this.monthsList);
      
    }
    // }
  }

  // setSelectedMonth() {
  //   if (this.calendarView === '') {

  //   }
  // }

  setDaysOfAllMonths() {
    this.monthsList.forEach((month, _index) => {
      let daysList = [];
      daysList = this.addDaysPreviousMonth(daysList, month);
      daysList = this.addDaysMonth(daysList, month);
      daysList = this.addDaysNextMonth(daysList, month);
      month['daysList'] = daysList;
      // for (let i = 1; i <= lastDayMonth; i++) {
      // if (this.tipoCalendario == 0) {
      //   if (
      //     i === new Date().getDate() &&
      //     item.value === new Date().getMonth()
      //     && item.year === new Date().getFullYear()
      //   ) {
      //     days.push({ class: 'today', value: i, style: { 'background-color': '#299e4c' }, events: [] });
      //   } else {
      //     let obj = { class: 'day', value: i, events: [] };

      //     if (
      //       (item.value == this.fechaInicio.getMonth() && i == this.fechaInicio.getDate() &&
      //         item.year == this.fechaInicio.getFullYear()) ||
      //       (item.value == this.fechaFin.getMonth() && i == this.fechaFin.getDate() &&
      //         item.year == this.fechaFin.getFullYear())
      //     ) {
      //       obj['class'] = "day day-active";
      //       obj['style'] = { 'background-color': '#00addf' };
      //       obj['events'].push({
      //         color: '#00addf',
      //         evento_nombre: this.Ciclo['ciclo_desc'],
      //         fecha_inicio: this.Ciclo['fecha_inicio'],
      //         fecha_fin: this.Ciclo['fecha_fin']
      //       })
      //     }

      //     // PARA PINTAR LOS DIAS ENTRE 2 FECHAS.
      //     // if(this.fechaFin.getFullYear() == this.fechaInicio.getFullYear()) {
      //     // this.anioInicio = this.fechaInicio.getFullYear();
      //     // this.anioFin = this.ani;

      //     //   if (
      //     //     (i >= this.fechaInicio.getDate() && item.value == this.fechaInicio.getMonth()) ||
      //     //     (item.value > this.fechaInicio.getMonth() && item.value < this.fechaFin.getMonth()) ||
      //     //     (item.value == this.fechaFin.getMonth() && i <= this.fechaFin.getDate())
      //     //   ) {
      //     //     obj['class'] = "day day-active"
      //     //   }
      //     // }else if (this.fechaFin.getFullYear() > this.fechaInicio.getFullYear()) {
      //     //   if (
      //     //     ( i >= this.fechaInicio.getDate() && item.value == this.fechaInicio.getMonth() 
      //     //       && item.year == this.fechaInicio.getFullYear()) ||
      //     //     (item.value > this.fechaInicio.getMonth() && item.year == this.fechaInicio.getFullYear()) ||
      //     //     (item.year > this.fechaInicio.getFullYear() && item.value < this.fechaFin.getMonth()) ||
      //     //     (item.year > this.fechaInicio.getFullYear() && item.value == this.fechaFin.getMonth() &&
      //     //     i <= this.fechaFin.getDate())
      //     //   )
      //     //   {
      //     //     obj['class'] = "day day-active"
      //     //   }
      //     // }
      //     days.push(obj);
      //   }
      // } else {
      //   let obj = { class: 'day', value: i };
      //   daysList.push(obj);
      //   // }
      // }

      // let nextDays = daysList.length <= 35 ? (13 - (lastDayIndex)) : (6 - (lastDayIndex));

      // if (nextDays > 0) {
      //   for (let j = 1; j <= nextDays; j++) {
      //     days.push({ class: 'next-month', value: j });
      //   }
      // }
      // let length = daysList.length / 7;
      // let module = daysList.length % 7;
      // console.log(length, module);


      // let arrayLength = Array.from({ length: length }, x => 7);
      // if (module != 0) {
      //   arrayLength.push(module);
      // }

      // let indexArray = 0;
      // let index = 0;
      // this.monthsList[_index]['weeks'] = Array.from({ length: arrayLength.length }, x => []);

      // for (let i = 0; i < arrayLength.length; i++) {
      //   for (let j = 0; j < arrayLength[indexArray]; j++) {
      //     this.monthsList[_index]['weeks'][i].push(daysList[index]);
      //     index++;
      //   }
      //   indexArray++;
      // }
      // console.log(this.weeksCount(2018, 9));
    });
  }

  //   /**
  //  * Returns count of weeks for year and month
  //  *
  //  * @param {Number} year - full year (2016)
  //  * @param {Number} month_number - month_number is in the range 1..12
  //  * @returns {number}
  //  */
  //   weeksCount (year, month_number) {
  //     var firstOfMonth = new Date(year, month_number - 1, 1);
  //     var day = firstOfMonth.getDay() || 6;
  //     day = day === 1 ? 0 : day;
  //     if (day) { day-- }
  //     var diff = 7 - day;
  //     var lastOfMonth = new Date(year, month_number, 0);
  //     var lastDate = lastOfMonth.getDate();
  //     if (lastOfMonth.getDay() === 1) {
  //       diff--;
  //     }
  //     var result = Math.ceil((lastDate - diff) / 7);
  //     return result + 1;
  //   }

  addDaysPreviousMonth(daysList, month) {
    const firstDayIndex = month.startsOn;
    const daysOfPreviousMonth = month.daysOfPreviousMonth;
    if (firstDayIndex > 0) {
      for (let i = firstDayIndex; i > 0; i--) {
        daysList.push(
          { class: 'prev-month', value: daysOfPreviousMonth - i + 1 }
        );
      }
    }
    return daysList;
  }

  addDaysMonth(daysList, month) {
    const daysOfMonth = month.daysOfMonth;
    for (let i = 1; i <= daysOfMonth; i++) {
      daysList.push({ class: 'day', value: i });
    }
    return daysList;
  }

  addDaysNextMonth(daysList, month) {
    const endsOn = month.endsOn;
    let daysNextMonth = daysList.length <= 35 ? (13 - (endsOn)) : (6 - (endsOn));
    if (daysNextMonth > 0) {
      for (let i = 1; i <= daysNextMonth; i++) {
        daysList.push({ class: 'next-month', value: i });
      }
    }
    return daysList;
  }

  changeViewToOnlyOneMonth(month) {
    console.log(month);
    console.log(this.monthsList);


    // this.clickOnMonth.emit(month);
  }

  showOtherMonth(index, show: string) {
    console.log(index, show);
    let newMonthIndex;
    if (show === 'previous') {
      newMonthIndex = index - 1;
      // if (newMonthIndex =) {

      // }
    } else {
      newMonthIndex = index + 1;
    }

    this.showNewMonth(newMonthIndex);
  }

  showNewMonth(newMonthIndex) {
    let indexSelectedMonth = this.monthsList.findIndex(m => m['isSelectedMonth'] === true);
    if (indexSelectedMonth) {
      this.monthsList[indexSelectedMonth]['isSelectedMonth'] = false;
    }
    this.monthsList[newMonthIndex]['isSelectedMonth'] = true;
  }

  selectNewMonth(currentMonthIndex) {
    this.clickOnMonthName.emit(currentMonthIndex);
  }

  // setMonths() {

  //   // this.monthsList = Array.from({ length: this.months.length }, (x, i) => ({ month: this.months[i] }));
  //   // let lastDayMonth, prevLastDayMonth, firstDayIndex, lastDayIndex, nextDays, days;

  //   this.months.forEach((month, _index) => {
  //     lastDayMonth = new Date(item.year, item.value + 1, 0).getDate();
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
  //     this.monthsList[_index]['weeks'] = Array.from({ length: arrayLength.length }, x => []);

  //     for (let i = 0; i < arrayLength.length; i++) {
  //       for (let j = 0; j < arrayLength[indexArray]; j++) {
  //         this.monthsList[_index]['weeks'][i].push(days[index]);
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

  //   //     let mesInicio = this.monthsList.find(m => m.month.value == _fechaInicio.getMonth()
  //   //       && m.month.year == _fechaInicio.getFullYear());
  //   //     let mesFin = this.monthsList.find(m => m.month.value == _fechaFin.getMonth()
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

  //   //       let _mesInicio = this.monthsList.map(m => { return m.month }).findIndex(_m => _m.value == mes && _m.year == anio);
  //   //       let _mesFin = this.monthsList.map(m => { return m.month }).findIndex(_m => _m.value == mesF && _m.year == anioF);

  //   //       for (let i = _mesInicio; i <= _mesFin; i++) {
  //   //         //i es igual al indice del mes en monthsList
  //   //         this.monthsList[i].weeks.forEach(week => {
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
