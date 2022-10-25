import { IGroup } from "src/app/interfaces/i-group.interface";
import { v4 as generateGuid } from "uuid";

export class GroupDataGenerator {

    public generateGroups(counter: number) {

        return Array.from({ length: counter }).map((_, index: number) => {
            
            return {
                id: generateGuid(),
                color: '#ffffff',
                desc: `group ${index + 1}`,
                sequenceNumber: index + 1
            } as IGroup;

        });

    }

}