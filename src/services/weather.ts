import axios from "axios";
import {Weather} from "@/model/Weather";

/*
    standard: Kelvin
    metric: Celsius
    imperial: Fahrenheit
 */
export type WeatherUnits = 'standard' | 'metric' | 'imperial';

// noinspection SpellCheckingInspection
export interface WeatherData {
    coord: {
        lon: number,
        lat: number
    },
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    }[],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

interface WeatherForecastData {
    list: WeatherData[];
}

export interface Coordinates {
    name: string;
    local_names: {
        [key: string]: string;
    };
    lat: number;
    lon: number;
    country: string;
    state: string;
}

const BASE_URL = 'https://api.openweathermap.org/';
export const getCurrentWeatherByCityName = async (cityName: string, units: WeatherUnits = 'standard') => {
    const coordinates = await getCoordinatesByCityName(cityName);

    // If the returned array is empty, it means the city was not found
    if (coordinates.length === 0) {
        throw new Error('City not found');
    }

    const {lat, lon} = coordinates[0];
    return await getCurrentWeatherByCoordinates(lat, lon, units);
}

export const getWeatherForecastByCityName = async (
    cityName: string,
    units: WeatherUnits = 'standard',
    cnt: number = 40,
    lang: string = 'en'
) => {
    const coordinates = await getCoordinatesByCityName(cityName);

    // If the returned array is empty, it means the city was not found
    if (coordinates.length === 0) {
        throw new Error('City not found');
    }

    const {lat, lon} = coordinates[0];
    return await getWeatherForecastByCoordinates(lat, lon, cnt, units, lang);
}

const getCoordinatesByCityName = async (cityName: string, limit: number = 1) => {
    const PATH = `geo/1.0/direct`
    const URL = `${BASE_URL}${PATH}`;

    return (await axios.get(URL, {
        params: {
            q: cityName,
            limit,
            appid: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
        }
    })).data as Coordinates[];
}

const getCurrentWeatherByCoordinates = async (lat: number, lon: number, units: WeatherUnits = 'standard') => {
    const PATH = `data/2.5/weather`;
    const URL = `${BASE_URL}${PATH}`;

    const weatherData = (await axios.get(URL, {
        params: {
            lat,
            lon,
            units,
            exclude: 'minutely,hourly',
            appid: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
        }
    })).data as WeatherData;

    const weatherModelData: Weather = {
        dt: weatherData.dt,
        temp: weatherData.main.temp,
        feels_like: weatherData.main.feels_like,
        temp_min: weatherData.main.temp_min,
        temp_max: weatherData.main.temp_max,
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        sea_level: weatherData.main.sea_level,
        grnd_level: weatherData.main.grnd_level,
        weather: weatherData.weather,
    }

    return weatherModelData;
}

const getWeatherForecastByCoordinates = async (
    lat: number,
    lon: number,
    cnt: number = 40,
    units: WeatherUnits = 'standard',
    lang: string = 'en'
) => {
    const PATH = `data/2.5/forecast`;
    const URL = `${BASE_URL}${PATH}`;

    const forecastData = (await axios.get(URL, {
        params: {
            lat,
            lon,
            cnt,
            units,
            lang,
            appid: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
        }
    })).data as WeatherForecastData;

    const weatherModelData: Weather[] = forecastData.list.map(data => {
        return {
            dt: data.dt,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            sea_level: data.main.sea_level,
            grnd_level: data.main.grnd_level,
            weather: data.weather,
        }
    })

    return weatherModelData;
}