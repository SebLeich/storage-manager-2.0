import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/lib/shared/components/error/error.component';
import { CalculationComponent } from './components/main/calculation/calculation.component';
import { LocalDataComponent } from './components/main/local-data/local-data.component';
import { VisualizerComponent } from './components/main/visualizer/visualizer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'visualizer' },
  { path: 'calculation', component: CalculationComponent },
  { path: 'data-pipeline-designer', loadChildren: () => import('src/lib/process-builder-wrapper/process-builder-wrapper.module').then(m => m.ProcessBuilderWrapperModule) },
  { path: 'local-data', component: LocalDataComponent },
  { path: 'visualizer', component: VisualizerComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
