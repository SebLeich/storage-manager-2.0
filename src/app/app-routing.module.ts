import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VizualizerComponent } from './components/vizualizer/vizualizer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: VizualizerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
