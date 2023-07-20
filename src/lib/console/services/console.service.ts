import { Injectable, Injector, signal } from '@angular/core';
import { IConsoleMessage } from '../interfaces/console-message.interface';
import { v4 as generateGuid } from 'uuid';
import { toObservable } from '@angular/core/rxjs-interop';
import { ISink } from '@/lib/shared/interfaces/sink.interface';
import { LogLevel } from '@/lib/shared/types/log-level.type';
import { shareReplay } from 'rxjs';

@Injectable()
export class ConsoleService implements ISink {
  public allConsoleOutputs = signal<IConsoleMessage[]>([]);
  public allConsoleOutputs$ = toObservable(this.allConsoleOutputs, { injector: this._injector }).pipe(shareReplay(1));

  constructor(private _injector: Injector){}

  public log(...messages: (string | { message: string, level: LogLevel } | IConsoleMessage)[]) {
    for (let message of messages) {
      if (typeof message === 'string') {
        message = {
          id: generateGuid(),
          level: 'info',
          message: message,
          timeStamp: new Date()
        } as IConsoleMessage;
      }

      this.allConsoleOutputs.update(messages => ([...messages, {
        ...message as IConsoleMessage,
        id: (message as IConsoleMessage).id ?? generateGuid(),
        timeStamp: (message as IConsoleMessage).timeStamp ?? new Date()
      }]));
    }
  }

  public logErrors(...messages: (string | IConsoleMessage)[]) {
    for (let message of messages) {
      if (typeof message === 'string') {
        message = {
          id: generateGuid(),
          message: message,
          timeStamp: new Date()
        } as IConsoleMessage;
      }

      this.allConsoleOutputs.update(messages => ([...messages, {
        ...message as IConsoleMessage,
        level: 'error'
      } as IConsoleMessage]));
    }
  }

  public logInformations(...messages: (string | IConsoleMessage)[]) {
    for (let message of messages) {
      if (typeof message === 'string') {
        message = {
          id: generateGuid(),
          message: message,
          timeStamp: new Date()
        } as IConsoleMessage;
      }

      this.allConsoleOutputs.update(messages => ([...messages, {
        ...message as IConsoleMessage,
        level: 'info'
      } as IConsoleMessage]));
    }
  }

  public logSuccess(...messages: (string | IConsoleMessage)[]) {
    for (let message of messages) {
      if (typeof message === 'string') {
        message = {
          id: generateGuid(),
          message: message,
          timeStamp: new Date
        } as IConsoleMessage;
      }

      this.allConsoleOutputs.update(messages => ([...messages, {
        ...message as IConsoleMessage,
        level: 'success'
      } as IConsoleMessage]));
    }
  }

  public logWarnings(...messages: (string | IConsoleMessage)[]) {
    for (let message of messages) {
      if (typeof message === 'string') {
        message = {
          id: generateGuid(),
          message: message,
          timeStamp: new Date()
        } as IConsoleMessage;
      }

      this.allConsoleOutputs.update(messages => ([...messages, {
        ...message as IConsoleMessage,
        level: 'warning'
      } as IConsoleMessage]));
    }
  }
}
