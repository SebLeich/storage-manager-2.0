import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import JSONEditor from 'jsoneditor';
import { combineLatest, firstValueFrom, ReplaySubject, Subject, Subscription } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { IParam } from 'src/lib/process-builder/globals/i-param';
import {
  IProcessBuilderConfig,
  PROCESS_BUILDER_CONFIG_TOKEN,
} from 'src/lib/process-builder/globals/i-process-builder-config';
import { updateIParam } from 'src/lib/process-builder/store/actions/i-param.actions';
import * as fromIParam from 'src/lib/process-builder/store/reducers/i-param.reducer';
import { IFunction } from 'src/lib/process-builder/globals/i-function';
import {
  INJECTOR_INTERFACE_TOKEN,
  INJECTOR_TOKEN,
} from 'src/lib/process-builder/globals/injector';
import {
  InjectorInterfacesProvider,
  InjectorProvider,
} from 'src/lib/process-builder/globals/injector-interfaces-provider';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';
import { ParamEditorComponentService } from './service/param-editor-component.service';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';

@Component({
  selector: 'app-param-editor',
  templateUrl: './param-editor.component.html',
  styleUrls: ['./param-editor.component.sass'],
  providers: [
    ParamEditorComponentService,
    {
      provide: INJECTOR_INTERFACE_TOKEN,
      useFactory: () => {
        return {
          injector: {
            httpClient: InjectorInterfacesProvider.httpClient(),
            httpExtensions: InjectorInterfacesProvider.httpExtensions(),
            rxjs: InjectorInterfacesProvider.rxjs(),
          },
        };
      },
    },
    {
      provide: INJECTOR_TOKEN,
      useFactory: (httpClient: HttpClient) => {
        return {
          httpClient: httpClient,
          httpExtensions: InjectorProvider.httpExtensions(),
          rxjs: InjectorProvider.rxjs(),
        };
      },
      deps: [HttpClient],
    },
  ],
})
export class ParamEditorComponent implements OnInit, OnDestroy {
  @ViewChild('parameterBody', { static: true, read: ElementRef })
  private set parameterBody(body: ElementRef<HTMLDivElement>) {
    this._paramBody.next(body);
    this._editor.next(
      new JSONEditor(body.nativeElement, {
        onChangeJSON: (value: object) => {
          return this._jsonChanged.next(value);
        },
      })
    );
  }
  private _paramBody = new ReplaySubject<ElementRef<HTMLDivElement>>(1);
  private _editor = new ReplaySubject<JSONEditor>(1);
  private _jsonChanged = new Subject<object>();

  jsonChanged$ = this._jsonChanged.pipe(debounceTime(500));

  selectedIndex: number = 0;

  private _subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
    @Inject(INJECTOR_TOKEN) private _injector: { injector: object },
    private _paramStore: Store<fromIParam.State>,
    public paramEditorComponentService: ParamEditorComponentService,
    private _snackBar: MatSnackBar,
    private _ref: MatDialogRef<ParamEditorComponent>
  ) { }

  async calculateFunctionOutput(func: IFunction) {
    const formGroup = await selectSnapshot(this.paramEditorComponentService.formGroup$);
    if (func.customImplementation) {
      const output = await ProcessBuilderRepository.calculateCustomImplementationOutput(func.customImplementation, this._injector);
      const outputIParamDefinitions = ProcessBuilderRepository.extractObjectTypeDefinition(output);

      formGroup.controls['typeDef']?.setValue(outputIParamDefinitions);
      formGroup.controls['typeDef']?.markAsDirty();

      this._paramStore.dispatch(updateIParam(formGroup.value as IParam));

      this._snackBar.open(`param recalculated successfully`, 'Ok', {
        duration: 2000,
      });
      this.selectedIndex = 0;
    } else if (typeof func.pseudoImplementation === 'function') {
      let result = func.pseudoImplementation();
      console.log(result);
    }
  }

  async close() {
    const formGroup = await selectSnapshot(this.paramEditorComponentService.formGroup$);
    if (formGroup.dirty) {
      const editor = await selectSnapshot(this._editor);
      const parsedValue = ProcessBuilderRepository.extractObjectTypeDefinition(
        editor.get()
      );
      formGroup.controls['defaultValue'].setValue(parsedValue);
      formGroup.controls['normalizedName'].setValue(
        ProcessBuilderRepository.normalizeName(formGroup.controls['name']?.value)
      );

      this._paramStore.dispatch(updateIParam(formGroup.value as IParam));
      this._snackBar.open(`param saved`, 'Ok', { duration: 2000 });
    }

    this._ref.close();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this._subscriptions.add(
      this.paramEditorComponentService.availableInputParams$.subscribe(
        (iParams) => {
          this.paramEditorComponentService.updateInjector(iParams);
        }
      )
    );
    this._subscriptions.add(
      combineLatest([
        this._editor,
        this.paramEditorComponentService.paramObjectPseudoObject$,
      ]).subscribe(([editor, pseudoObject]: [JSONEditor, object]) => {
        editor.set(pseudoObject);
        editor.expandAll();
      })
    );
    this._subscriptions.add(
      combineLatest([this.paramEditorComponentService.formGroup$, this.jsonChanged$])
        .subscribe(([formGroup, pseudoObject]) => {
          const iParam = ProcessBuilderRepository.extractObjectTypeDefinition(pseudoObject) as IParam;
          formGroup.controls['typeDef']?.setValue(iParam.typeDef);
          formGroup.controls['interface'].setValue(null);
          formGroup.controls['typeDef']?.markAsDirty();
          formGroup.controls['interface'].markAsDirty();
        })
    );
  }
}
