import Reminder from "../classes/Reminder";
import chroma from 'chroma-js';
import { areInTheSameDay } from "./dateUitilities";
import moment from "moment";

export function getReminderString(reminder: Reminder) {
    return `${getReminderHours(reminder)} ${reminder.title}`;
}

export function getReminderHours(reminder: Reminder) {
    return reminder.date.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
}

export function getReminderStyle(reminder: Reminder) {
    return { background: reminder.color, color: getContrastColor(reminder.color) }
}

function getContrastColor(background: string) {
    return chroma(background).luminance() > 0.4 ? "#000" : "#f2f2f2"
}

export function getRemindersOfDateOrdered(date: Date, reminders: Array<Reminder>) {
    return reminders.filter(x => areInTheSameDay(x.date, date)).sort((x, y) => moment(x.date).diff(y.date))
}