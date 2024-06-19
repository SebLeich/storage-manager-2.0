import { Group } from '@/lib/storage-manager/types/group.type';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input } from '@angular/core';

@Component({
    selector: 'app-solution-groups',
    templateUrl: './solution-groups.component.html',
    styleUrl: './solution-groups.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionGroupsComponent {
    @Output() public groupColorChanged = new EventEmitter<Group>();
    @Output() public toggleGroupVisibility = new EventEmitter<string>();

    public groups = input<Group[]>([]);
    public hiddenGroups = input<string[]>([]);

    public groupWrappers = computed(() => {
        const groups = this.groups(),
            hiddenGroups = this.hiddenGroups();

        return groups.map(group => ({ group, hidden: hiddenGroups.includes(group.id) }));
    });

    public updateGroupColor(group: Group, color: string) {
        this.groupColorChanged.emit({ ...group, color });
    }

    public visibilityIconClicked(group: Group, event: Event): void {
        event.stopPropagation();
        this.toggleGroupVisibility.emit(group.id);
    }
}
