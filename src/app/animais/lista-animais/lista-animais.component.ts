import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Animais } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {
  animais$!: Observable<Animais>;

  constructor(
    private usuarioService: UsuarioService,
    private animaisService: AnimaisService
  ) { }

  ngOnInit(): void {
    this.animais$ = this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario: any) => {
        const userName = usuario.name ?? '';
        return this.animaisService.listaDoUsuario(userName)
      })
    )
  }

}
