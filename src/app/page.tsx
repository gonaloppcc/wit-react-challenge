'use client'

import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useFormik} from "formik";
import {Button} from "@/components/ui/button";
import {dehydrate, HydrationBoundary, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {useWeather} from "@/hooks/useWeather";
import {WeatherUnits} from "@/services/weather";
import * as Yup from 'yup';
import {Loader2} from "lucide-react";

interface FormValues {
    city: string;
}

export default function Home() {
    const queryClient = useQueryClient();

    const [currentWeatherCity, setCurrentWeatherCity] = useState('London')

    const [weatherUnits] = useState<WeatherUnits>('metric');

    const {
        isSuccess, isError, error, isLoading, weather
    } = useWeather({
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
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Weather App</CardTitle>
                            <CardDescription>
                                Enter the city name to get the weather information
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={formik.handleSubmit} className="flex gap-4">
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
                                    ) : 'Get Weather'
                                    }
                                </Button>
                            </form>
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
                                <div className="flex flex-col gap-4 mt-4">
                                    <p>
                                        <strong>City:</strong> {weather.name}
                                    </p>
                                    <p>
                                        <strong>Temperature:</strong> {weather.main.temp}°C
                                    </p>
                                    <p>
                                        <strong>Feels like:</strong> {weather.main.feels_like}°C
                                    </p>
                                </div>
                            )}
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
