export interface Turno {
    id: string;
    id_paciente: string;
    id_especialista: string;
    estado: EstadoTurno;
    fecha: number;//aqui debería estar embebido la fecha y la hora para poder ordenar desde Firebase
    hora: string;
    especialidad: string; //aqui se guarda el id de la especialidad, el nombre se trae con pipe
    comentario: {
        autor: string;
        texto: string;
    };
    historia_clinica: HistoriaClinica;
}

enum EstadoTurno {
    Pendiente = 1,
    Cancelado = 2,
    Rechazado = 3,
    Aceptado = 4,
    Realizado = 5
}

export interface HistoriaClinica {
    altura: number;
    peso: number;
    temperatura: number;
    presion: number;
    [key: string]: string | number;
}