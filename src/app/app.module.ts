import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { VisualizerComponent } from './components/main/visualizer/visualizer.component';
import { GoodPreviewComponent } from './components/good-preview/good-preview.component';
import { MatButtonModule } from '@angular/material/button';
import { PrettyLengthPipe } from './pipes/pretty-length.pipe';
import { PrettyVolumePipe } from './pipes/pretty-volume.pipe';
import { EditDataDialogComponent } from './components/dialog/edit-data-dialog/edit-data-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ErrorComponent } from './components/main/error/error.component';
import { SolutionPreviewComponent } from './components/solution-preview/solution-preview.component';
import { ContainerPreviewComponent } from './components/container-preview/container-preview.component';
import { ChartsModule } from 'ng2-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GoodsPanelComponent } from './components/goods-panel/goods-panel.component';
import { GroupsPanelComponent } from './components/groups-panel/groups-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VisualizerComponent,
    GoodPreviewComponent,
    PrettyLengthPipe,
    PrettyVolumePipe,
    EditDataDialogComponent,
    ErrorComponent,
    SolutionPreviewComponent,
    ContainerPreviewComponent,
    GoodsPanelComponent,
    GroupsPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSnackBarModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
