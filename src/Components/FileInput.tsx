import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react"
import { getFileFromEvent, IMAGE_EXTENSTIONS, SanitizationError } from "../helpers/file"
import { FileUploadError, uploadFile } from "../services/sendImageService"
import Button from "./Button"
import Spinner from "./Spinner"


const FILE_TYPES = {
    image: {
        accept: IMAGE_EXTENSTIONS,
        label: "uma imagem",
    }
} as const

export type ReadFile = {
    file?: {
        name: string,
        raw: File
    }
    url: string
}

export type FileInputProps = {
    fileURL?: string | null,
    setReadFile?: Dispatch<ReadFile>,
    fileType?: keyof typeof FILE_TYPES,
    upload?: boolean
}


export default function FileInput({ fileURL, setReadFile, fileType = "image", upload = true }: FileInputProps) {
    /* por que fazemos isso e nao um `:hover`?
    pois os eventos de drag (dragover e dragleave) nao sao disparados quando o mouse esta em cima do elemento
    e pra complementar, eles nao tem pseudoclasses no css como `:hover` 
    entao fazemos um "hover manual" que tambem serve pro drag e drop */
    const [activeArea, setActiveArea] = useState(false)

    /* estado separado para o arquivo local do componente
    quando selecionamos algum arquivo, ele mostra uma preview, mas nao disparamos `setReadFile` */
    const [localFile, setLocalFile] = useState<ReadFile | null>(null)

    const [uploadingFile, setUploadingFile] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const inputRef = useRef<HTMLInputElement>(null)
    const inputAreaRef = useRef<HTMLDivElement>(null)

    const shouldIgnoreInput = useMemo(() => !!errorMessage || uploadingFile, [errorMessage, uploadingFile])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (shouldIgnoreInput) return

        handleFileEvent(event)
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        if (shouldIgnoreInput) return

        event.preventDefault()

        handleFileEvent(event)
    }

    const handleClick = () => {
        if (shouldIgnoreInput) return

        inputRef.current.click()
    }


    const handleDragEvent = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()

        if (shouldIgnoreInput) return

        switch (event.type) {
            case "dragover":
                setActiveArea(true)
                break;
            case "dragleave":
                setActiveArea(false)
                break;
        }
    }

    const handleMouseEvent = (event: React.MouseEvent<HTMLDivElement>) => {
        if (shouldIgnoreInput) return

        switch (event.type) {
            case "mouseenter":
                setActiveArea(true)
                break
            case "mouseleave":
                setActiveArea(false)
                break

        }
    }

    useEffect(() => {
        if (!fileURL) return setLocalFile(null)
        setLocalFile({ url: fileURL })
    }, [fileURL])

    const handleReadFile = (readFile: ReadFile) => {
        if (!readFile) return

        const lastLocalFile = localFile
        setLocalFile(readFile)
        if (upload) {
            setUploadingFile(true)
            try {
                uploadFile(readFile.file.raw).then(result => {
                    if (setReadFile) setReadFile({ ...readFile, url: result })
                    setUploadingFile(false)
                })

            } catch (error) {
                if (typeof error == "string") {
                    switch (error) {
                        case FileUploadError.PRESIGN_ERROR:
                            //erro de api de presign
                            setErrorMessage("Não foi possível preparar o destino da imagem")
                            break;
                        case FileUploadError.UPLOAD_ERROR:
                            //erro de upload
                            setErrorMessage("O upload não foi efetuado corretamente")
                            break;
                        case FileUploadError.LOCATION_ERROR:
                            //erro ao montar url do arquivo final
                            setErrorMessage("Local de destino mal formatado")
                            break;
                    }
                } else {
                    setErrorMessage("Houve uma falha inesperada")
                }
                setUploadingFile(false)
                setLocalFile(lastLocalFile)
                return
            }
        } else {
            if (setReadFile) setReadFile(readFile)
        }
    }

    const handleFileEvent = (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
        try {
            const extractedFile = getFileFromEvent(event)
            if (!FILE_TYPES[fileType].accept.some(type => extractedFile.type == type)) {
                throw SanitizationError.NOT_FILE
            }
            let reader = new FileReader();
            reader.onload = () => {
                setActiveArea(false)
                handleReadFile({
                    file: {
                        name: extractedFile.name,
                        raw: extractedFile
                    },
                    url: reader.result as string
                })
            }
            reader.readAsDataURL(extractedFile);
        } catch (error) {
            if (typeof error == "string") {
                switch (error) {
                    case SanitizationError.NO_FILE:
                        //abrir picker e cancelar
                        setErrorMessage("Nenhum arquivo selecionado")
                        break;
                    case SanitizationError.MORE_THAN_ONE_FILE:
                        //mais de um arquivo selecionado
                        setErrorMessage("Mais de um arquivo selecionado")
                        break;
                    case SanitizationError.NOT_FILE:
                        //drop de algo que não é arquivo
                        setErrorMessage("O arquivo não é válido")
                        break;
                }
            } else {
                setErrorMessage("Houve uma falha inesperada")
            }
            return
        }
    }

    //FIXME: se alguem passar uma url de um pdf, teriamos que pegar o nome com split
    const FilePreview = useMemo(() => {
        if (!localFile) return <></>

        switch (fileType) {
            case "image":
                return <img src={localFile.url} alt="Imagem"
                    className="w-full h-full max-w-xs"
                    draggable="false" />
            case "pdf":
                return <>
                    <i className="fas fa-file-pdf text-indigo-500 text-5xl" />
                    <label className="text-center text-slate-600">{localFile.file?.name ?? "Um arquivo PDF"}</label>
                </>
            default:
                return <>
                    <i className="fas fa-file-alt text-indigo-500 text-5xl" />
                    <label className="text-center text-slate-600">Um arquivo qualquer</label>
                </>
        }

    }, [localFile])

    return (
        <div ref={inputAreaRef}
            onMouseEnter={handleMouseEvent}
            onMouseLeave={handleMouseEvent}
            onDragOver={handleDragEvent}
            onDragLeave={handleDragEvent}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`${activeArea ? "border-indigo-500" : "border-indigo-200"}
                        ${shouldIgnoreInput ? "cursor-default" : "cursor-pointer"}
                        min-h-[210px] relative py-4 flex justify-center items-center flex-col rounded-md border-dashed border-2 transition-colors duration-300`}>
            <div className={`${activeArea && !localFile ? "text-indigo-200" : "text-indigo-500"} 
                            ${((localFile || fileURL) && !activeArea) || shouldIgnoreInput ? "opacity-0" : "opacity-100"} 
                            w-full h-full justify-center items-center absolute flex flex-col transition-opacity duration-300 z-10`}>
                <span className={`flex text-5xl transition-colors duration-300 my-3`}>
                    <i className="fas fa-upload" />
                </span>
                <p className="text-slate-500 font-medium">Arraste {FILE_TYPES[fileType].label}</p>
                <p className="text-slate-500 font-medium">ou</p>
                <p className="font-semibold transition-colors duration-300 text-center mx-2">
                    Clique para selecionar {FILE_TYPES[fileType].label}
                </p>
            </div>

            <div className={`${uploadingFile ? "opacity-100" : "opacity-0 pointer-events-none"} 
                            absolute transition-opacity duration-300 z-20`}>
                <div className="flex items-center flex-col space-y-2">
                    <p className="text-indigo-500 font-bold text-lg">Salvando arquivo</p>
                    <Spinner />
                    <p className="text-slate-500">{localFile?.file?.name}</p>
                </div>
            </div>

            <div className={`${errorMessage ? "opacity-100" : "opacity-0 pointer-events-none"} 
                            absolute flex justify-center items-center flex-col transition-opacity duration-300 z-30 `}>
                <span className={`flex text-5xl text-indigo-500`}>
                    <i className="fas fa-exclamation-circle" />
                </span>
                <p className="text-indigo-500 font-bold text-lg">Ocorreu um erro</p>
                <p className="text-slate-700 text-base my-3 w-60 text-center">{errorMessage}</p>
                <Button text="OK" action={() => setErrorMessage(null)} />
            </div>

            <div className={`${activeArea || shouldIgnoreInput ? "opacity-20" : "opacity-100"}
                        gap-2 w-full h-full max-w-xs flex flex-col justify-center items-center transition-opacity duration-300 z-0`}>
                {FilePreview}
            </div>
            <input ref={inputRef} type="file" className="hidden" accept={FILE_TYPES[fileType].accept.join(", ")} onChange={handleInputChange} />
        </div>
    )
}