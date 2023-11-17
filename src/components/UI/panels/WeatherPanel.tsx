import { WeatherType } from "../../../types/types";

type WeatherPanelProps = {
    data: WeatherType | undefined,
}

export default function WeatherPanel({ data }: WeatherPanelProps) {
    const plus = Math.round(Number(data?.main?.temp)) > 0 ? '+' : '';

    return (
        <div className="relative w-20">
            <i className={`owf owf-${data?.weather[0].id} owf-3x text-blue-50`}></i>
            <p className="text-primary-500 absolute top-0 left-10">{data ? `${plus}${Math.round(Number(data?.main?.temp))}` : ''}</p>
            <p className="text-primary-500 absolute bottom-0 left-0 text-xs">{data ? data.weather[0].description : ''}</p>
        </div>
    )
}