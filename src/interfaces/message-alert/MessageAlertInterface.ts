export interface MessageAlertInterface {
    tipo: 'error' | 'succes' | 'warning',
    mensaje: string,
    accion: boolean,
    textAcrtion?: string,
    funcAction?: () => void,
}

export interface objectMenssageAlert {
    messageObject: MessageAlertInterface,
}
