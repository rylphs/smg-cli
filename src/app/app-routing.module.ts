import { HomeComponent } from './home/home.component';
import {ShowImageComponent} from './show-image/show-image.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WindowGuard } from 'poc/window-guard';
import { PocComponent } from 'app/poc/poc.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'image/:imageid',
        component: ShowImageComponent
    },
    {
        path: 'pocwindow',
        component: PocComponent
        // canActivate: [WindowGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
