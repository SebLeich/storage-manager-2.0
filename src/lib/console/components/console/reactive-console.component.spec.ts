import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ConsoleComponent } from "./reactive-console.component";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ConsoleService } from "../../services/console.service";
import { IConsoleMessage } from "../../interfaces/console-message.interface";
import { TestScheduler } from "rxjs/testing";
import { firstValueFrom } from "rxjs";
import { ConsoleModule } from "../../console.module";

describe('ReactiveConsoleComponent', () => {
    let fixture: ComponentFixture<ConsoleComponent>,
        component: ConsoleComponent,
        debugElement: DebugElement,
        testScheduler: TestScheduler;

    const seedMessages = [
        { id: '1', message: 'output', level: 'info' } as IConsoleMessage,
        { id: '2', message: 'other message', level: 'error' } as IConsoleMessage,
        { id: '3', message: 'my message', level: 'success' } as IConsoleMessage
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ConsoleModule],
        });

        fixture = TestBed.createComponent(ConsoleComponent);
        component = fixture.componentRef.instance;
        debugElement = fixture.debugElement;
        testScheduler = new TestScheduler((actual, expected) => {
            return expect(actual).toEqual(expected);
        })
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('[signal] should hide messages with identifier: 1, 3', () => {
        TestBed.inject(ConsoleService).log(...seedMessages);

        let messages = component.messages();
        // initially, all messages should be displayed
        expect(messages.map(message => message.hidden).some(isHidden => isHidden)).toBeFalsy();

        // toggle messages 1 and 3
        component.toggleMessage('1');
        component.toggleMessage('3');
        messages = component.messages();

        // after toggling, the messages 1 and 3 should be hidden
        expect(messages.find(message => message.id === '1')?.hidden ?? false).toBeTrue();
        expect(messages.find(message => message.id === '2')?.hidden ?? true).toBeFalse();
        expect(messages.find(message => message.id === '3')?.hidden ?? false).toBeTrue();
    });

    it('[observable] should correctly identify newly logged messages', async () => {
        let hasMessages = await firstValueFrom(component.hasMessages$);

        // initially, no messages should be contained
        expect(hasMessages).toBeFalse();

        TestBed.inject(ConsoleService).log(...seedMessages);
        hasMessages = await firstValueFrom(component.hasMessages$);
        expect(hasMessages).toBeTrue();
        
        testScheduler.run(({ expectObservable }) => {
            expectObservable(TestBed.inject(ConsoleService).allConsoleOutputs$).toBe('a', {
                a: seedMessages.map(message => ({
                    ...message,
                    hidden: message.id === '1' || message.id === '3'
                }))
            });
        });
    });
});