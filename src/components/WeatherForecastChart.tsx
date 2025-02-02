"use client"

import React from "react";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";
import {Weather} from "@/model/Weather";
import {WeatherUnits} from "@/services/weather";
import {WEATHER_UNITS_SYMBOLS, WeatherUnitsSymbol} from "@/components/WeatherUnitsSymbol";

interface WeatherForecastChartProps {
    weatherForecast: Weather[];
    units: WeatherUnits;
}

const chartConfig = {
    temp: {
        label: "Temperature",
        color: "#2563eb",
    },

} satisfies ChartConfig

export const WeatherForecastChart = ({weatherForecast, units}: WeatherForecastChartProps) => {
    return (
        <ChartContainer config={chartConfig} className="min-h-[100px] w-full">
            <LineChart accessibilityLayer data={weatherForecast}
                       margin={{
                           top: 20,
                           left: 12,
                           right: 12,
                       }}>
                <CartesianGrid vertical={false}/>
                <XAxis
                    dataKey="dt"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={value => (new Date(value * 1000)).toLocaleDateString('en', {weekday: 'short'})}
                    interval={7}
                />
                <YAxis
                    dataKey="temp"
                    axisLine={false}
                    tickLine={false}
                    scale='pow'
                    unit={WEATHER_UNITS_SYMBOLS[units]}
                />
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            nameKey="temp"
                            className="w-[150px]"
                            labelFormatter={(value) => {
                                return new Date(value * 1000).toLocaleDateString('en', {
                                    hour: 'numeric',
                                    weekday: 'short',
                                });
                            }}
                            formatter={(value, name) => {
                                return (
                                    <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                                        {chartConfig[name as keyof typeof chartConfig]?.label || name}
                                        <div
                                            className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                            {value}
                                            <span className="font-normal text-muted-foreground">
                                                <WeatherUnitsSymbol weatherUnits={units}/>
                                            </span>
                                        </div>
                                    </div>
                                )
                            }}
                        />
                    }
                />
                <Line
                    dataKey="temp"
                    type="natural"
                    stroke="var(--color-temp)"
                    strokeWidth={2}
                    dot={{
                        fill: "var(--color-temp)",
                    }}
                    activeDot={{
                        r: 6,
                    }}
                />
            </LineChart>
        </ChartContainer>
    );
};