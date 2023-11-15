import { useEffect } from "react"

export default function WeatherPanel() {
    const weatherURL =
        "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=16665b2a4f40c10a17d2aef66def98e6"
    useEffect(() => {
        fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
                console.log("Data List Loaded", data.list)
            })

    }, [])
    return (
        <div>Weather</div>
    )
}