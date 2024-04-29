import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';

@Component({
	selector: 'app-comma-separated-list',
	templateUrl: './comma-separated-list.component.html',
	styleUrls: ['./comma-separated-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommaSeparatedListComponent implements OnChanges {
	@Input() public items?: string |{ item: string, tagClassList?: string }[];
	@Input() public tagClassList?: string;
	@Input() public noItemsText = '';

	public representation = signal<{ item: string, tagClassList?: string }[]>([]);

	constructor(private _changeDetectorRef: ChangeDetectorRef) { }

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['items']) {
			const updatedItems = changes['items'].currentValue ?? '';
			if (typeof updatedItems === 'string') {
				this._initAlphanumericItems(updatedItems);
			}
			else this.representation.set(updatedItems);

		}

		if (changes['noItemsText']) {
			this._changeDetectorRef.markForCheck();
		}
	}

	private _initAlphanumericItems(items: string) {
		const value = items.trim().split(',');
		this.representation.set(value.map(item => ({ item, tagClassList: this.tagClassList })));
	}
}
