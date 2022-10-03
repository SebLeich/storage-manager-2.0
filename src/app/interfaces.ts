import { ISolution } from "./interfaces/i-solution.interface";

export interface ISolver {
    solve(): Promise<ISolution | undefined>;
}
