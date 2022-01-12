import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

import { VisualizerComponent } from './components/visualizer/visualizer.component';
import { GoodPreviewComponent } from './components/good-preview/good-preview.component';
import { MatButtonModule } from '@angular/material/button';
import { PrettyLengthPipe } from './pipes/pretty-length.pipe';
import { PrettyVolumePipe } from './pipes/pretty-volume.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VisualizerComponent,
    GoodPreviewComponent,
    PrettyLengthPipe,
    PrettyVolumePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
