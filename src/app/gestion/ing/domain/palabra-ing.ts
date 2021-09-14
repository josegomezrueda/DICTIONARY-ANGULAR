import { PalabraEsp } from "../../esp/domain/palabra-esp";

export interface PalabraIng {
    id:       number;
    palabra:          string;
    descripcion:         string;
    fechaAlta:          Date;
    fechaModificacion:    Date;
    espanolSimpleOutputDto:   EspanolSimpleOutputDto;
}

export interface EspanolSimpleOutputDto {
    id: number;
    palabra: string;
    descripcion: string;
    fechaAlta: Date;
    fechaModificacion: Date;
}