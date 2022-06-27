import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from 'rxjs';
import { IParamDefinition } from 'src/lib/process-builder/globals/i-param-definition';
import { State } from 'src/lib/process-builder/store/reducers/i-interface.reducer';
import { selectIInterface } from 'src/lib/process-builder/store/selectors/i-interface.selectors';

@Component({
  selector: 'app-embedded-input-output-mapping-table-row',
  templateUrl: './embedded-input-output-mapping-table-row.component.html',
  styleUrls: ['./embedded-input-output-mapping-table-row.component.css']
})
export class EmbeddedInputOutputMappingTableRowComponent implements OnChanges, OnDestroy, OnInit {

  @ViewChild('rowTemplate') rowTemplate: TemplateRef<any>;

  @Input() level: number = 0;
  @Input() def!: IParamDefinition;

  private _typeDef = new BehaviorSubject<IParamDefinition[]>([]);
  typeDef$ = this._typeDef.asObservable();

  private _sub: Subscription | null = null;

  constructor(
    private _store: Store<State>
  ) { }

  isNumber = (arg: any) => typeof arg === 'number';

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['def']) this._setTypeDef();
  }

  ngOnDestroy(): void {
    if (this._sub) {
      this._sub.unsubscribe();
      this._sub = null;
    }
  }

  ngOnInit(): void {
    this._setTypeDef();
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
    else this._typeDef.next(Array.isArray(this.def.typeDef) ? this.def.typeDef : [this.def.typeDef]);
  }

}
