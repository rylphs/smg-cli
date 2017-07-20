import {Injectable} from '@angular/core';

@Injectable()
export class PocService2 {
    public random: number;

    constructor(){
        this.random = Math.round(Math.random() * 1000);
    }
}

@Injectable()
export class PocService {
    public random: number;

    constructor(public dep: PocService2) {
        this.random = dep.random / 100;
    }
}