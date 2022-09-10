import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { IGood } from "./interfaces/i-good.interface";
import { ISolution } from "./interfaces/i-solution.interface";

export interface ISolver {
    solve(): Promise<ISolution | undefined>;
}
