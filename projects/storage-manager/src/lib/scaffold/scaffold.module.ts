import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScaffoldComponent } from './scaffold/scaffold.component';
import { TranslationModule } from '../translation';
import { NavbarModule } from '../navbar/navbar.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
    declarations: [ScaffoldComponent],
    exports: [ScaffoldComponent, TranslationModule],
    imports: [
        CommonModule,
        MatIconModule,
        NavbarModule,
        TranslationModule
    ]
})
export class ScaffoldModule { }
