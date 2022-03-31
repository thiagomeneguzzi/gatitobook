import {FormGroup} from "@angular/forms";

export function usuarioSenhaIguaisValidator(formGroup: FormGroup) {
  const username = formGroup.get('userName')?.value ?? '';
  const password = formGroup.get('password')?.value ?? '';

  if(username.trim() + password.trim()) {
    return username !== password ? undefined : {senhaIgualUsuario: true};
  } else {
    return undefined;
  }

}
