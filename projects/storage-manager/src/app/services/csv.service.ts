import { Injectable } from '@angular/core';
import { nameOf } from '../globals';
import { v4 as generateGuid } from 'uuid';
import { IGroup, IOrder, IProduct } from '@smgr/interfaces';
import { Store } from '@ngrx/store';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { ICalculationAttributesVariables } from '../interfaces/i-calculation-context-variables.interface';
import { selectCalculationAttributesValid, selectContainerHeight, selectContainerWidth, selectGroups, selectOrders, selectUnit } from '@smgr/store';

@Injectable({
    providedIn: 'root'
})
export class CsvService {

    public headers = ['Order', 'Description', 'Quantity', 'Length', 'Width', 'Height', 'TurningAllowed', 'StackingAllowed', 'Group', 'GroupName'];
    public headerOrderMap: { [key: string]: any } = {
        'Order': nameOf<IOrder>('index'),
        'Description': nameOf<IOrder>('description'),
        'Quantity': nameOf<IOrder>('quantity'),
        'Length': nameOf<IOrder>('length'),
        'Width': nameOf<IOrder>('width'),
        'Height': nameOf<IOrder>('height'),
        'TurningAllowed': nameOf<IOrder>('turningAllowed'),
        'StackingAllowed': nameOf<IOrder>('stackingAllowed'),
        'Group': nameOf<IOrder>('group'),
        'GroupName': (order: IOrder, groups: IGroup[]) => groups.find(group => group.id === order.group)?.desc
    };

    constructor(private _store: Store) { }

    public async createCSVFromCurrentState() {
        const calculationAttributesValid = await selectSnapshot(this._store.select(selectCalculationAttributesValid));
        if (!calculationAttributesValid) {
            return;
        }

        const containerHeight = await selectSnapshot(this._store.select(selectContainerHeight));
        const containerWidth = await this._store.select(selectContainerWidth);
        const unit = await this._store.select(selectUnit);
        const orders = await this._store.select(selectOrders);
        const groups = await this._store.select(selectGroups);

        const colCount = this.headers.length;
        const csv: string[] = ['', '', this.headers.join(',')];
        for (let i = 0; i < colCount; i++) {
            csv[0] += i === 0 ? 'ContainerWidth' : i === 1 ? 'ContainerHeight' : i === 2 ? 'Unit' : '';
            csv[1] += i === 0 ? containerWidth : i === 1 ? containerHeight : i === 2 ? unit : '';
            if (i < (colCount - 1)) {
                csv[0] += ',';
                csv[1] += ',';
            }
        }
        for (let order of (orders as any)) csv.push(this.headers.map(x => {
            if (typeof (this.headerOrderMap as any)[x] === 'string') return order[(this.headerOrderMap as any)[x]];
            else if (typeof (this.headerOrderMap as any)[x] === 'function') return (this.headerOrderMap as any)[x](order, groups);
            return '';
        }).join(','));

        return csv.join('\n');
    }

    public extractCSVEntities(csvString: string): ICalculationAttributesVariables {
        let rows = csvString.split('\n').map(row => row.replace(/\r$/, ''));
        let containerRow = rows[1].split(',');

        const containerWidth = parseFloat(containerRow[0]),
            containerHeight = parseFloat(containerRow[1]),
            unit = containerRow[2] as any ?? 'mm';

        let properties = [];
        for (let column of rows[2].split(',')) properties.push((this.headerOrderMap as any)[column]);
        let orders: IOrder[] = [];
        let groups: IGroup[] = [];
        for (let row of rows.splice(3)) {
            let order: IOrder = {} as IOrder;
            properties.filter(x => typeof x === 'string').forEach((property: string, index: number) => {
                let converted: any = row.split(',')[index];
                if ([nameOf<IOrder>('height'), nameOf<IOrder>('width'), nameOf<IOrder>('length'), nameOf<IOrder>('index'), nameOf<IOrder>('quantity')].indexOf(property) > -1) converted = parseFloat(converted);
                else if (nameOf<IOrder>('group') === property) {
                    converted = parseInt(converted);
                    if (groups.findIndex(group => group.sequenceNumber === converted) === -1) {
                        const tableHeaders = rows[2].split(',');
                        const indexOfGroupName = tableHeaders.indexOf('GroupName');
                        groups.push({
                            id: generateGuid(),
                            sequenceNumber: converted,
                            color: this._gerateRandomColor(),
                            desc: row.split(',')[indexOfGroupName] ?? 'unnamed group'
                        });
                    }
                    order.group = groups.find(group => group.sequenceNumber === converted)!.id;
                    converted = undefined;
                }
                else if ([nameOf<IOrder>('stackingAllowed'), nameOf<IOrder>('turningAllowed')].indexOf(property) > -1) converted = converted === 'true';
                if (typeof converted !== 'undefined') (order as any)[property] = converted;
            });
            order.id = generateGuid();
            orders.push(order);
        }

        return {
            containerHeight: containerHeight,
            containerWidth: containerWidth,
            groups: groups,
            products: (orders.filter((x, index: number) => orders.findIndex(y => y.description === x.description) === index).map(order => {
                return {
                    id: order.id,
                    description: order.description ?? null,
                    height: order.height,
                    length: order.length,
                    width: order.width
                } as IProduct;
            })),
            orders: orders,
            unit: unit
        }
    }

    private _gerateRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
}
