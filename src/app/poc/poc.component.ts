import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Fires, ListenTo, ConfigureBinding } from 'molecular/build/renderer';

import {remote} from 'electron';

@Component({
  selector: 'app-poc',
  templateUrl: './poc.component.html',
  styleUrls: ['./poc.component.scss']
})
@ConfigureBinding
export class PocComponent implements OnInit {
  mensagem = 'nenhuma';

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  @ListenTo('EventoA', {bound: false})
  testeRecebimento(mensagem: string) {
    this.mensagem = 'mensagem recebida: ' + mensagem;
    console.log('client', mensagem);
    /*this.cd.detectChanges();
    setTimeout(0, () => {
      this.cd.detectChanges();
    });*/
  }

}
