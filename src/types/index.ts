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

export type DiceType = {
    name: string,
    icon: string,
    side: number
}

export type DiceResultType = {
    value: number,
    type: string
}