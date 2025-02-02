import React from "react";
import {WeatherUnits} from "@/services/weather";

interface WeatherUnitsProps {
    weatherUnits: WeatherUnits
}

export const WEATHER_UNITS_SYMBOLS = {
    metric: '°C',
    imperial: '°F',
    standard: 'K'
}

export const WeatherUnitsSymbol = ({weatherUnits}: WeatherUnitsProps) => {
    return (
        <span>{WEATHER_UNITS_SYMBOLS[weatherUnits]}</span>
    );
}