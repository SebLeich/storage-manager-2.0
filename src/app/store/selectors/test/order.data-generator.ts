import { IOrder } from "src/app/interfaces/i-order.interface";
import { v4 as generateGuid } from "uuid";

export class OrderDataGenerator {

    public generateOrders(counter: number) {

        return Array.from({ length: counter }).map((_, index: number) => {
            
            return {
                description: `order ${index + 1}`,
                group: 'group',
                id: generateGuid(),
                index: index,
                length: this.randomIntFromInterval(1000, 2000),
                height: this.randomIntFromInterval(1000, 2000),
                width: this.randomIntFromInterval(1000, 2000),
                quantity: this.randomIntFromInterval(1, 20),
                stackingAllowed: this.randomIntFromInterval(undefined, undefined, true),
                turningAllowed: this.randomIntFromInterval(undefined, undefined, true),
            } as IOrder;

        });

    }

    public randomIntFromInterval(lower: number = 1, upper: number = 10, getBool: boolean = false){
        if(!!getBool){
            return Math.random() < 0.5;
        }

        return Math.floor(Math.random() * (upper - lower + 1) + lower);
    }

}