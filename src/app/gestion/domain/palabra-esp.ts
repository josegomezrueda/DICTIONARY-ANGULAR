import { PalabraIng } from "./palabra-ing";

export interface PalabraEsp {
    id: number;
    palabra: string;
    descripcion: string;
    fechaAlta: Date;
    fechaModificacion: Date;
    palabrasIngles: PalabraIng[];
}
