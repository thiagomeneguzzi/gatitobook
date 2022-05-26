import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mapTo, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../autenticacao/token.service';
import { Animais, Animal } from './animais';

const NOT_MODIFIED = '304'

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    return this.http.get<Animais>(`${environment.apiUrl}/${nomeDoUsuario}/photos`);
  }

  buscaPorId(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${environment.apiUrl}/photos/${id}`)
  }

  excluirAnimal(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`${environment.apiUrl}/photos/${id}`)
  }

  curtirFoto(id: number): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/photos/${id}/like`, {}, {observe: 'response'})
    .pipe(mapTo(true), catchError((error) => {
        return error.status === NOT_MODIFIED ? of(false) : throwError(error)
      })
    )
  }

  upload(descricao: string, permiteComentario: boolean, arquivo: File) {
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', permiteComentario ? 'true' : 'false')
    formData.append('imageFile', arquivo)

    return this.http.post(`${environment.apiUrl}/photos/upload`, formData, { observe: 'events', reportProgress: true})
  }


}
