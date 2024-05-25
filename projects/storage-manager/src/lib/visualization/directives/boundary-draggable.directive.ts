import { CdkDrag } from '@angular/cdk/drag-drop';
import { DestroyRef, Directive, ElementRef, HostListener, inject, input } from '@angular/core';
import { outputFromObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, combineLatest, debounceTime, distinctUntilChanged, filter, map } from 'rxjs';

@Directive({
    selector: '[appBoundaryDraggable]'
})
export class BoundaryDraggableDirective extends CdkDrag {
    public draggedSubj = new Subject<any>();
    public droppedSubj = new Subject<any>();

    public dropped$ = this.droppedSubj
        .pipe(
            debounceTime(10),
            map(() => this.isOnTopEdge() ? 'top' : this.isOnBottomEdge() ? 'bottom' : this.isOnLeftEdge() ? 'left' : this.isOnRightEdge() ? 'right' : 'none'),
            distinctUntilChanged()
        );

    public debouncedDragged$ = this.draggedSubj.pipe(debounceTime(5));
    public onTopEdge$ = this.debouncedDragged$.pipe(map(() => this.isOnTopEdge()), distinctUntilChanged());
    public onBottomEdge$ = this.debouncedDragged$.pipe(map(() => this.isOnBottomEdge()), distinctUntilChanged());
    public onLeftEdge$ = this.debouncedDragged$.pipe(map(() => this.isOnLeftEdge()), distinctUntilChanged());
    public onRightEdge$ = this.draggedSubj.pipe(map(() => this.isOnRightEdge()), distinctUntilChanged());
    public stickToEdge$ = combineLatest([this.onTopEdge$, this.onBottomEdge$, this.onLeftEdge$, this.onRightEdge$]).pipe(
        map(([top, bottom, left, right]) => top ? 'top' : bottom ? 'bottom' : left ? 'left' : right ? 'right' : 'none'),
        distinctUntilChanged()
    );

    public autoRenderEdges = input<boolean>(false);
    public calculationRoundingTolerance = input<number>(5);

    public onTouchTopEdge = outputFromObservable(this.onTopEdge$);
    public onTouchBottomEdge = outputFromObservable(this.onBottomEdge$);
    public onTouchLeftEdge = outputFromObservable(this.onLeftEdge$);
    public onTouchRightEdge = outputFromObservable(this.onRightEdge$);
    public onTouchEdge = outputFromObservable(this.stickToEdge$);
    public onDroppedEdge = outputFromObservable(this.dropped$);

    @HostListener('cdkDragMoved', ['$event'])
    public onDrag = (evt: any) => this.draggedSubj.next(evt);

    @HostListener('cdkDragReleased', ['$event'])
    public onDrop = (evt: any) => this.droppedSubj.next(evt);

    private _1 = this.stickToEdge$
        .pipe(takeUntilDestroyed(inject(DestroyRef)), filter(() => this.autoRenderEdges()))
        .subscribe((edge) => {
            this.clearAllEdges();
            if (edge === 'none') {
                return;
            }

            this.renderEdge(edge);
        });

    private _2 = this.dropped$
        .pipe(takeUntilDestroyed(inject(DestroyRef)), filter(() => this.autoRenderEdges()))
        .subscribe(() => this.clearAllEdges());

    public isOnBottomEdge(): boolean {
        const { y } = this.getFreeDragPosition(),
            top = this.element.nativeElement.offsetTop,
            height = this.element.nativeElement.clientHeight,
            boundaryParentHeight = this.getBoundaryElement().clientHeight;

        return Math.abs(top + y + height - boundaryParentHeight) < this.calculationRoundingTolerance();
    }

    public isOnLeftEdge(): boolean {
        const { x } = this.getFreeDragPosition(),
            left = this.element.nativeElement.offsetLeft;

        return Math.abs(left + x) < this.calculationRoundingTolerance();
    }

    public isOnRightEdge(): boolean {
        const { x } = this.getFreeDragPosition(),
            left = this.element.nativeElement.offsetLeft,
            width = this.element.nativeElement.clientWidth,
            boundaryParentWidth = this.getBoundaryElement().clientWidth;

        return Math.abs(left + x + width - boundaryParentWidth) < this.calculationRoundingTolerance();
    }

    public isOnTopEdge(): boolean {
        const { y } = this.getFreeDragPosition(),
            top = this.element.nativeElement.offsetTop;

        return Math.abs(top + y) < this.calculationRoundingTolerance();
    }

    public getBoundaryElement(): HTMLElement {
        return typeof this.boundaryElement === 'string' ?
            this.getRootElement().closest(this.boundaryElement)
            : (this.boundaryElement as ElementRef).nativeElement ? (this.boundaryElement as ElementRef).nativeElement : this.boundaryElement;
    }

    public renderEdge(direction: 'top' | 'right' | 'bottom' | 'left'): void {
        const edge = document.createElement('div');
        edge.classList.add('boundary-draggable-edge');
        edge.style.position = 'absolute';
        edge.style.top = direction === 'top' ? '2px' : direction === 'bottom' ? 'calc(100% - 6px)' : '1rem';
        edge.style.left = direction === 'left' ? '2px' : direction === 'right' ? 'calc(100% - 6px)' : '1rem';
        edge.style.right = direction === 'right' ? '2px' : 'auto';
        edge.style.height = direction === 'top' || direction === 'bottom' ? '4px' : 'calc(100% - 2rem)';
        edge.style.width = direction === 'left' || direction === 'right' ? '4px' : 'calc(100% - 2rem)';
        edge.style.borderRadius = '2px';
        edge.style.backgroundColor = '#4b71c7';

        this.getBoundaryElement().appendChild(edge);
    }

    public clearAllEdges(): void {
        const edges = this.getBoundaryElement().querySelectorAll('.boundary-draggable-edge');
        edges.forEach((edge) => edge.remove());
    }
}
