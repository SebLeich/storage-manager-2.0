import moment from "moment";
import { v4 as generateGuid } from "uuid";

export class SolutionDataGenerator {

    public generateSolutions(counter: number) {

        return Array.from({ length: counter }).map((_, index: number) => {

            return {
                id: generateGuid(),
                calculated: moment().format(),
                calculationSource: {
                    title: 'custom algorithm'
                },
                container: {
                    unit: 'mm',
                    goods: []
                },
                description: `solution ${index + 1}`,
                steps: []
            };

        });

    }

}