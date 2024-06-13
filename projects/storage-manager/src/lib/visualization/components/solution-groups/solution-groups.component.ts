import { Group } from '@/lib/storage-manager/types/group.type';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';

@Component({
    selector: 'app-solution-groups',
    templateUrl: './solution-groups.component.html',
    styleUrl: './solution-groups.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionGroupsComponent {
    @Output() public groupColorChanged = new EventEmitter<Group>();

    public groups = input<Group[]>([]);

    public updateGroupColor(group: Group, color: string) {
        this.groupColorChanged.emit({ ...group, color });
    }
}
