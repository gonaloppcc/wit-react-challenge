import axios from "axios";

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
export const getWeatherByCityName = async (cityName: string, units: WeatherUnits = 'standard') => {
    const coordinates = await getCoordinatesByCityName(cityName);

    // If the returned array is empty, it means the city was not found
    if (coordinates.length === 0) {
        throw new Error('City not found');
    }

    const {lat, lon} = coordinates[0];
    return await getWeatherByCoordinates(lat, lon, units);
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

const getWeatherByCoordinates = async (lat: number, lon: number, units: WeatherUnits = 'standard') => {
    const PATH = `data/2.5/weather`;
    const URL = `${BASE_URL}${PATH}`;

    return (await axios.get(URL, {
        params: {
            lat,
            lon,
            units,
            exclude: 'minutely,hourly',
            appid: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
        }
    })).data as WeatherData;
}