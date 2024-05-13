import { Store } from '@ngrx/store';
import { PrettyLengthPipe } from './pretty-length.pipe';
import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';

describe('PrettyLengthPipe', () => {

    let spectator: SpectatorPipe<PrettyLengthPipe>;

    const createPipe = createPipeFactory({
        pipe: PrettyLengthPipe,
        providers: [
            { provide: Store, useValue: {} }
        ]
    });

    [
        { value: null, expectation: 'no entries' },
        { value: undefined, expectation: 'no entries' },
    ].forEach(async ({ value, expectation }) => {

        it(`should return expected output for value '${value}: ${expectation}'`, async () => {
            createPipe(`{{ ${value} | prettyLength | async }}`);
            await spectator.fixture.whenStable();

            expect(spectator.element).toHaveText(expectation);
        })

    });

});
