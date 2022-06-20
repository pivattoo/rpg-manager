export enum ButtonTheme {
    SOLID,
    WHITE,
    LIGHT,
    LIGHT_RED,
    BIGGER
}

export type ButtonType = {
    theme?: ButtonTheme,
    icon?: any,
    text: string,
    action?: (...args: any[]) => void
};

export type Caracter = {
    id: string,
    name: string,
    age: string,
    level: number,
    image: string
    status: Status
}

export type Status = {
    id: string,
    caracter_id: string,
    life: number,
    maxLife: number,
    stamina: number,
    maxStamina: number,
    mana: number,
    maxMana: number
}