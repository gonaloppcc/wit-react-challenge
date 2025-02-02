import {FetcherProps} from "@/hooks/Fetcher";
import {getCurrentWeatherByCityName, WeatherUnits} from "@/services/weather";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {Weather} from "@/model/Weather";

interface useWeatherProps {
    cityName: string;
    units?: WeatherUnits;
}

interface useWeatherResponse extends FetcherProps {
    weather: Weather;
}

export const useCurrentWeather = ({cityName, units}: useWeatherProps): useWeatherResponse => {

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
            queryFn: () => getCurrentWeatherByCityName(cityName, units),
        }
    );

    return {
        isSuccess,
        isLoading,
        isError,
        weather: (weather as Weather),
        error: error as AxiosError,
        refetch,
    };
}