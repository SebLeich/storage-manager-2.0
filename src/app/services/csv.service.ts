import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { nameOf } from '../globals';
import { DataService } from './data.service';

import * as fromIOrderState from 'src/app/store/reducers/i-order.reducers';
import * as fromIProductState from 'src/app/store/reducers/i-product.reducers';
import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';

import { IOrder } from '../interfaces/i-order.interface';
import { Store } from '@ngrx/store';
import { selectOrders } from '../store/selectors/i-order.selectors';
import { IGroup } from '../interfaces/i-group.interface';
import { addProducts } from '../store/actions/i-product.actions';
import { addOrders } from '../store/actions/i-order.actions';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  headers = ['Order', 'Description', 'Quantity', 'Length', 'Width', 'Height', 'TurningAllowed', 'StackingAllowed', 'Group', 'GroupName'];
  headerOrderMap = {
    'Order': nameOf<IOrder>('id'),
    'Description': nameOf<IOrder>('description'),
    'Quantity': nameOf<IOrder>('quantity'),
    'Length': nameOf<IOrder>('length'),
    'Width': nameOf<IOrder>('width'),
    'Height': nameOf<IOrder>('height'),
    'TurningAllowed': nameOf<IOrder>('turningAllowed'),
    'StackingAllowed': nameOf<IOrder>('stackingAllowed'),
    'Group': nameOf<IOrder>('group'),
    'GroupName': (order: IOrder) => this._dataService.groups.find(x => x.id === order.group)?.desc
  };

  constructor(
    private _dataService: DataService,
    private _httpClient: HttpClient,
    private _orderStore: Store<fromIOrderState.State>,
    private _productStore: Store<fromIProductState.State>,
    private _solutionStore: Store<fromISolutionState.State>,
  ) { }

  downloadOrderCollectionToCSV() {
    this._dataService.containerValid$
      .pipe(
        take(1),
        filter(x => x ? true : false),
        switchMap(() => combineLatest([this._dataService.containerHeight$, this._dataService.containerWidth$, this._dataService.unit$, this._orderStore.select(selectOrders)]).pipe(take(1)))
      )
      .subscribe(([height, width, unit, orders]) => {
        let colCount = this.headers.length;
        let csv: string[] = ['', '', this.headers.join(',')];
        for (let i = 0; i < colCount; i++) {
          csv[0] += i === 0 ? 'ContainerWidth' : i === 1 ? 'ContainerHeight' : i === 2 ? 'Unit' : '';
          csv[1] += i === 0 ? width : i === 1 ? height : i === 2 ? unit : '';
          if (i < (colCount - 1)) {
            csv[0] += ',';
            csv[1] += ',';
          }
        }
        for (let order of (orders as any)) csv.push(this.headers.map(x => {
          if (typeof (this.headerOrderMap as any)[x] === 'string') return order[(this.headerOrderMap as any)[x]];
          else if (typeof (this.headerOrderMap as any)[x] === 'function') return (this.headerOrderMap as any)[x](order);
          return '';
        }).join(','));
        let final = csv.join('\n');
        var element = document.createElement('a');
        element.setAttribute('href', `data:text/csv;charset=UTF-8,${encodeURIComponent(final)}`);
        element.setAttribute('download', `orders_${moment().format('YYYY_MM_DD_HH_mm')}.csv`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      });
  }

  uploadCSVToOrderCollection(event: Event) {
    let files: FileList = (event.target as HTMLInputElement).files!;
    if (files.length === 0) return;
    this._fileToString(files[0]).subscribe((result: string) => this._importCSVToOrderCollection(result));
  }

  uploadDefaultOrders(): Observable<string> {
    let subject = new Subject<string>();
    this._httpClient.get('./assets/exampleOrders.csv', {
      responseType: 'text'
    }).subscribe(
      (csv: string) => {
        this._importCSVToOrderCollection(csv);
        subject.next(csv);
        subject.complete();
      },
      (error) => subject.error(error)
    );
    return subject.asObservable();
  }

  private _fileToString(file: File): Observable<string> {
    let subject = new Subject<string>();
    var reader = new FileReader();
    reader.onload = () => {
      subject.next(reader.result as string);
      subject.complete();
    }
    reader.readAsText(file);
    return subject.asObservable();
  }

  private _importCSVToOrderCollection(csvString: string) {
    try {
      let rows = csvString.split('\n');
      let containerRow = rows[1].split(',');
      this._dataService.setContainerWidth(parseFloat(containerRow[0]));
      this._dataService.setContainerHeight(parseFloat(containerRow[1]));
      this._dataService.setUnit(containerRow[2] as any ?? 'mm');
      let properties = [];
      for (let column of rows[2].split(',')) properties.push((this.headerOrderMap as any)[column]);
      let orders: IOrder[] = [];
      let groups: IGroup[] = [];
      for (let row of rows.splice(3)) {
        let order: IOrder = {} as IOrder;
        properties.filter(x => typeof x === 'string').forEach((property: string, index: number) => {
          let converted: any = row.split(',')[index];
          if ([nameOf<IOrder>('height'), nameOf<IOrder>('width'), nameOf<IOrder>('length'), nameOf<IOrder>('id'), nameOf<IOrder>('quantity')].indexOf(property) > -1) converted = parseFloat(converted);
          else if (nameOf<IOrder>('group') === property) {
            converted = parseInt(converted);
            if (groups.findIndex(x => x.id === converted) === -1) {

              groups.push({
                id: converted,
                color: '#ffffff',
                desc: row.split(',')[rows[2].split(',').indexOf('GroupName')]
              });
            }
          }
          else if ([nameOf<IOrder>('stackingAllowed'), nameOf<IOrder>('turningAllowed')].indexOf(property) > -1) converted = converted === 'true';
          (order as any)[property] = converted;
        });
        orders.push(order);
      }

      this._dataService.addGroups(groups);
      this._productStore.dispatch(addProducts({
        products: (orders.filter((x, index: number) => orders.findIndex(y => y.description === x.description) === index).map(order => {
          return {
            id: order.id,
            description: order.description,
            height: order.height,
            length: order.length,
            width: order.width
          };
        }))
      }));

      this._orderStore.dispatch(addOrders({ orders }));
    } catch (e) {
      console.error(e);
    }
  }

}
