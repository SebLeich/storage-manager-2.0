import { Injectable, Signal } from '@angular/core';
import { Subject, scan } from 'rxjs';
import { IConsoleMessage } from '../interfaces/console-message.interface';
import { v4 as generateGuid } from 'uuid';
import { toSignal } from '@angular/core/rxjs-interop';
import { ISink } from '@/lib/shared/interfaces/sink.interface';
import { LogLevel } from '@/lib/shared/types/log-level.type';

@Injectable()
export class ConsoleService implements ISink {
  private _consoleOutput$$ = new Subject<IConsoleMessage>();
  public consoleOutput$ = this._consoleOutput$$.asObservable();
  public allConsoleOutputs$ = this._consoleOutput$$.asObservable().pipe(
    scan(
      (accumulated: IConsoleMessage[], currentMessage: IConsoleMessage) => {
        accumulated.push(currentMessage);
        return accumulated;
      },
      [] as IConsoleMessage[]
    )
  );
  public allConsoleOutputs = toSignal(this.allConsoleOutputs$, { initialValue: [] }) as Signal<IConsoleMessage[]>;

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
      this._consoleOutput$$.next({
        ...message,
        id: (message as IConsoleMessage).id ?? generateGuid(),
        timeStamp: (message as IConsoleMessage).timeStamp ?? new Date()
      });
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
      this._consoleOutput$$.next({ ...message, level: 'error' });
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
      this._consoleOutput$$.next({ ...message, level: 'info' });
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
      this._consoleOutput$$.next({ ...message, level: 'success' });
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
      this._consoleOutput$$.next({ ...message, level: 'warning' });
    }
  }
}
