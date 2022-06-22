import apiUrls from "../constants/apiUrls";
import api from "../lib/api";
import { Caracter } from "../types/common";

type CaracterPayload = {
    name: string,
    age: string,
    life: number,
    stamina: number,
    mana: number,
    image: string | null
}

type CaractersResponse = {
    caracters: Caracter[]
}

type CaracterResponse = {
    caracter: Caracter

}

export const GetCaracters = async (): Promise<CaractersResponse> => {
    const fetchedData = await api.get<CaractersResponse>(apiUrls.caracter)

    return fetchedData.data
}

export const CreateCaracter = async (payload: CaracterPayload): Promise<CaracterResponse> => {
    const fetchedData = await api.post<CaracterResponse>(apiUrls.caracter, payload);

    return fetchedData.data;
};