import apiUrls from "../constants/apiUrls";
import api from "../lib/api";
import { Caracter } from "../types";

type CaracterPayload = {
    name: string,
    age: String,
    life: number,
    stamina: number,
    mana: number,
    image?: string
}

type CaracterResponse = {
    caracters: Caracter[]
}

export const GetCaracters = async():Promise<CaracterResponse> => {
    const fetchedData = await api.get<CaracterResponse>(apiUrls.caracter)

    return fetchedData.data
}

export const CreateCaracter = async (payload: CaracterPayload)  => {
    const fetchedData = await api.post(apiUrls.caracter, payload);
  
    return fetchedData.data;
  };