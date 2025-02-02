import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {WeatherUnits} from "@/services/weather";

interface SelectWeatherUnitsProps {
    value: WeatherUnits
    onValueChange: (value: WeatherUnits) => void;
}

export const SelectWeatherUnits = ({value, onValueChange}: SelectWeatherUnitsProps) => {
    return (
        <Select onValueChange={onValueChange} value={value}>
            <SelectTrigger className="w-[115px]">
                <SelectValue placeholder="Select a weather Unit"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Weather Units</SelectLabel>
                    <SelectItem value="metric">Metric</SelectItem>
                    <SelectItem value="imperial">Imperial</SelectItem>
                    <SelectItem value="standard">Kelvin</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};