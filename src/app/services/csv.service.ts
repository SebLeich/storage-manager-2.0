import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { Group, Order } from '../classes';
import { nameOf } from '../globals';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  headers = ['Order', 'Description', 'Quantity', 'Length', 'Width', 'Height', 'TurningAllowed', 'StackingAllowed', 'Group', 'GroupName'];
  headerOrderMap = {
    'Order': nameOf<Order>('orderId'),
    'Description': nameOf<Order>('description'),
    'Quantity': nameOf<Order>('quantity'),
    'Length': nameOf<Order>('length'),
    'Width': nameOf<Order>('width'),
    'Height': nameOf<Order>('height'),
    'TurningAllowed': nameOf<Order>('turningAllowed'),
    'StackingAllowed': nameOf<Order>('stackingAllowed'),
    'Group': nameOf<Order>('group'),
    'GroupName': (order: Order) => this._dataService.groups.find(x => x._Id === order.group)?._Desc
  };

  constructor(private _dataService: DataService) { }

  downloadOrderCollectionToCSV() {
    this._dataService.containerValid$
      .pipe(
        take(1),
        filter(x => x ? true : false),
        switchMap(() => combineLatest([this._dataService.containerHeight$, this._dataService.containerWidth$, this._dataService.unit$, this._dataService.orders$]).pipe(take(1)))
      )
      .subscribe(([height, width, unit, orders]) => {
        let colCount = this.headers.length;
        let csv: string[] = ['', '', this.headers.join(',')];
        for (let i = 0; i < colCount; i++) {
          csv[0] += i === 0 ? 'ContainerWidth' : i === 1 ? 'ContainerHeight': i === 2? 'Unit' : '';
          csv[1] += i === 0 ? width : i === 1 ? height: i === 2? unit: '';
          if (i < (colCount - 1)) {
            csv[0] += ',';
            csv[1] += ',';
          }
        }
        for (let order of orders) csv.push(this.headers.map(x => {
          if (typeof this.headerOrderMap[x] === 'string') return order[this.headerOrderMap[x]];
          else if (typeof this.headerOrderMap[x] === 'function') return this.headerOrderMap[x](order);
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
    let files = (event.target as HTMLInputElement).files;
    if (files.length === 0) return;
    this._fileToString(files[0]).subscribe((result: string) => {
      try {
        let rows = result.split('\n');
        let containerRow = rows[1].split(',');
        this._dataService.setContainerWidth(parseFloat(containerRow[0]));
        this._dataService.setContainerHeight(parseFloat(containerRow[1]));
        this._dataService.setUnit(containerRow[2] as any ?? 'mm');
        let properties = [];
        for (let column of rows[2].split(',')) properties.push(this.headerOrderMap[column]);
        let orders: Order[] = [];
        let groups: Group[] = [];
        for (let row of rows.splice(3)) {
          let order: Order = new Order();
          properties.filter(x => typeof x === 'string').forEach((property: string, index: number) => {
            let converted: any = row.split(',')[index];
            if ([nameOf<Order>('height'), nameOf<Order>('width'), nameOf<Order>('length'), nameOf<Order>('orderId'), nameOf<Order>('quantity')].indexOf(property) > -1) converted = parseFloat(converted);
            else if (nameOf<Order>('group') === property) {
              converted = parseInt(converted);
              if (groups.findIndex(x => x._Id === converted) === -1) {
                
                groups.push({
                  '_Id': converted,
                  '_Color': null,
                  '_Desc': row.split(',')[rows[2].split(',').indexOf('GroupName')]
                });
              }
            }
            else if ([nameOf<Order>('stackingAllowed'), nameOf<Order>('turningAllowed')].indexOf(property) > -1) converted = converted === 'true';
            order[property] = converted;
          });
          orders.push(order);
        }
        this._dataService.addGroups(groups);
        this._dataService.addProducts(orders.filter((x, index: number) => orders.findIndex(y => y.description === x.description) === index).map(x => {
          return {
            description: x.description,
            height: x.height,
            length: x.length,
            width: x.width
          };
        }));
        this._dataService.setOrders(orders);
      } catch (e) {
        console.error(e);
      }
    });
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

}
