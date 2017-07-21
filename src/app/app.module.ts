import 'zone.js';
import 'reflect-metadata';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ReflectiveInjector, ReflectiveKey, Injector, InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FileSystemService, WindowService, MenuService } from './services/services';
import { StatusService } from './status/status.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ImageListComponent } from './image-list/image-list.component';
import { StatusComponent } from './status/status.component';
import { FolderTreeComponent } from './folder-tree/folder-tree.component';

import { AppRoutingModule } from './app-routing.module';

import { TreeModule } from 'primeng/components/tree/tree';
import { OverlayPanelModule } from 'primeng/components/overlaypanel/overlaypanel';
import { ShowImageComponent } from './show-image/show-image.component';
import { WindowGuard } from 'poc/window-guard';
import { PocComponent } from './poc/poc.component';
import { PocService, PocService2 } from 'app/poc.service';

import {ServiceLocator} from 'molecular/build/renderer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageListComponent,
    StatusComponent,
    FolderTreeComponent,
    ShowImageComponent,
    PocComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TreeModule,
    OverlayPanelModule
  ],
  providers: [FileSystemService, StatusService,
    MenuService, WindowService, WindowGuard]
    .concat(ServiceLocator.provide('AppComponent', PocService2, PocService))
  , bootstrap: [AppComponent]
})
export class AppModulet { }