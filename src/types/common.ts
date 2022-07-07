export type FilePresignedPostData = {
    post: {
        url: string;
        fields: {
            key: string;
            bucket: string;
            "X-Amz-Algorithm": string;
            "X-Amz-Credential": string;
            "X-Amz-Date": string;
            "X-Amz-Signature": string;
            Policy: string;
        }
    }
}

export type CaracterData = {
    id?: string,
    name: string,
    age: string,
    level: number,
    image: string
    attributes: AttributesData
}

export type AttributesData = {
    id?: string,
    caracter_id?: string,
    life: number,
    maxLife: number,
    sanity: number,
    maxSanity: number
}