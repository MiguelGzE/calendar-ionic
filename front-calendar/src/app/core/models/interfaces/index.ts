export interface DateStruct {
    year: number; //The year, for example 2016
    month: number; //The month, for example 1=Jan ... 12=Dec
    day?: number; // The day of month, starting at 1
}

export interface MonthStruct {
    monthIndex: number;
    monthNameLong: string;
    monthNameShort: string;
    daysOfMonth: number;
    startsOn: number;
    endsOn: number;
    daysOfPreviousMonth: number;
    daysList?;
    isSelectedMonth?;
}

