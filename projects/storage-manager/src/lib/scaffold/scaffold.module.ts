import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScaffoldComponent } from './scaffold/scaffold.component';
import { TranslationModule } from '../translation';
import { NavbarModule } from '../navbar/navbar.module';



@NgModule({
    declarations: [ScaffoldComponent],
    exports: [ScaffoldComponent, TranslationModule],
    imports: [
        CommonModule,
        NavbarModule,
        TranslationModule
    ]
})
export class ScaffoldModule { }
