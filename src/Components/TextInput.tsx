import React, { HTMLInputTypeAttribute } from "react"

interface TextInputProps {
    value?: string | number | readonly string[],
    setValue: (arg: string) => void,
    defaultValue?: string,
    placeholder?: string,
    area?: boolean,
    rows?: number,
    type?: HTMLInputTypeAttribute,
    disabled?: boolean,
}


function TextInput({ value, setValue, defaultValue, placeholder, area = false, rows = 10, disabled = false, type = "text" }: TextInputProps) {
    //FIXME: any
    const props = {
        value,
        onChange: (e: any) => setValue(e.target.value),
        defaultValue,
        className: "focus:outline-none focus:border-gray-500 block w-full px-4 py-2 mb-2 transition-colors text-sm placeholder-gray-500 bg-white border rounded-md",
        type,
        placeholder,
        disabled
    }

    return (
        area ? <textarea rows={rows} {...props} /> : <input {...props} />
    )
}

export default React.memo(TextInput)