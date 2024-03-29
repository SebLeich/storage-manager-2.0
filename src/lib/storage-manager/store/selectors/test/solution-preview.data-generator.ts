import { ISolutionPreview } from "@smgr/interfaces";
import { SolutionPreviewStatus } from "src/app/enumerations/solution-preview-status.enumeration";
import { v4 as generateGuid } from "uuid";

export class SolutionPreviewDataGenerator {

    public generateSolutionPreviews(counter: number) {

        return Array.from({ length: counter }).map((_, index: number) => {

            return {
                dataURL: 'random solution preview',
                solutionId: generateGuid(),
                status: this.randomSolutionPreviewStatus()
            } as ISolutionPreview;

        });

    }

    public randomSolutionPreviewStatus(){
        const solutionPreviewStatus = [
            SolutionPreviewStatus.Error,
            SolutionPreviewStatus.Generating,
            SolutionPreviewStatus.NotGenerated,
            SolutionPreviewStatus.Succeeded
        ];
        return solutionPreviewStatus[Math.floor(Math.random() * 3)];
    }

}