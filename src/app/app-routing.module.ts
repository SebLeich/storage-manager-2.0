import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculationComponent } from './components/main/calculation/calculation.component';
import { ErrorComponent } from './components/main/error/error.component';
import { OrdersComponent } from './components/main/orders/orders.component';
import { VisualizerComponent } from './components/main/visualizer/visualizer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'visualizer' },
  { path: 'calculation', component: CalculationComponent },
  { path: 'data-flow', loadChildren: () => import('src/lib/process-builder/process-builder.module').then(m => m.ProcessBuilderModule) },
  { path: 'orders', component: OrdersComponent },
  { path: 'visualizer', component: VisualizerComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
