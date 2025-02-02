export interface Weather {
    dt: number, // Time of data calculation, unix, UTC
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number,
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    }[],
}