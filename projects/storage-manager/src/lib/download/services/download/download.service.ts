import { Injectable } from '@angular/core';

@Injectable()
export class DownloadService {

	public downloadBlob(blob: Blob, fileName: string): void {
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.setAttribute('hidden', '');
		a.setAttribute('href', url);
		a.setAttribute('download', fileName);
		document.body.appendChild(a);
		a.click();

		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}

	public downloadJSONContentsAsFile(obj: object, fileName: string): void {
		const fileContents = JSON.stringify(obj, null, 2);
		const blob = new Blob([fileContents], { type: 'application/json' });
		this.downloadBlob(blob, fileName);
	}

	public downloadStringContentsAsFile(fileContents: string, type: 'text/csv' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', fileName: string): void {
		const blob = new Blob([fileContents], { type });
		this.downloadBlob(blob, fileName);
	}
}
