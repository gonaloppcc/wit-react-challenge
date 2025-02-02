import React from "react";
import {WeatherUnitsSymbol} from "@/components/WeatherUnitsSymbol";
import {WeatherUnits} from "@/services/weather";
import {Weather} from "@/model/Weather";

interface CurrentWeatherProps {
    cityName: string;
    weather: Weather;
    weatherUnits: WeatherUnits;
}

export const CurrentWeather = ({cityName, weather, weatherUnits}: CurrentWeatherProps) => {
    return (
        <div className="flex flex-col gap-1 mt-4">
            <h2 className="text-2xl text-center">
                {cityName}
            </h2>
            <p className="text-center text-4xl">
                {weather.temp} <WeatherUnitsSymbol weatherUnits={weatherUnits}/>
            </p>
            <p className="text-center text-sm text-gray-500">
                    Feels like {weather.feels_like} <WeatherUnitsSymbol
                weatherUnits={weatherUnits}/>
            </p>
            <p className="text-center text-sm text-gray-500">
                Min: {weather.temp_min} <WeatherUnitsSymbol weatherUnits={weatherUnits}/> | Max: {weather.temp_max} <WeatherUnitsSymbol
                weatherUnits={weatherUnits}/>
            </p>
        </div>
    );
};