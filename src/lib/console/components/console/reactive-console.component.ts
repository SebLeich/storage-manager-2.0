import { ChangeDetectionStrategy, Component, computed, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup } from "@angular/forms";
import { ConsoleService } from "../../services/console.service";
import { IConsoleMessage } from "../../interfaces/console-message.interface";
import { map, shareReplay, startWith } from "rxjs";

@Component({
    selector: 'app-console',
    templateUrl: 'reactive-console.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleComponent {
    public hasMessages$ = this.consoleService
        .allConsoleOutputs$
        .pipe(map((messages) => messages.length > 0), startWith(false), shareReplay(1));

    public messages = computed(() => {
        const hiddenMessages = this._hiddenMessages();
        return this.consoleService.allConsoleOutputs()
            .filter(message => this._messagePassesFilters(message, this._search()))
            .map(message => ({ ...message, hidden: hiddenMessages.indexOf(message.id) > -1 }))
            .reverse();
    });

    public formGroup = new FormGroup({
        search: new FormControl<string>('')
    });

    private _hiddenMessages = signal<string[]>([]);
    private _search = toSignal(this.formGroup.controls.search.valueChanges, { initialValue: '' });

    constructor(private consoleService: ConsoleService) { }

    public toggleMessage(messageId: string) {
        const index = this._hiddenMessages().indexOf(messageId);
        this._hiddenMessages.update(currentValue => index > -1 ? [...currentValue.slice(0, index), ...currentValue.slice(index + 1)] : [...currentValue, messageId]);
    }

    private _messagePassesFilters(message: IConsoleMessage, search: string | null | undefined): boolean {
        if (search != null) {
            const searchArray = search.toLocaleLowerCase().split(' ').filter(term => term ? true : false),
                lowerCaseMessage = message.message.toLocaleLowerCase();

            if (searchArray.length > 0 && searchArray.every(term => lowerCaseMessage.indexOf(term) === -1)) {
                return false;
            }
        }

        return true;
    }
}

