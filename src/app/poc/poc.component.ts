import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Fires, ListenTo, Listener } from 'molecular/build/renderer';

import {remote} from 'electron';
import { PocService } from "app/poc.service";

@Component({
  selector: 'app-poc',
  templateUrl: './poc.component.html',
  styleUrls: ['./poc.component.scss']
})
@Listener
export class PocComponent implements OnInit {
  mensagem = 'nenhuma';

  constructor(private cd: ChangeDetectorRef, private poc: PocService) {
    this.mensagem = poc.random.toString();
    console.log(poc);
  }

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
