import InitWeather from "openweathermap-ts";

export default async function getWeather(lat: number, lon: number) {
    const Weather = new InitWeather({
        apiKey: process.env.WEATHER_API_KEY as string,
        language: "EN",
    });

    const currentWeather: any = await Weather.getCurrentWeatherByGeoCoordinates(
        lat,
        lon
    );

    if (Number(currentWeather.cod) === 400) return "Bad latitude or longitude!";

    return currentWeather;
}