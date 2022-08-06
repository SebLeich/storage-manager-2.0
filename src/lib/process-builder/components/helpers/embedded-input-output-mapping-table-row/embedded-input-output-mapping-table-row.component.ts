import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IInterface } from 'src/lib/process-builder/globals/i-interface';
import { IParamDefinition } from 'src/lib/process-builder/globals/i-param-definition';
import * as fromIParam from 'src/lib/process-builder/store/reducers/i-param.reducer';
import * as fromIFunction from 'src/lib/process-builder/store/reducers/i-function.reducer';
import * as fromIInterface from 'src/lib/process-builder/store/reducers/i-interface.reducer';
import { selectIInterface } from 'src/lib/process-builder/store/selectors/i-interface.selectors';
import { selectIParamsByType } from 'src/lib/process-builder/store/selectors/i-param.selectors';

@Component({
  selector: 'app-embedded-input-output-mapping-table-row',
  templateUrl: './embedded-input-output-mapping-table-row.component.html',
  styleUrls: ['./embedded-input-output-mapping-table-row.component.css'],
})
export class EmbeddedInputOutputMappingTableRowComponent
  implements OnChanges, OnDestroy
{
  @ViewChild('rowTemplate') rowTemplate: TemplateRef<any>;

  @Input() level: number = 0;
  @Input() def!: IParamDefinition;
  @Input() inputParams!: number | number[] | null;

  private _typeDef = new BehaviorSubject<IParamDefinition[]>([]);
  typeDef$ = this._typeDef.asObservable();

  private _currentDefinition = new ReplaySubject<{
    type: 'object' | 'number' | 'string' | 'boolean' | 'array';
    interface?: IInterface;
  }>(1);
  availableTypes$ = this._currentDefinition.pipe(
    switchMap((def) => {
      return this._paramStore.select(selectIParamsByType(def));
    })
  );

  private _sub: Subscription | null = null;
  private _subscriptions: Subscription[] = [];

  constructor(
    private _paramStore: Store<fromIParam.State>,
    private _funcStore: Store<fromIFunction.State>,
    private _interfaceStore: Store<fromIInterface.State>
  ) {}

  isNumber = (arg: any) => typeof arg === 'number';

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['def'] || simpleChanges['inputParams'])
      this._setTypeDef();
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

  updateAvailableParams(type, iface?) {
    this._currentDefinition.next({ type: type, interface: iface });
  }

  private _setTypeDef() {
    if (!this.def) return;
    if (typeof this.def.interface === 'number') {
      if (this._sub) {
        this._sub.unsubscribe();
        this._sub = null;
      }
      this._sub = this._interfaceStore
        .select(selectIInterface(this.def.interface))
        .subscribe((iface) => {
          if (!iface || !Array.isArray(iface.typeDef)) return;
          this._typeDef.next(iface.typeDef);
        });
    } else {
      this._typeDef.next(
        Array.isArray(this.def.typeDef) ? this.def.typeDef : [this.def.typeDef]
      );
    }
  }
}
