import React, { useEffect } from 'react';
import { daysOfTheWeek, getCalendar, daysOfTheWeekShort, isBeforeNow } from '../../utilities/dateUitilities';
import './Calendar.css';
import Reminder from '../../classes/Reminder';
import { connect } from 'react-redux';
import { RootState } from '../../stores';
import { changeSelectedReminder } from '../../stores/selectedReminderSlice';
import { changeCurrentCalendarDate } from '../../stores/currentCalendarDateSlice';
import { getReminderStyle, getRemindersOfDateOrdered, getReminderHours } from '../../utilities/calendarUtilities';

type CalendarProps = {
    changeCurrentCalendarDate: typeof changeCurrentCalendarDate,
    changeSelectedReminder: typeof changeSelectedReminder,
    currentCalendarDate: Date,
    selectedReminder: Reminder,
    onClickCell: Function,
    onClickReminder: Function,
    onClickShowMoreReminders: Function,
    reminders: Array<Reminder>
}

const Calendar: React.FC<CalendarProps> = (props) => {
    const [maximumRemindersNumberByCell, setMaximumRemindersNumberByCell] = React.useState(0);

    function isAnotherMonth(date: Date) {
        return date.getMonth() !== props.currentCalendarDate.getMonth();
    }

    function onClickCellHandler(date: Date) {
        props.changeSelectedReminder(new Reminder(date));
        props.onClickCell();
    }

    function onClickShowMoreRemindersHandler(date: number, event: React.MouseEvent) {
        props.changeCurrentCalendarDate(date);
        event.stopPropagation();
        props.onClickShowMoreReminders();
    }

    function onClickReminderHandler(reminder: Reminder, event: React.MouseEvent) {
        event.stopPropagation();
        props.onClickReminder(reminder);
    }

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
    }, [])

    function handleResize() {
        setMaximumRemindersNumberByCell(getMaximumRemindersByCell());
    }

    function getMaximumRemindersByCell() {
        const daySpanSize = 26;
        const reminderSize = 21;
        return Math.trunc((getCellHeight() - daySpanSize) / reminderSize);
    }

    function getCellHeight(): number {
        return document.getElementsByTagName('td')[0].clientHeight;
    }

    function getReminders(date: Date) {
        const reminders = getRemindersOfDateOrdered(date, props.reminders);
        if (reminders.length <= maximumRemindersNumberByCell) {
            return reminders.map(reminder => renderReminder(reminder));
        } else {
            const resultToRender = reminders.slice(0, maximumRemindersNumberByCell - 1).map(reminder => renderReminder(reminder));
            resultToRender.push(showMoreReminders(date, reminders.length - maximumRemindersNumberByCell + 1));
            return resultToRender;
        }
    }

    function renderReminder(reminder: Reminder) {
        return <span className={isBeforeNow(reminder.date) ? "is-before-now" : undefined} onClick={(event) => onClickReminderHandler(reminder, event)} key={reminder.id} style={getReminderStyle(reminder)}><span className='reminder-hours'>{getReminderHours(reminder)}</span><span className="reminder-title">{reminder.title}</span></span>
    }

    function showMoreReminders(date: Date, remindersLeft: number) {
        return <span onClick={(event) => onClickShowMoreRemindersHandler(date.getDate(), event)}>{remindersLeft} more</span>
    }

    return (
        <table>
            <thead>
                <tr className="long-days-of-the-week">
                    {daysOfTheWeek.map(dayOfTheWeek => <th key={dayOfTheWeek}>{dayOfTheWeek}</th>)}
                </tr>
                <tr className="short-days-of-the-week">
                    {daysOfTheWeekShort.map(dayOfTheWeek => <th key={dayOfTheWeek}>{dayOfTheWeek}</th>)}
                </tr>
            </thead>
            <tbody>
                {getCalendar(props.currentCalendarDate).map((week, weekIndex) =>
                    <tr key={weekIndex}>
                        {week.map(day =>
                            <td onClick={() => onClickCellHandler(day)} className={isAnotherMonth(day) ? "is-another-month" : undefined} key={day.getTime()}>
                                <span className="day">{day.getDate()}</span>
                                <div className="reminders">
                                    {getReminders(day)}
                                </div>
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table >
    );
}

const mapState = (state: RootState) => state;

const actionCreators = {
    changeSelectedReminder,
    changeCurrentCalendarDate
};

export default connect(
    mapState,
    actionCreators
)(Calendar);
