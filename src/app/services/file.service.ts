import { Injectable } from '@angular/core';

@Injectable()
export class FileService {

  constructor() { }

  static downloadFile(dataUrl: string, fileName: string){
    var element = document.createElement('a');
    element.setAttribute('href', dataUrl);
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

}
