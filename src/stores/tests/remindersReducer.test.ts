import reducer, { addReminder } from '../remindersSlice';
import Reminder from '../../classes/Reminder';

const remindersMock = new Array<Reminder>({
    title: 'Deliver technical proof',
    date: new Date(2020, 3, 26, 20, 0),
    color: '#039be5',
    city: {
        name: 'CORDOBA',
        id: 14014010003,
        lat: -31.4177432635316,
        lon: -64.189601351685
    },
    province: {
        name: 'Córdoba',
        id: 14
    }
}, {
    title: 'Sleep',
    date: new Date(2020, 3, 26, 20, 1),
    color: '#039be5',
    id: 1234,
    city: {
        name: 'CORDOBA',
        id: 14014010003,
        lat: -31.4177432635316,
        lon: -64.189601351685
    },
    province: {
        name: 'Córdoba',
        id: 14
    }
},{
    title: 'Long text for a reminder title.',
    date: new Date(2020, 3, 26, 20, 1),
    color: '#039be5',
    id: 1234,
    city: {
        name: 'CORDOBA',
        id: 14014010003,
        lat: -31.4177432635316,
        lon: -64.189601351685
    },
    province: {
        name: 'Córdoba',
        id: 14
    }
});

describe('reminders reducer tests', () => {
    it('should handle addReminder', () => {
        const newReminder = remindersMock[0];
        const reducerData = reducer([], addReminder(newReminder));

        expect(
            reducerData
        ).toEqual([
            { ...newReminder, id: reducerData[0].id }
        ])
    })
    it('addReminder should not allow more than 30 chars', () => {
        const newReminder = remindersMock[2];

        expect(
            reducer([], addReminder(newReminder))
        ).toEqual([])
    })
    it('should handle addReminder with existing data', () => {
        const newReminder = remindersMock[0];
        const reducerData = reducer([remindersMock[1]], addReminder(newReminder));

        expect(
            reducerData
        ).toEqual([
            remindersMock[1], { ...newReminder, id: reducerData[1].id }
        ])
    })
    it('should return the initial state', () => {
        const anyAction: any = {};
        const reducerData = reducer([], anyAction);
        expect(reducerData).toEqual([]);
    })
})