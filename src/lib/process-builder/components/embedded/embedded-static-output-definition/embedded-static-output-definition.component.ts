import { CodemirrorRepository } from '@/lib/core/codemirror.repository';
import { ProcessBuilderRepository } from '@/lib/core/process-builder-repository';
import { IEmbeddedView } from '@/lib/process-builder/classes/embedded-view';
import { selectSnapshot } from '@/lib/process-builder/globals/select-snapshot';
import { IInterface, IParam, IParamDefinition } from '@/lib/process-builder/interfaces';
import { TaskCreationFormGroup } from '@/lib/process-builder/interfaces/task-creation-form-group-value.interface';
import { selectIInterface, selectIInterfaces } from '@/lib/process-builder/store/selectors';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ControlContainer } from '@angular/forms';
import { Store } from '@ngrx/store';
import JSONEditor from 'jsoneditor';
import { defer, Subscription, startWith, switchMap, distinctUntilChanged, map, merge, Subject, debounceTime, shareReplay } from 'rxjs';

@Component({
  selector: 'app-embedded-static-output-definition',
  templateUrl: './embedded-static-output-definition.component.html',
  styleUrls: ['./embedded-static-output-definition.component.scss'],
})
export class EmbeddedStaticOutputDefinitionComponent implements OnDestroy, OnInit, IEmbeddedView {
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
  public templateObject$ = this.currentTemplate$.pipe(
    map((currentTemplate) => {
      const def = this.formGroup.controls.outputParamValue?.value;
      const currIFace = (Array.isArray(def) ? def[0] : def) as IParamDefinition;
      const output = currentTemplate?.identifier === currIFace.interface ? currIFace.defaultValue : ProcessBuilderRepository.createPseudoObjectFromIInterface(currentTemplate as IInterface);
      return this.isCollection() && !Array.isArray(output) ? [output] : output;
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

  private _subscription = new Subscription();

  constructor(
    private _store: Store,
    private _controlContainer: ControlContainer
  ) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this.destroy$$.next();

  }

  public ngOnInit(): void {
    this._jsonEditorInstance.set(
      new JSONEditor(this.parameterBody.nativeElement, {
        mode: 'code',
        onChange: () => {
          try {
            JSON.stringify(this._jsonEditorInstance()?.get());
            this.json.set(this._jsonEditorInstance()?.get() as object);
          } catch(e){
            // do nothing
          }
        },
      })
    );
    this._subscription.add(this.templateObject$.subscribe(obj => {
      this._jsonEditorInstance()?.set(obj);
    }));
    this._subscription.add(this.updateFormValue$.subscribe(async () => {
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
    }));

    const initialValue = this.formGroup.controls.outputParamValue?.value;
    if (!Array.isArray(initialValue) && initialValue?.constant) {
      this.isCollection.set(initialValue.type === 'array');
    }
  }

  public setIsCollection() {
    const value = !this.isCollection();
    this.isCollection.set(value);
  }
}
