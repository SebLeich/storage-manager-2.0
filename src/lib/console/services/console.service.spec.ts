import { TestBed } from '@angular/core/testing';

import { ConsoleService } from './console.service';
import { ConsoleModule } from '../console.module';
import { TestScheduler } from 'rxjs/testing';
import { IConsoleMessage } from '../interfaces/console-message.interface';

describe('ConsoleService', () => {
  let service: ConsoleService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConsoleModule]
    });
    service = TestBed.inject(ConsoleService);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    })
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly emit all messages', () => {
    const messages: IConsoleMessage[] = [{ id: '1', message: 'message1', level: 'info', timeStamp: new Date() }, { id: '2', message: 'message2', level: 'info', timeStamp: new Date() }];
    service.log(...messages);
    testScheduler.run(({ expectObservable }) => {
      expectObservable(service.allConsoleOutputs$).toBe('a', {
        a: messages
      });
    });
  });

  it('should correctly provide all messages', () => {
    const messages: IConsoleMessage[] = [{ id: '1', message: 'message1', level: 'info', timeStamp: new Date() }, { id: '2', message: 'message2', level: 'info', timeStamp: new Date() }];
    service.log(...messages);

    const receivedMessages = service.allConsoleOutputs();
    expect(receivedMessages).toEqual(messages);
  });
});
