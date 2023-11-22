import { DisponibilidadEspecialidad } from "./disponibilidad-especialidad";
import { Usuario } from "./usuario";

export interface Especialista extends Usuario {
    habilitado: boolean;
    especialidades: string[]; //Array de IDs de especialidades
    disponibilidades: DisponibilidadEspecialidad[];
}
