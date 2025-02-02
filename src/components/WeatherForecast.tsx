import React from "react";
import {Weather} from "@/model/Weather";
import {WeatherUnitsSymbol} from "@/components/WeatherUnitsSymbol";
import {WeatherUnits} from "@/services/weather";
import Image from "next/image";

interface WeatherForecastProps {
    forecasts: Weather[];
    units: WeatherUnits;
}

export const WeatherForecast = ({forecasts, units}: WeatherForecastProps) => {
    return (
        <div className="flex flex-row gap-4 max-w-screen-md overflow-auto">
            {forecasts.map((forecast) => (
                <div key={forecast.dt} className="w-full flex flex-col justify-between items-center min-w-12">
                    <p className="text-xs h-8 w-full text-center">
                        {new Date(forecast.dt * 1000).toLocaleDateString(undefined, {
                            weekday: 'short',
                            hour: 'numeric',
                            hour12: true,
                        })}
                    </p>
                    <img
                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                        width={64}
                        height={64}
                        alt={forecast.weather[0].description}
                    />
                    <p className="text-xs w-full text-center">
                        {forecast.temp.toFixed(0)} <WeatherUnitsSymbol weatherUnits={units}/>
                    </p>
                </div>
            ))}
        </div>
    );
};