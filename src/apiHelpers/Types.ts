export type Province = {
    id: number;
    name: string;
}

export type City = {
    id: number;
    name: string;
    lat: number;
    lon: number;
}

export type WeatherResponse = {
    list: DayWeather[]
}

export type DayWeather = {
    temp: {
        min: number,
        max: number
    },
    weather: Weather[],
}

type Weather = {
    description: string,
    icon: string
}

export type TemperatureUnits = 'metric' | 'imperial';