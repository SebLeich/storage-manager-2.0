import { PrettyVolumePipe } from './pretty-volume.pipe';
import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';

describe('PrettyVolumePipe', () => {

    let spectator: SpectatorPipe<PrettyVolumePipe>;

    const createPipe = createPipeFactory({
        pipe: PrettyVolumePipe
    });

    [
        { volume: 10000, prettify: false, unit: 'mm', expectation: '10000 mm', decimalDigits: 0, hideDigitsWhenZero: false },
        { volume: 10000, prettify: false, unit: 'mm', expectation: '10000 mm', decimalDigits: 1, hideDigitsWhenZero: false },
        { volume: 10000, prettify: false, unit: 'mm', expectation: '10000 mm', decimalDigits: 2, hideDigitsWhenZero: false },
        { volume: 10000, prettify: true, unit: 'mm', expectation: '10 cm', decimalDigits: 0, hideDigitsWhenZero: false },
        { volume: 10000, prettify: true, unit: 'mm', expectation: '10,0 cm', decimalDigits: 1, hideDigitsWhenZero: false },
        { volume: 10000, prettify: true, unit: 'mm', expectation: '10,00 cm', decimalDigits: 2, hideDigitsWhenZero: false },
        { volume: 10000, prettify: true, unit: 'mm', expectation: '10 cm', decimalDigits: 2, hideDigitsWhenZero: true },
        { volume: 10001, prettify: true, unit: 'mm', expectation: '10,001 cm', decimalDigits: 3, hideDigitsWhenZero: true },
        { volume: 1000000000, prettify: true, unit: 'mm', expectation: '1 m', decimalDigits: 2, hideDigitsWhenZero: true },
        { volume: 1000000000, prettify: false, unit: 'mm', expectation: '1000000000 mm', decimalDigits: 2, hideDigitsWhenZero: true },
        { volume: 1000000001, prettify: true, unit: 'mm', expectation: '1,000000001 m', decimalDigits: 20, hideDigitsWhenZero: true },
    ].forEach(({ volume, unit, prettify, decimalDigits, hideDigitsWhenZero, expectation }) => {

        it(`should display volume representation ${volume} ${unit}, ${prettify ? 'prettified' : 'not prettified'}, ${decimalDigits} decimal digits, ${hideDigitsWhenZero ? 'hide decimal digits when zero' : 'show decimal digits even if zero'}`, async () => {
            createPipe(`{{ ${volume} | prettyVolume:${unit}:${prettify}:${decimalDigits} }}`);
            expect(spectator.element).toHaveText(expectation);
        });

    });

});
