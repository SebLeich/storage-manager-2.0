import { ISolution } from "../lib/storage-manager-store/interfaces/solution.interface";

export interface ISolver {
    solve(): Promise<ISolution | undefined>;
}
