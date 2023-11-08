import { Usuario } from "./usuario";

export interface Paciente extends Usuario {
    url_foto_2: string;
    //guarda el id de la obra social
    obra_social: string;
}
