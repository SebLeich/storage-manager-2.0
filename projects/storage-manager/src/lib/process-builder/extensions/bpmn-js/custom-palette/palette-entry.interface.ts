import { BPMNIconFont } from "../custom-context-pad/bpmn-io-icon.type";
import { ContextPadEntryGroup } from "../custom-context-pad/context-pad-entry-group.type";

export interface IPaletteEntry {
    action: (event: PointerEvent) => void;
    className: BPMNIconFont;
    group: ContextPadEntryGroup;
    title: string;
}