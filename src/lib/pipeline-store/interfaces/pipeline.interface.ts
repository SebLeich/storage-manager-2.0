import { IIdentifiable } from "@/lib/storage-manager/interfaces";

interface IPipeline extends IIdentifiable {
    bpmnJsModelReference: string;
    name: string;
    solutionReference: string | null;
}
export default IPipeline;