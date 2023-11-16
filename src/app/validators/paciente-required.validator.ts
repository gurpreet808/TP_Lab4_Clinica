import { AbstractControl, ValidatorFn } from "@angular/forms";

export function pacienteRequiredValidator(tipoUsuario: string): ValidatorFn | ValidatorFn[] | null {
    return (control: AbstractControl) => {
        if (tipoUsuario === 'paciente' && control.value.length === 0) {
            return { required: true };
        }

        return null;
    };
}