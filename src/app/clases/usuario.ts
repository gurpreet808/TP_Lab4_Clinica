export interface Usuario {
    id: string;
    email: string;
    clave: string;
    tipo: string;
    nombre: string;
    apellido: string;
    dni: number;
    edad: number;
    url_foto_1: string;
    email_verificado: boolean;
    fecha_alta: number;
    fecha_modificacion: number;
}
