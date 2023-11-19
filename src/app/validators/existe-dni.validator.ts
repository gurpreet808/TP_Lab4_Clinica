import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { UsuarioService } from "../servicios/usuario.service";

export function ExisteDNIValidator(service: UsuarioService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        const dni = control.value;

        return new Promise(resolve => {
            const existe = service.usuarios.value.find(usuario => usuario.dni === dni);
            resolve(existe ? { existeDNI: true } : null);
        });
    };
}