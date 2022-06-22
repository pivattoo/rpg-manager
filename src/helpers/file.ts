export const IMAGE_EXTENSTIONS = ["image/png", "image/jpeg", "image/webp"] as const

export enum SanitizationError {
    NO_FILE = "NO_FILE",
    MORE_THAN_ONE_FILE = "MORE_THAN_ONE_FILE",
    NOT_FILE = "NOT_FILE"
}

const sanitizeDragEvent = (event: React.DragEvent<HTMLDivElement>): File => {
    //https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
    if (event.dataTransfer.items) {
        if (event.dataTransfer.items.length == 0) {
            //erro, nenhum arquivo (?)
            throw SanitizationError.NO_FILE
        }

        if (event.dataTransfer.items.length > 1) {
            //erro, mais de um arquivo
            throw SanitizationError.MORE_THAN_ONE_FILE
        }

        const possibleFirstFile = event.dataTransfer.items[0]

        if (possibleFirstFile.kind !== 'file') {
            //erro, não é um arquivo (?)
            throw SanitizationError.NOT_FILE
        }

        const possibleFile = possibleFirstFile.getAsFile()

        if (!possibleFile) {
            //erro, não é um arquivo (?)
            throw SanitizationError.NOT_FILE
        }

        return possibleFile

    } else {
        if (event.dataTransfer.files.length == 0) {
            //erro, nenhum arquivo (?)
            throw SanitizationError.NO_FILE
        }

        if (event.dataTransfer.files.length > 1) {
            //erro, mais de um arquivo
            throw SanitizationError.MORE_THAN_ONE_FILE
        }

        return event.dataTransfer.files[0]
    }
}

const sanitizeChangeEvent = (event: React.ChangeEvent<HTMLInputElement>): File => {
    const target = event.target
    if (!target.files || target.files.length === 0) {
        //erro, nenhum arquivo
        throw SanitizationError.NO_FILE;
    }

    if (target.files.length > 1) {
        //erro, mais de um arquivo
        throw SanitizationError.MORE_THAN_ONE_FILE
    }

    return target.files[0]
}

export const getFileFromEvent = (target: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>): File => {
    switch (target.type) {
        case "drop":
            return sanitizeDragEvent(target as React.DragEvent<HTMLDivElement>)
        case "change":
            return sanitizeChangeEvent(target as React.ChangeEvent<HTMLInputElement>)
        default:
            throw SanitizationError.NOT_FILE
    }
}