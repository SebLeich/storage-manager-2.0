import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '../translation';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
    declarations: [
        NavbarComponent
    ],
    exports: [
        NavbarComponent
    ],
    imports: [
        CommonModule,
        TranslationModule
    ]
})
export class NavbarModule { }
