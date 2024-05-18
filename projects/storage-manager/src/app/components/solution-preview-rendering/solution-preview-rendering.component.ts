import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISolution } from '@smgr/interfaces';
import getContainerPositionSharedMethods from 'src/app/methods/get-container-position.shared-methods';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import * as ThreeJS from 'three';
import { SolutionPreviewStatus } from 'src/app/enumerations/solution-preview-status.enumeration';
import { filter, map, switchMap, take } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { showAnimation } from 'src/lib/shared/animations/show';
import { announceSolutionPreview, selectGroups, selectSolutionPreview, upsertSolutionPreview } from '@smgr/store';
import { VisualizationService } from '@/lib/visualization/services/visualization/visualization.service';

@Component({
  selector: 'app-solution-preview-rendering',
  templateUrl: './solution-preview-rendering.component.html',
  styleUrls: ['./solution-preview-rendering.component.scss'],
  animations: [showAnimation]
})
export class SolutionPreviewRenderingComponent implements OnChanges, OnInit {

  @Input() public solution!: ISolution;
  @Input() public backgroundColor: string = '#ffffff';

  public preview$ = this._store.select(selectSolutionPreview(() => this.solution.id));
  public previewStatus$ = this.preview$.pipe(
    map(
      (preview) => {
        if (preview) {
          return preview.status;
        }
        return SolutionPreviewStatus.NotGenerated;
      }
    )
  );
  public previewRendering$ = this.previewStatus$.pipe(map(status => status === SolutionPreviewStatus.Generating));
  public previewRenderingSucceeded$ = this.previewStatus$.pipe(map(status => status === SolutionPreviewStatus.Succeeded));
  public previewRenderingInitiallySucceeded$ = this.previewRenderingSucceeded$.pipe(filter(succeeded => !!succeeded), take(1));
  public previewImage$ = this.previewRenderingSucceeded$.pipe(
    filter(succeeded => succeeded),
    switchMap(() => this.preview$),
    map(
      preview => {
        return this._domSanitizer.bypassSecurityTrustResourceUrl(preview!.dataURL!);
      }
    )
  );

  public scene = new ThreeJS.Scene();

  constructor(private _store: Store, private _domSanitizer: DomSanitizer) { }

  public ngOnChanges(): void {
    this._updateScene();
  }

  public ngOnInit(): void {
    this._updateScene();
  }

  public sceneRendered(args: { canvas: HTMLCanvasElement }) {
    const strMime = "image/jpeg";
    const imgData = args.canvas.toDataURL(strMime);
    this._store.dispatch(upsertSolutionPreview({
      solutionPreview: {
        status: SolutionPreviewStatus.Succeeded,
        dataURL: imgData,
        solutionId: this.solution!.id
      }
    }));
  }

  private async _updateScene() {
    this._store.dispatch(announceSolutionPreview({ solutionId: this.solution.id }));
    this.scene.background = new ThreeJS.Color(this.backgroundColor);
    const containerPosition = getContainerPositionSharedMethods(this.solution.container!);
    const containerResult = VisualizationService.generateOutlinedBoxMesh(containerPosition, 'container');
    this.scene.add(containerResult.edges);
    const groups = await selectSnapshot(this._store.select(selectGroups));
    for (let good of this.solution.container!.goods) {
      const group = groups.find((group) => group.id === good.group);
      const goodResult = VisualizationService.generateFilledBoxMesh(getContainerPositionSharedMethods(good), group?.color ?? '#ffffff', 'good', containerPosition);
      this.scene.add(goodResult.edges, goodResult.mesh);
    }
  }

}
