import create from "zustand";
import { Units, Weather } from "Types/types";
import { persist } from "zustand/middleware";
import { handleWeatherAppend } from "Utils/dataFunctions";

export interface StoreState {
  lat: number | undefined;
  lon: number | undefined;
  setLat: (latitude: number | undefined) => void;
  setLon: (longitude: number | undefined) => void;
  units: Units;
  setUnits: (unit: Units) => void;
  weather: Weather[];
  setWeather: (data: Weather) => void;
  deleteAtIndex: (index: number) => void;
  expiresAt: number | undefined;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // initial state
      lat: undefined,
      lon: undefined,
      units: Units.imperial,
      weather: [],
      expiresAt: undefined,
      // methods for manipulating state
      setLat: (latitude: number | undefined) => {
        set(() => ({ lat: latitude }));
      },
      setLon: (longitude: number | undefined) => {
        set(() => ({ lon: longitude }));
      },
      setUnits: (unit: Units) => {
        set(() => ({ units: unit }));
      },
      setWeather: (data: Weather) => {
        set((state) => ({
          weather: handleWeatherAppend(state.weather, data),
        }));
      },
      deleteAtIndex: (index: number) => {
        set((state) => ({ weather: state.weather.filter((_, idx) => idx !== index) }));
      },
    }),
    {
      name: "Weather",
      getStorage: () => localStorage,
    }
  )
);

// interface Data {
//   lat: number | undefined;
//   long: number | undefined;
//   weather: Weather | undefined;
//   expiresAt: string;
// }
