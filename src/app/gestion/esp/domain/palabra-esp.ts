import { PalabraIng } from "../../ing/domain/palabra-ing";

export interface PalabraEsp {
    id: number;
    palabra: string;
    descripcion: string;
    fechaAlta: Date;
    fechaModificacion: Date;
    palabrasIngles: PalabraIng[];
}
