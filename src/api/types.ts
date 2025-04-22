export interface Coordinates {
  lat: number;
  lon: number;
}

export interface LocationResponse {
  location: {
    name: string;
    lat: number;
    lon: number;
    region?: string;
    country: string;
    timezone: string;
  };
}

export interface WeatherCondition {
  code: number;
  description: string;
  icon: string;
}

export interface WeatherData {
  data: {
    time: string;
    values: {
      temperature: number;
      temperatureApparent: number;
      humidity: number;
      windSpeed: number;
      windDirection: number;
      pressureSeaLevel: number;
      weatherCode: number;
    };
  };
  location: {
    lat: number;
    lon: number;
    name?: string;
  };
}

export interface ForecastData {
  timelines: {
    hourly: Array<{
      time: string;
      values: {
        temperature: number;
        temperatureApparent: number;
        humidity: number;
        windSpeed: number;
        windDirection: number;
        pressureSeaLevel: number;
        weatherCode: number;
      };
    }>;
    daily?: Array<{
      time: string;
      values: {
        temperatureMin: number;
        temperatureMax: number;
        humidityAvg: number;
        windSpeedAvg: number;
        weatherCodeMax: number;
      };
    }>;
  };
  location: {
    lat: number;
    lon: number;
    name?: string;
  };
}
