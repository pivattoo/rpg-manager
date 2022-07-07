import apiUrls from "../constants/apiUrls";
import api from "../lib/api";
import { CaracterData } from "../types/common";

type CaracterPayload = {
    name: string,
    description: string
    life: number,
    sanity: number,
    image: string | null
}

type CaractersResponse = {
    caracters: CaracterData[]
}

type CaracterResponse = {
    caracter: CaracterData

}

export const GetCaracters = async (): Promise<CaractersResponse> => {
    const fetchedData = await api.get<CaractersResponse>(apiUrls.caracter)

    return fetchedData.data
}

export const CreateCaracter = async (payload: CaracterPayload): Promise<CaracterResponse> => {
    const fetchedData = await api.post<CaracterResponse>(apiUrls.caracter, payload);

    return fetchedData.data;
};