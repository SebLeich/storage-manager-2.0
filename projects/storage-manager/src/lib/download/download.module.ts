import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadService } from './services/download/download.service';



@NgModule({
    imports: [
        CommonModule
    ],
    providers: [DownloadService]
})
export class DownloadModule { }
