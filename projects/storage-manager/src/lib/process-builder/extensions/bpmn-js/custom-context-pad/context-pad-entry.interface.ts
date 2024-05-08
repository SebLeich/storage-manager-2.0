import { BPMNIconFont } from "./bpmn-io-icon.type";
import { ContextPadEntryGroup } from "./context-pad-entry-group.type";

export interface IContextPadEntry {
    group: ContextPadEntryGroup;
    className: BPMNIconFont;
    title: string;
    action: {
        click?: (event: any) => void;
    };
}