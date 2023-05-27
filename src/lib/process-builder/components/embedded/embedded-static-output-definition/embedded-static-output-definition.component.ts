import { CodemirrorRepository } from '@/lib/core/codemirror.repository';
import { ProcessBuilderRepository } from '@/lib/core/process-builder-repository';
import { IEmbeddedView } from '@/lib/process-builder/classes/embedded-view';
import { selectSnapshot } from '@/lib/process-builder/globals/select-snapshot';
import { IInterface, IParam, IParamDefinition } from '@/lib/process-builder/interfaces';
import { TaskCreationFormGroup } from '@/lib/process-builder/interfaces/task-creation-form-group-value.interface';
import { selectIInterface, selectIInterfaces } from '@/lib/process-builder/store/selectors';
import { Component, DestroyRef, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ControlContainer } from '@angular/forms';
import { Store } from '@ngrx/store';
import JSONEditor from 'jsoneditor';
import { defer, startWith, switchMap, distinctUntilChanged, map, merge, Subject, debounceTime, shareReplay, combineLatest } from 'rxjs';

@Component({
  selector: 'app-embedded-static-output-definition',
  templateUrl: './embedded-static-output-definition.component.html',
  styleUrls: ['./embedded-static-output-definition.component.scss'],
})
export class EmbeddedStaticOutputDefinitionComponent implements OnInit, IEmbeddedView {
  @ViewChild('parameterBody', { static: true, read: ElementRef })
  private parameterBody!: ElementRef<HTMLDivElement>;

  public templates$ = this._store.select(selectIInterfaces());
  public currentTemplate$ = defer(() =>
    this.formGroup.controls.interface!.valueChanges.pipe(
      startWith(this.formGroup.controls.interface?.value),
      switchMap((identifier) =>
        this._store.select(selectIInterface(identifier))
      ),
      distinctUntilChanged(
        (prev, curr) => prev?.identifier === curr?.identifier
      )
    )
  );
  public json = signal<object>({});
  public isCollection = signal(!Array.isArray(this.formGroup.value.outputParamValue) && this.formGroup.value.outputParamValue?.type === 'array');
  public templateObject$ = combineLatest([this.currentTemplate$, toObservable(this.isCollection)]).pipe(
    map(([currentTemplate, isCollection]) => {
      const def = this.formGroup.controls.outputParamValue?.value;
      const currIFace = (Array.isArray(def) ? def[0] : def) as IParamDefinition | null;

      if (currIFace && currentTemplate?.identifier === currIFace?.interface) {
        const defaultValue = Array.isArray(currIFace.defaultValue) ? currIFace.defaultValue[0] : currIFace.defaultValue;
        return isCollection ? [defaultValue] : defaultValue;
      }

      const output = ProcessBuilderRepository.createPseudoObjectFromIInterface(currentTemplate as IInterface);
      return isCollection && !Array.isArray(output) ? [output] : output;
    })
  );
  public paramObjectPseudoObject$ = merge(
    toObservable(this.json),
    this.templateObject$
  ).pipe(shareReplay(1));
  public get formGroup() {
    return this._controlContainer.control as TaskCreationFormGroup;
  }

  private _jsonEditorInstance = signal<JSONEditor | null>(null);
  public destroy$$ = new Subject<void>();
  public updateFormValue$ = merge(this.paramObjectPseudoObject$.pipe(debounceTime(200)), toObservable(this.isCollection).pipe(debounceTime(200)), toObservable(this.json).pipe(debounceTime(200)), this.destroy$$);

  constructor(private _store: Store, private _controlContainer: ControlContainer, private _destroyRef: DestroyRef) { }

  public ngOnInit(): void {
    this.initJsonEditor();
    this.templateObject$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(obj => this._jsonEditorInstance()?.set(obj));
    this.updateFormValue$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(async () => await this.onFormValueUpdated());

    const initialValue = this.formGroup.controls.outputParamValue?.value;
    if (!Array.isArray(initialValue) && initialValue?.constant) {
      this.isCollection.set(initialValue.type === 'array');
    }
  }

  public toggleIsCollection() {
    const value = !this.isCollection();
    this.isCollection.set(value);
  }

  private initJsonEditor(){
    this._jsonEditorInstance.set(
      new JSONEditor(this.parameterBody.nativeElement, {
        mode: 'code',
        onChange: () => {
          try {
            JSON.stringify(this._jsonEditorInstance()?.get());
            this.json.set(this._jsonEditorInstance()?.get() as object);
          } catch (e) {
            // do nothing
          }
        },
      })
    );
  }

  private async onFormValueUpdated() {
    const iFace = await selectSnapshot(this.currentTemplate$),
      paramValue = await selectSnapshot(this.paramObjectPseudoObject$);

    this.formGroup.controls.outputParamValue?.patchValue({
      constant: true,
      defaultValue: paramValue,
      interface: iFace?.identifier,
      type: Array.isArray(paramValue) ? 'array' : 'object'
    } as IParam);

    const lines = ['async () => {'];
    const stringified = Array.isArray(paramValue) ? paramValue.map(obj => JSON.stringify(obj)) : JSON.stringify(paramValue);
    if (Array.isArray(stringified)) {
      lines.push(
        '  return [',
        ...stringified.map((line, index, array) => {
          return index === array.length - 1 ? `    ${line}` : `    ${line},`;
        }),
        '  ];');
    } else {
      lines.push('  return ${stringified};');
    }
    lines.push('}');

    const leaf = CodemirrorRepository.stringToTextLeaf(lines);
    this.formGroup.controls.implementation?.setValue(leaf);
  }
}
