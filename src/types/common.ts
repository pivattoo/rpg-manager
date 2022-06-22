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

export type Caracter = {
    id?: string,
    name: string,
    age: string,
    level: number,
    image: string
    status: Status
}

export type Status = {
    id?: string,
    caracter_id?: string,
    life: number,
    maxLife: number,
    stamina: number,
    maxStamina: number,
    mana: number,
    maxMana: number
}