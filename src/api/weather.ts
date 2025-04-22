import { API_CONFIG } from "./config";
import type {
  Coordinates,
  WeatherData,
  ForecastData,
  LocationResponse,
} from "./types";

class WeatherAPI {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      ...params,
      apikey: API_CONFIG.API_KEY ?? "",
    });
    return `${endpoint}?${searchParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.statusText}`);
    }
    return response.json();
  }

  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/realtime`, {
      location: `${lat},${lon}`,
      units: "metric",
    });
    return this.fetchData<WeatherData>(url);
  }

  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      location: `${lat},${lon}`,
      timesteps: "1h,1d",
      units: "metric",
    });
    return this.fetchData<ForecastData>(url);
  }

  // Optional — only keep if you’re using Tomorrow.io's /resolve endpoint
  async getLocationInfo({ lat, lon }: Coordinates): Promise<LocationResponse> {
    const url = this.createUrl(`${API_CONFIG.GEO}/resolve`, {
      location: `${lat},${lon}`,
    });
    return this.fetchData<LocationResponse>(url);
  }
}

export const weatherAPI = new WeatherAPI();
