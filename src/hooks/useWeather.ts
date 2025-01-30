import {FetcherProps} from "@/hooks/Fetcher";
import {getWeatherByCityName, WeatherData, WeatherUnits} from "@/services/weather";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";

interface useWeatherProps {
    cityName: string;
    units?: WeatherUnits;
}

interface useWeatherResponse extends FetcherProps {
    weather: WeatherData;
}

export const useWeather = ({cityName, units}: useWeatherProps): useWeatherResponse => {

    const {
        isSuccess,
        isLoading,
        isError,
        data: weather,
        error,
        refetch,
    } = useQuery(
        {
            queryKey: ['weather', cityName, units],
            queryFn: () => getWeatherByCityName(cityName, units),
        }
    );

    return {
        isSuccess,
        isLoading,
        isError,
        weather: (weather as WeatherData),
        error: error as AxiosError,
        refetch,
    };
}