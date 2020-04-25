import React from 'react';
import { daysOfTheWeek, getCalendar } from '../../utilities/dateUitilities';
import './Calendar.css';

type CalendarProps = {
    dateToShow: Date,
    onClickCell: Function
}

const Calendar: React.FC<CalendarProps> = (props) => {
    function isAnotherMonth(date: Date) {
        return date.getMonth() !== props.dateToShow.getMonth();
    }

    return (
        <table>
            <thead>
                <tr>
                    {daysOfTheWeek.map(dayOfTheWeek => <th key={dayOfTheWeek}>{dayOfTheWeek}</th>)}
                </tr>
            </thead>
            <tbody>
                {getCalendar(props.dateToShow).map((week, weekIndex) =>
                    <tr key={weekIndex}>
                        {week.map(day =>
                            <td onClick={() => props.onClickCell()} className={isAnotherMonth(day) ? "isAnotherMonth" : undefined} key={day.getTime()}>
                                <div className="cell">
                                    <span className="day">{day.getDate()}</span>
                                </div>
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Calendar;
