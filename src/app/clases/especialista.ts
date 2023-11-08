import { Usuario } from "./usuario";

export interface Especialista extends Usuario {
    habilitado: boolean;
    //guarda los ids de las especialidades
    especialidades: string[];
}
