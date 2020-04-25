import { City, Province } from "../apiHelpers/Types";

export default class Reminder {
    public title: string;
    public date: Date;
    public color: string;
    public city?: City;
    public province?: Province;
    constructor(title: string,
        date: Date,
        color: string,
        city?: City,
        province?: Province) {
        this.title = title;
        this.date = date;
        this.color = color;
        this.city = city;
        this.province = province;
    }
}