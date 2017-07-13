import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Fires, ListenTo } from 'molecular';

@Component({
  selector: 'app-poc',
  templateUrl: './poc.component.html',
  styleUrls: ['./poc.component.scss']
})
export class PocComponent implements OnInit {
  mensagem = 'nenhuma';

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  @ListenTo('EventoA')
  testeRecebimento(mensagem: string) {
    this.mensagem = 'mensagem recebida: ' + mensagem;
    console.log(this.mensagem);
    setTimeout(100, () => {
      this.cd.detectChanges();
    });
  }

}
