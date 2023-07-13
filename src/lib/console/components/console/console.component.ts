import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { ConsoleService } from '../../services/console.service';
import { IConsoleMessage } from '../../interfaces/console-message.interface';
import { LogLevel } from '@/lib/shared/types/log-level.type';
import { showListAnimation } from '@/lib/shared/animations/show-list';
import { FormControl, FormGroup } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
  animations: [showListAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleComponent {
  @Input() public set channels(channels: string | string[] | undefined | null) { this._setChannelFilter(channels) }
  @Input() public set endDate(endDate: Date | undefined | null) { this._setEndDate(endDate) }
  @Input() public set startDate(startDate: Date | undefined | null) { this._setStartDate(startDate) }
  @Input() public set levels(levels: LogLevel|LogLevel[]|undefined|null) { this._setLevelsFilter(levels) }
  @Input() public animationDisabled = true;

  public messages = computed(() => {
    const expandedMessages = this._expandedMessages();
    return this.consoleService.allConsoleOutputs()
      .filter(message => this._messagePassesFilters(message, this._channels(), this._endDate(), this._startDate(), this._levels(), this._search()))
      .map(message => ({ ...message, expanded: expandedMessages.indexOf(message.id) > -1 }))
      .reverse();
  });
  public infosEnabled = computed(() => {
    const levels = this._levels();
    return Array.isArray(levels) ? levels.indexOf('info') > -1 : true;
  });

  public formGroup = new FormGroup({
    search: new FormControl<string>('')
  });

  private _expandedMessages = signal<string[]>([]);
  private _channels = signal<string[] | undefined>(undefined);
  private _levels = signal<LogLevel[] | undefined>(undefined);
  private _endDate = signal<Date | undefined>(undefined);
  private _startDate = signal<Date | undefined>(new Date());
  private _search = toSignal(this.formGroup.controls.search.valueChanges, { initialValue: '' });

  constructor(public consoleService: ConsoleService) { }

  public toggleInfoLevel() {
    const levels = this._levels() ?? ['error', 'info', 'prioritized', 'success', 'warning'];
    const index = levels.indexOf('info');
    this._levels.set(index > -1 ? [...levels.slice(0, index), ...levels.slice(index + 1)] : [...levels, 'info']);
  }

  public toggleMessage(messageId: string) {
    const index = this._expandedMessages().indexOf(messageId);
    this._expandedMessages.update(currentValue => index > -1 ? [...currentValue.slice(0, index), ...currentValue.slice(index + 1)] : [...currentValue, messageId]);
  }

  private _messagePassesFilters(message: IConsoleMessage, channelFilter: undefined | string[], endDate: undefined | Date, startDate: undefined | Date, levelFilter: LogLevel[] | undefined, search: string | null | undefined): boolean {
    if (channelFilter != null && channelFilter.every(channelFilter => message.channel !== channelFilter)) {
      return false;
    }

    if (endDate && message.timeStamp > endDate) {
      return false;
    }

    if (startDate && message.timeStamp < startDate) {
      return false;
    }

    if (levelFilter != null && levelFilter.every(levelFilter => message.level !== levelFilter)) {
      return false;
    }

    if (search != null) {
      const searchArray = search.toLocaleLowerCase().split(' ').filter(term => term ? true : false),
        lowerCaseMessage = message.message.toLocaleLowerCase();

      if (searchArray.length > 0 && searchArray.every(term => lowerCaseMessage.indexOf(term) === -1)) {
        return false;
      }
    }

    return true;
  }

  private _setChannelFilter(channels: string | string[] | undefined | null) {
    let filteredChannels: undefined | string[] = undefined;
    if (channels != null) {
      filteredChannels = typeof channels === 'string' ? filteredChannels = [channels] : channels;
    }
    this._channels.set(filteredChannels);
  }

  private _setLevelsFilter(levels: LogLevel | LogLevel[] | undefined | null) {
    let filteredLevels: undefined | LogLevel[] = undefined;
    if (levels != null) {
      filteredLevels = typeof levels === 'string' ? filteredLevels = [levels] : levels;
    }
    this._levels.set(filteredLevels);
  }

  private _setEndDate = (endDate: Date | undefined | null) => this._endDate.set(endDate ?? undefined);
  private _setStartDate = (startDate: Date | undefined | null) => this._startDate.set(startDate ?? undefined);
}
