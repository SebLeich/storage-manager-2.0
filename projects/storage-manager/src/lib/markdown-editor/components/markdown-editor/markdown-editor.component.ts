import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { IEditorConfiguration } from '../../interfaces/editor-configuration.interface';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';

@Component({
	selector: 'app-markdown-editor',
	templateUrl: './markdown-editor.component.html',
	styleUrls: ['./markdown-editor.component.scss'],
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MarkdownEditorComponent), multi: true }],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownEditorComponent implements ControlValueAccessor, OnDestroy, OnInit {
	@ViewChild(QuillEditorComponent) public editor: QuillEditorComponent | undefined;

	@Input() public configuration: IEditorConfiguration = {};
	@Input() public set value(value: string | null | undefined) {
		this.formControl.setValue(value ?? null);
	}

	@Output() public blurred = new EventEmitter<void>();
	@Output() public keyDownEnter = new EventEmitter<void>();
	@Output() public valueChanged = new EventEmitter<string>();

	public formControl = new FormControl();

	public toolbarOptions = [
		['undo', 'redo'],
		['bold', 'italic', 'underline', 'strike'],
		[{ 'header': 1 }, { 'header': 2 }],
		['image'],
	];
	public toolbar = {
		container: this.toolbarOptions,
		handlers: {
			'undo': () => this.editor?.quillEditor.history.undo(),
			'redo': () => this.editor?.quillEditor.history.redo(),
		}
	};

	private _touched = false;
	private _onTouched?: () => void;
	private _onChange?: (value: string | null) => void;
	private _subscription = new Subscription();

	public registerOnChange(fn: (value: string | null) => void): void {
		this._onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this._onTouched = fn;
	}

	public ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}

	public ngOnInit(): void {
		this._subscription.add(this.formControl.valueChanges.subscribe(value => this.setValue(value)));
		this._subscription.add(this.keyDownEnter.subscribe(() => this.setValue(this.formControl.value, 'enter')));
		this._subscription.add(this.blurred.subscribe(() => this.setValue(this.formControl.value, 'blur')));

		this._loadIcons();
	}

	public onQuillEditorCreated(editor: Quill) {
		editor.root.addEventListener("blur", () => {
			this.blurred.emit();
		});
		(editor.keyboard as any).bindings[13].unshift({
			key: 13,
			handler: () => {
				this.keyDownEnter.emit();
				return false;
			}
		});
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.formControl[isDisabled ? 'disable' : 'enable']();
	}

	public setValue(value: string, source: 'enter' | 'change' | 'blur' = 'change') {
		if (this.configuration.emitOn && this.configuration.emitOn.indexOf(source) === -1) {
			return;
		}

		if (this.formControl.pristine && !this.configuration.emitEvenIfPristine) {
			if (source === 'enter') {
				(document.activeElement as HTMLElement)?.blur();
			}

			return;
		}

		this._onChange?.(value);
		this.valueChanged.emit(value);
		if (!this._touched) {
			this._touched = true;
			this._onTouched?.();
		}

		if (source === 'enter') {
			(document.activeElement as HTMLElement)?.blur();
		}

		this.formControl.markAsPristine();
	}

	public writeValue(value: string | null): void {
		this.formControl.setValue(value);
	}

	private _loadIcons() {
		const icons = Quill.import('ui/icons');
		icons['undo'] = '<svg viewbox="0 0 18 18"><polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>' +
			'<path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path></svg>';
		icons['redo'] = '<svg viewbox="0 0 18 18"><polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>' +
			'<path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path></svg>';
	}
}
