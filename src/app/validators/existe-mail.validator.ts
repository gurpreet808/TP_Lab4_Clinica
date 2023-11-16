import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { UsuarioService } from "../servicios/usuario.service";

export function ExisteMailValidator(service: UsuarioService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        const email = control.value;

        return new Promise(resolve => {
            const existe = service.usuarios.value.find(usuario => usuario.email === email);
            resolve(existe ? { existeMail: true } : null);
        });
    };
}