import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IParamDefinition } from 'src/lib/process-builder/globals/i-param-definition';
import { IParamMember } from 'src/lib/process-builder/globals/i-param-member';
import { State } from 'src/lib/process-builder/store/reducers/interface.reducer';
import { selectIInterface } from 'src/lib/process-builder/store/selectors/interface.selectors';

@Component({
  selector: 'app-embedded-input-output-mapping-table-row',
  templateUrl: './embedded-input-output-mapping-table-row.component.html',
  styleUrls: ['./embedded-input-output-mapping-table-row.component.css']
})
export class EmbeddedInputOutputMappingTableRowComponent implements OnChanges, OnDestroy, AfterViewInit {

  @ViewChild('rowTemplate') public rowTemplate!: TemplateRef<any>;

  @Input() level: number = 0;
  @Input() def!: IParamDefinition;
  @Input() inputParams!: number | number[] | null;

  private _typeDef = new BehaviorSubject<(IParamDefinition | null | undefined)[]>([]);
  typeDef$ = this._typeDef.asObservable();

  private _availableTypes = new BehaviorSubject<IParamMember[]>([]);
  availableTypes$ = this._availableTypes.asObservable();

  private _sub: Subscription | null = null;
  private _subscriptions: Subscription[] = [];

  constructor(
    private _store: Store<State>
  ) { }

  isNumber = (arg: any) => typeof arg === 'number';

  menuOpened(){
    this._setAvailableTypes();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['def'] || simpleChanges['inputParams']) this._setTypeDef();
  }

  ngOnDestroy(): void {
    if (this._sub) {
      this._sub.unsubscribe();
      this._sub = null;
    }
    for (let sub of this._subscriptions) {
      sub.unsubscribe();
      this._subscriptions = [];
    }
  }

  ngAfterViewInit(): void {
    this._setTypeDef();
  }

  private _setAvailableTypes(){
    this._availableTypes.next([
      { 'navigationPath': 'exemplarySolution', 'type': 'Solution template' },
      { 'navigationPath': 'exemplarySolution.container', 'type': 'Container template' }
    ])
  }

  private _setTypeDef() {
    if (!this.def) return;
    if (typeof this.def.interface === 'number') {
      if (this._sub) {
        this._sub.unsubscribe();
        this._sub = null;
      }
      this._sub = this._store.select(selectIInterface(this.def.interface)).subscribe(iface => {
        if (!iface || !Array.isArray(iface.typeDef)) return;
        this._typeDef.next(iface.typeDef);
      });
    }
    else {
      this._typeDef.next(Array.isArray(this.def.typeDef) ? this.def.typeDef : [this.def.typeDef]);
    }
  }

}
