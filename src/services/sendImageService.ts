import apiUrls from "../constants/apiUrls";
import { FilePresignedPostData } from "../types/common";
import api from "../lib/api";
import axios, { AxiosRequestConfig } from "axios"

export enum FileUploadError {
    PRESIGN_ERROR = "PRESIGN_ERROR",
    UPLOAD_ERROR = "UPLOAD_ERROR",
    LOCATION_ERROR = "LOCATION_ERROR"
}

export const uploadFile = async (file: File): Promise<string> => {
    //pega url temporaria pra upload
    let presigned_post: FilePresignedPostData | null = null
    try {
        const response = await api.get<FilePresignedPostData>(`${apiUrls.image}?ext=${file.type}`)
        presigned_post = response.data
    } catch (_) {
        throw FileUploadError.PRESIGN_ERROR
    }

    if (!presigned_post) throw FileUploadError.PRESIGN_ERROR

    //controi um form data pra enviar o arquivo
    const form_data = new FormData();
    form_data.append("Content-Type", file.type);

    //todos os campos da resposta precisam estar no form data
    Object.entries(presigned_post.post.fields).forEach(([k, v]) => {
        form_data.append(k, v);
    });

    form_data.append("file", file);

    //pega local do arquivo pelo header retornado
    let file_location: string | null = null;

    //CRIMINOSO ISSO
    //FIXME: Cors error
    try {
        const uploaded_file_response = await api.post(presigned_post.post.url, form_data)

        if (uploaded_file_response.status == 204) {
            file_location = `https://${presigned_post.post.fields.bucket}.s3.amazonaws.com/${presigned_post.post.fields.key}`
        }
    } catch (_) {
        file_location = `https://${presigned_post.post.fields.bucket}.s3.amazonaws.com/${presigned_post.post.fields.key}`
        return file_location
    }

    if (!file_location) {
        throw FileUploadError.LOCATION_ERROR
    }

    return file_location
}