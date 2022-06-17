import apiUrls from "../constants/apiUrls";
import api from "../lib/api";

type CaracterPayload = {
    name: string,
    age: number,
    life: number,
    stamina: number,
    mana: number,
    image?: string
}

export const CreateCaracter = async (payload: CaracterPayload)  => {
    const fetchedData = await api.post(apiUrls.caracter, payload);
  
    return fetchedData.data;
  };