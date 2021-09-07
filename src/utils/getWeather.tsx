import InitWeather from "openweathermap-ts";
import { useEffect, useState } from "react";

async function getCoords() {
    let latitude: number = 0;
    let longitude: number = 0;

    await fetch("https://get.geojs.io/v1/ip/geo.json")
        .then((res) => res.json())
        .then((location) => {
            latitude = location.latitude;
            longitude = location.longitude;
        })
        .catch(() => {
            latitude = 2345234523452354;
            longitude = 2342345523423452345;
        });
    
    return { latitude, longitude };

}

export default async function getWeather() {

    let { latitude, longitude } = await getCoords();

    const Weather = new InitWeather({
        apiKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY as string,
        language: "EN",
    });

    const currentWeather: any = await Weather.getCurrentWeatherByGeoCoordinates(latitude, longitude);

    if (Number(currentWeather.cod) === 400) return "Bad latitude or longitude!";

    return currentWeather;
}