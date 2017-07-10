import {createConstructor} from './decorator-util';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import {ReflectiveInjector, Injector} from '@angular/core';

export function RouterParamMap(keys:any):any{

    function subscribeToRoute(route:ActivatedRoute){
        route.params.subscribe((param)=> {
            for(let key in param){
                var prop = keys[key];
                this[prop] = param[key];
            }
        });
    }

  return function(constructor:any){
      return createConstructor(constructor, subscribeToRoute, true, ActivatedRoute); 
  }
  
}