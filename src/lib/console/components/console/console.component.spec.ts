import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleComponent } from './console.component';
import { ConsoleModule } from '../../console.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConsoleService } from '../../services/console.service';
import { signal } from '@angular/core';
import { IConsoleMessage } from '../../interfaces/console-message.interface';
import { LogLevel } from '@/lib/shared/types/log-level.type';

describe('ConsoleComponent', () => {
  let component: ConsoleComponent;
  let fixture: ComponentFixture<ConsoleComponent>;
  const consoleService = {
    allConsoleOutputs: signal([
      { id: '1', message: 'output', level: 'info' },
      { id: '2', message: 'other message', level: 'error' },
      { id: '3', message: 'my message', level: 'success' }
    ] as IConsoleMessage[])
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConsoleModule, NoopAnimationsModule],
      providers: [{ provide: ConsoleService, useValue: consoleService }]
    });
    fixture = TestBed.createComponent(ConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  [
    { search: 'output', expectedMessages: ['1'] },
    { search: '   output   ', expectedMessages: ['1'] },
    { search: 'OUTPUT', expectedMessages: ['1'] },
    { search: 'other', expectedMessages: ['2'] },
    { search: 'output other', expectedMessages: ['1', '2'] },
    { search: 'mysearch', expectedMessages: [] },
    { search: '', expectedMessages: ['1', '2', '3'] },
    { search: ' ', expectedMessages: ['1', '2', '3'] },
    { search: 'MeSSAge', expectedMessages: ['2', '3'] },
    { search: 'h p g', expectedMessages: ['1', '2', '3'] },
  ].forEach((testCase) => {

    it(`should apply the search filter correctly: '${testCase.search}'`, () => {
      component.formGroup.controls.search.setValue(testCase.search);

      const filteredMessages = component.messages();
      expect(filteredMessages.length).toBe(testCase.expectedMessages.length);
      expect(testCase.expectedMessages.every(messageId => filteredMessages.findIndex(message => message.id === messageId) > -1)).toBeTrue();
    });
  });

  [
    { shouldFilterInfos: true, shouldFilterErrors: true, shouldDisplaySuccess: true, expectedMessages: ['1', '2', '3'] },
    { shouldFilterInfos: false, shouldFilterErrors: true, shouldDisplaySuccess: true, expectedMessages: ['2', '3'] },
    { shouldFilterInfos: true, shouldFilterErrors: true, shouldDisplaySuccess: false, expectedMessages: ['1', '2'] },
    { shouldFilterInfos: false, shouldFilterErrors: true, shouldDisplaySuccess: false, expectedMessages: ['2'] },
    { shouldFilterInfos: false, shouldFilterErrors: false, shouldDisplaySuccess: true, expectedMessages: ['3'] },
    { shouldFilterInfos: true, shouldFilterErrors: false, shouldDisplaySuccess: false, expectedMessages: ['1'] },
    { shouldFilterInfos: true, shouldFilterErrors: false, shouldDisplaySuccess: true, expectedMessages: ['1', '3'] },
    { shouldFilterInfos: false, shouldFilterErrors: false, shouldDisplaySuccess: false, expectedMessages: ['1', '2', '3'] }
  ].forEach((testCase) => {
    let levels: LogLevel[] | undefined = [];
    if (testCase.shouldFilterInfos) {
      levels.push('info');
    }
    if (testCase.shouldFilterErrors) {
      levels.push('error');
    }
    if (testCase.shouldDisplaySuccess) {
      levels.push('success');
    }
    if (levels.length === 0) {
      levels = undefined;
    }

    it(`should filter infos: ${testCase.shouldFilterInfos}, errors: ${testCase.shouldFilterErrors}, success: ${testCase.shouldDisplaySuccess}`, () => {
      component.levels = levels;

      const filteredMessages = component.messages();
      expect(filteredMessages.length).toBe(testCase.expectedMessages.length);
      expect(testCase.expectedMessages.every(messageId => filteredMessages.findIndex(message => message.id === messageId) > -1)).toBeTrue();
    });
  });
});
