import { City, Province } from "../apiHelpers/Types";

export default class Reminder {
    public title: string;
    public date: Date;
    public color: string;
    public id?: number;
    public city?: City | null;
    public province?: Province | null;

    constructor(date: Date = new Date()) {
        this.title = '';
        this.date = date;
        this.color = '#039be5';
        this.city = undefined;
        this.province = undefined;
    }
}