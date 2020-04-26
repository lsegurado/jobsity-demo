import React, { useEffect } from 'react';
import './WheaterViewer.css';
import { DayWeather, City } from '../../apiHelpers/Types';
import OpenWeatherApiHelper from '../../apiHelpers/OpenWeatherApiHelper';

type WheaterViewerProps = {
    city?: City | null,
    date?: Date
}

const WheaterViewer: React.FC<WheaterViewerProps> = (props) => {
    const [weather, setWeather] = React.useState<DayWeather | undefined>(undefined);
    const apiHelper = new OpenWeatherApiHelper();

    useEffect(() => {
        getWeather();
    }, [props.city, props.date])

    async function getWeather() {
        if (props.city && props.date) {
            const result = await apiHelper.get(props.city.lat, props.city.lon, props.date);
            setWeather(result);
        } else {
            setWeather(undefined);
        }
    }

    return (
        <div>
            {weather ? (
                <div className="temperature-container" > <img src={apiHelper.getIconUrl(weather.weather[0].icon)}>
                </img>
                    <div className="temperature-min-max-container">
                        <span>{`Min: ${weather.temp.min} °С`}</span>
                        <span>{`Max: ${weather.temp.max} °С`}</span>
                    </div> </div>)
                : undefined}
        </div>
    )
}

export default WheaterViewer;
