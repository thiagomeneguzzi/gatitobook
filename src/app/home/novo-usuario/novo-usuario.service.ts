import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NovoUsuario} from "./novo-usuario";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private http: HttpClient) { }

  cadastrarUsuario(novoUsuario: NovoUsuario) {
    return this.http.post(`${environment.apiUrl}/user/signup`, novoUsuario);
  }

}
