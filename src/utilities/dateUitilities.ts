export function getCalendar(date: Date): Array<Array<Date>> {
    const previousMonthDate = new Date(date);
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
    const nextMonthDate = new Date(date);
    nextMonthDate.setMonth(date.getMonth() + 1);
    const lastDayOfThepreviousMonth = getLastDayOfMonth(previousMonthDate);
    const dayOfWeekOfFirstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDayOfTheMonth = getLastDayOfMonth(date);

    const calendar = new Array<Array<Date>>(6);

    const firstRowOfCalendar = new Array<Date>(7);

    let dayToPrint = lastDayOfThepreviousMonth;

    if (dayOfWeekOfFirstDay !== 0) {
        for (let i = dayOfWeekOfFirstDay - 1; i >= 0; i--) {
            firstRowOfCalendar[i] = new Date(previousMonthDate.getFullYear(), previousMonthDate.getMonth(), dayToPrint);
            dayToPrint--;
        }
    }
    dayToPrint = 1;
    let isNextMonth: boolean = false;
    for (let i = 0; i < calendar.length; i++) {
        let rowOfCalendar = new Array<Date>(7);
        let initialColumn = 0;
        if (i === 0) {
            rowOfCalendar = firstRowOfCalendar;
            initialColumn = dayOfWeekOfFirstDay;
        }
        for (let j = initialColumn; j < rowOfCalendar.length; j++) {
            if (dayToPrint > lastDayOfTheMonth) {
                isNextMonth = true;
                dayToPrint = 1;
            }
            const dateMonth = isNextMonth ? nextMonthDate: date;
            rowOfCalendar[j] = new Date(dateMonth.getFullYear(), dateMonth.getMonth(), dayToPrint);
            dayToPrint++;
        }
        calendar[i] = rowOfCalendar;
    }
    return calendar;
}

function getLastDayOfMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export interface day {
    isOutsideOfCurrentMonth: boolean,
    isEndOfTheWeek: boolean,
    number: number
}

export const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];