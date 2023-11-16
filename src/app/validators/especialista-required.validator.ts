import { ValidatorFn, AbstractControl } from "@angular/forms";

export function especialistaRequiredValidator(tipoUsuario: string): ValidatorFn | ValidatorFn[] | null {
    return (control: AbstractControl) => {
        if (tipoUsuario === 'especialista' && control.value.length === 0) {
            return { required: true };
        }

        return null;
    };
}