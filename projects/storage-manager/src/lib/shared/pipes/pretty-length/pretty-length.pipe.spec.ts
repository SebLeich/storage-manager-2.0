import { PrettyLengthPipe } from './pretty-length.pipe';
import { createPipeFactory } from '@ngneat/spectator';

describe('PrettyLengthPipe', () => {
    const createPipe = createPipeFactory({
        pipe: PrettyLengthPipe
    });

    [
        { length: 1000, unit: 'mm', expectation: '1,00 m' },
    ].forEach(({ length, unit, expectation }) => {

        it(`should display length representation ${length} ${unit} as ${expectation}`, async () => {
            const dom = `{{ ${length} | prettyLength:'${unit}' }}`;
            const spectator = createPipe(dom);
            
            expect(spectator.element).toHaveText(expectation);
        });

    });

});
