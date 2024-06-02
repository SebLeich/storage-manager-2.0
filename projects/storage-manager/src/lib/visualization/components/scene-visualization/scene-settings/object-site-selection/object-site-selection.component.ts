import { ObjectSite } from '@/lib/storage-manager/types/object-site.type';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input } from '@angular/core';

@Component({
    selector: 'app-object-site-selection',
    templateUrl: './object-site-selection.component.html',
    styleUrl: './object-site-selection.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectSiteSelectionComponent {
    @Output() public objectSitesChanged = new EventEmitter<ObjectSite[]>();

    public label = input<string | null>(null);
    public mode = input<'single' | 'multiple'>('single');
    public objectSites = input<ObjectSite[]>([]);
    public sites = input<ObjectSite[]>(['bottom', 'top', 'left', 'right', 'front', 'rear']);

    public activeSites = computed(() => {
        const objectSites = this.objectSites(),
            sites = this.sites();

        return sites.reduce(
            (acc, site) => {
                acc[site] = objectSites.includes(site);
                return acc;
            },
            {} as Record<string, boolean>
        );
    });

    public clearSelection(): void {
        this.objectSitesChanged.emit([]);
    }

    public toggleSite(site: ObjectSite): void {
        const objectSites = this.objectSites(),
            index = objectSites.indexOf(site);

        if (index === -1) this.objectSitesChanged.emit([...objectSites, site]);
        else {
            this.objectSitesChanged.emit([...objectSites.slice(0, index), ...objectSites.slice(index + 1)]);
        }
    }
}
