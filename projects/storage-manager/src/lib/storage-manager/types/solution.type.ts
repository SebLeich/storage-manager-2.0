import { CalculationSource } from "./calculation-source.type";
import { Container } from "./container.type";

export type Solution = {
    container: Container;
    calculated: string;
    description: string | null;
    calculationSource: CalculationSource;
}