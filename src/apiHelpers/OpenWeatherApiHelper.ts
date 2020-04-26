import ApiHelperBase from "./ApiHelperBase";
import { WeatherResponse, TemperatureUnits } from "./Types";
import moment from 'moment';

export default class OpenWeatherApiHelper extends ApiHelperBase {
    apiKey: string = '167a65e707241b04a4cc3b62ee3b58ae';
    units: TemperatureUnits;
    maxDays = 16;
    iconUrl = 'http://openweathermap.org/img/wn/';

    constructor(units: TemperatureUnits = 'metric') {
        super('https://api.openweathermap.org/data/2.5');
        this.units = units;
    }

    async get(lat: number, lon: number, requestedDate: Date) {
        const today = new Date();
        const requestedDateMoment = moment(requestedDate);
        const differenceInDays = requestedDateMoment.diff(moment(new Date(today.getFullYear(), today.getMonth(), today.getDate())), 'days') + 1;
        if (differenceInDays <= this.maxDays && differenceInDays >= 1) {
            const response = await super.fetch<WeatherResponse>('/forecast/daily', { lat: lat, lon: lon, cnt: differenceInDays, appid: this.apiKey, units: this.units }, {
                method: 'GET'
            });
            return response.list[differenceInDays-1];
        } else {
            return undefined;
        }
    }

    getIconUrl(icon: string): string {
        return `${this.iconUrl}${icon}@2x.png`;
    }
}