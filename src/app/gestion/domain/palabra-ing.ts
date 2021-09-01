import { PalabraEsp } from "./palabra-esp";

export interface PalabraIng {
    id:       number;
    palabra:          string;
    descripcion:         string;
    fechaAlta:          string;
    fechaModificacion:    string;
    espanolSimpleOutputDto:   PalabraEsp;
}
