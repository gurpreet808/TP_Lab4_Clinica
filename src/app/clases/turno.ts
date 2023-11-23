export interface Turno {
    id: number;
    id_paciente: number;
    id_especialista: number;
    estado: EstadoTurno;
    fecha: string;
    hora: string;
    especialidad: string; //aqui no se si conviene poner el id o el nombre de la especialidad
    comentario: {
        autor: string;
        texto: string;
    };
    historia_clinica: {
        altura: number;
        peso: number;
        temperatura: number;
        presion: number;
        [key: string]: string | number;
    }
}

enum EstadoTurno {
    Pendiente = 1,
    Cancelado = 2,
    Rechazado = 3,
    Aceptado = 4,
    Realizado = 5
}