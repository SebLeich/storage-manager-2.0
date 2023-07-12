import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleService } from './services/console.service';
import { ConsoleComponent } from './components/console/console.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConsoleComponent
  ],
  exports: [
    ConsoleComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [ConsoleService]
})
export class ConsoleModule { }
