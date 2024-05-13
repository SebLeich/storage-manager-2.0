import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { AnimatedCounterDirective } from './directives/animated-counter.directive';
import { PrettyLengthPipe } from './pipes/pretty-length/pretty-length.pipe';
import { PrettyVolumePipe } from './pipes/pretty-volume/pretty-volume.pipe';



@NgModule({
    declarations: [
        AnimatedCounterDirective,
        ErrorComponent,
        PrettyLengthPipe,
        PrettyVolumePipe
    ],
    exports: [
        AnimatedCounterDirective,
        ErrorComponent,
        PrettyLengthPipe,
        PrettyVolumePipe
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
