'use client'

import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useFormik} from "formik";
import {Button} from "@/components/ui/button";
import {dehydrate, HydrationBoundary, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {useCurrentWeather} from "@/hooks/useCurrentWeather";
import {WeatherUnits} from "@/services/weather";
import * as Yup from 'yup';
import {Loader2} from "lucide-react";
import {SelectWeatherUnits} from "@/components/SelectWeatherUnits";
import {CurrentWeather} from "@/components/CurrentWeather";
import {useWeatherForecast} from "@/hooks/useWeatherForecast";
import {WeatherForecast} from "@/components/WeatherForecast";
import {WeatherForecastChart} from "@/components/WeatherForecastChart";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

interface FormValues {
    city: string;
}

export default function Home() {
    const queryClient = useQueryClient();

    const [currentWeatherCity, setCurrentWeatherCity] = useState('London')

    const [weatherUnits, setWeatherUnits] = useState<WeatherUnits>('metric');

    const {
        isSuccess, isError, error, isLoading, weather
    } = useCurrentWeather({
        cityName: currentWeatherCity,
        units: weatherUnits
    });

    const {
        isSuccess: isSuccessWeatherForecast,
        isError: isErrorWeatherForecast,
        error: errorWeatherForecast,
        isLoading: isLoadingWeatherForecast,
        weatherForecast
    } = useWeatherForecast({
        cityName: currentWeatherCity,
        units: weatherUnits
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            city: '',
        },
        validationSchema: Yup.object({
            city: Yup.string().required('City is required'),
        }),
        onSubmit: values => {
            setCurrentWeatherCity(values.city);
        }
    });

    return (
        <div
            className="min-h-screen flex flex-col gap-8 items-center justify-center w-screen">
            <main className="flex flex-col items-center">
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Weather App</CardTitle>
                            <CardDescription>
                                Enter the city name to get the weather information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 sm:flex-row">
                                <Input
                                    id="city"
                                    name="city"
                                    type="text"
                                    placeholder="Enter city name"
                                    onChange={formik.handleChange}
                                    value={formik.values.city}
                                />
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin"/>
                                            Loading...
                                        </>
                                    ) : 'Get Weather'}
                                </Button>
                            </form>
                            <div className="flex items-center justify-between">
                                <p>Weather Units:</p>
                                <SelectWeatherUnits value={weatherUnits} onValueChange={setWeatherUnits}/>
                            </div>
                            <div className="flex flex-col gap-2">
                                {formik.errors.city && formik.touched.city && (
                                    <p className="text-red-500">{formik.errors.city}</p>
                                )}
                            </div>
                            {isLoading && <p>Loading...</p>}
                            {isError && (
                                <p className="text-red-500">
                                    {error.message}
                                </p>
                            )}
                            {isSuccess && weather && (
                                <CurrentWeather
                                    cityName={currentWeatherCity}
                                    weather={weather}
                                    weatherUnits={weatherUnits}
                                />
                            )}
                            <Tabs defaultValue="list" className="w-[400px]">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="list">5-day Forecast List</TabsTrigger>
                                    <TabsTrigger value="chart">5-day Forecast Chart</TabsTrigger>
                                </TabsList>
                                <TabsContent value="list">
                                    {isLoadingWeatherForecast && <p>Loading weather forecast...</p>}
                                    {isErrorWeatherForecast && (
                                        <p className="text-red-500">
                                            {errorWeatherForecast.message}
                                        </p>
                                    )}
                                    {isSuccessWeatherForecast &&
                                        <WeatherForecast forecasts={weatherForecast} units={weatherUnits}/>}
                                </TabsContent>
                                <TabsContent value="chart">
                                    {isLoadingWeatherForecast && <p>Loading weather forecast...</p>}
                                    {isErrorWeatherForecast && (
                                        <p className="text-red-500">
                                            {errorWeatherForecast.message}
                                        </p>
                                    )}
                                    {isSuccessWeatherForecast &&
                                        <WeatherForecastChart weatherForecast={weatherForecast} units={weatherUnits}/>}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </HydrationBoundary>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://zfrmz.eu/QJG7Tq47HOfsy6u1MAmi"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    WIT React Challenge
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://openweathermap.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    API provided by openweathermap.org
                </a>
            </footer>
        </div>
    );
}
