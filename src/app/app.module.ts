import 'zone.js';
import 'reflect-metadata';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {ImageListComponent} from './image-list/image-list.component';
import {StatusComponent} from './status/status.component';
import {FileSystemService} from './services/file-system.service';
import { StatusService } from './status/status.service';
import { MenuService } from './services/menu.service';
import { FolderTreeComponent } from './folder-tree/folder-tree.component';

import { AppRoutingModule } from './app-routing.module';

import {TreeModule} from 'primeng/components/tree/tree';
import {OverlayPanelModule} from 'primeng/components/overlaypanel/overlaypanel';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageListComponent,
    StatusComponent,
    FolderTreeComponent
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
  providers: [FileSystemService, StatusService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
