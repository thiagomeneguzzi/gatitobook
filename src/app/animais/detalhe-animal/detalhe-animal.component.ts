import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css']
})
export class DetalheAnimalComponent implements OnInit {
  animal$!: Observable<Animal>;
  animalId!: number;

  constructor(
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.animalId = this.activatedRoute.snapshot.params['animalId'];
    this.animal$ = this.animaisService.buscaPorId(this.animalId);
  }

  curtir() {
    this.animaisService.curtirFoto(this.animalId).subscribe((curtida) => {
      if(curtida) {
        this.animal$ = this.animaisService.buscaPorId(this.animalId)
      }
    })
  }

  excluir() {
    this.animaisService.excluirAnimal(this.animalId).subscribe(() => {
      this.router.navigate(['/animais/'])
    }, (error) => console.log(error))
  }

}
