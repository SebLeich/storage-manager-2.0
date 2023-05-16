import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { map, switchMap, startWith } from 'rxjs';
import { Store } from '@ngrx/store';
import { IEmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';
import { selectIInterface, selectIInterfaces } from 'src/lib/process-builder/store/selectors/interface.selectors';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';

@Component({
  selector: 'app-embedded-output-param-configuration',
  templateUrl: './embedded-output-param-configuration.component.html',
  styleUrls: ['./embedded-output-param-configuration.component.scss']
})
export class EmbeddedOutputParamConfigurationComponent implements IEmbeddedView {

  public interfaces$ = this._store.select(selectIInterfaces());
  public currentInterface$ = this.formGroup.controls.interface?.valueChanges.pipe(
    startWith(this.formGroup.controls.interface.value),
    switchMap(interfaceIdentifier => this._store.select(selectIInterface(interfaceIdentifier)))
  );
  public interfaceDummyObject$ = this.currentInterface$?.pipe(map((iFace) => {
    if (iFace) {
      return ProcessBuilderRepository.createPseudoObjectFromIInterface(iFace ?? undefined);
    }

    return null;
  }));

  public get formGroup() {
    return this._controlContainer.control as TaskCreationFormGroup;
  }

  constructor(private _controlContainer: ControlContainer, private _store: Store) { }

  public sampleData() {
    this.formGroup.controls.interface?.setValue(null);
  }

}
