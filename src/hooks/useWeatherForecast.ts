import {FetcherProps} from "@/hooks/Fetcher";
import {getWeatherForecastByCityName, WeatherUnits} from "@/services/weather";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {Weather} from "@/model/Weather";

interface useWeatherForecastProps {
    cityName: string;
    units?: WeatherUnits;
}

interface useWeatherForecastResponse extends FetcherProps {
    weatherForecast: Weather[];
}

export const useWeatherForecast = ({cityName, units}: useWeatherForecastProps): useWeatherForecastResponse => {

    const {
        isSuccess,
        isLoading,
        isError,
        data: weatherForecast,
        error,
        refetch,
    } = useQuery(
        {
            queryKey: ['weatherForecast', cityName, units],
            queryFn: () => getWeatherForecastByCityName(cityName, units),
        }
    );

    return {
        isSuccess,
        isLoading,
        isError,
        weatherForecast: (weatherForecast as Weather[]),
        error: error as AxiosError,
        refetch,
    };
}