import { MethodEvaluationStatus } from "../process-builder/globals/method-evaluation-status";
import { CodemirrorRepository } from "./codemirror.repository";

describe('CodemirrorRepository', () => {

    const values = [1, '"testValue"', true, false, 5, 5.012, null, undefined, { key: 'value' }, ['test'], [{ key: 'value' }]];

    it(`should detect missing main method`, () => {
        const evaluationResult = CodemirrorRepository.evaluateCustomMethod(undefined, ['return 1;']);
        expect(evaluationResult.injectorNavigationPath).toBeFalsy();
        expect(evaluationResult.status).toBe(MethodEvaluationStatus.NoMainMethodFound);
    });

    values.forEach(value => {

        const preview = typeof value === 'object' ? JSON.stringify(value) : value;

        it(`should correctly evaulate value ${preview}`, () => {
            const evaluationResult = CodemirrorRepository.evaluateCustomMethod(undefined, [
                'async (injector) => {',
                `return ${preview};`,
                '}',
            ]);
            expect(evaluationResult.detectedValue).toEqual(value);
            expect(evaluationResult.status).toBe(MethodEvaluationStatus.ReturnValueFound);
        });

        it(`should correctly evaulate already declared variable with value ${preview}`, () => {
            const evaluationResult = CodemirrorRepository.evaluateCustomMethod(undefined, [
                'async (injector) => {',
                `const a = ${preview};`,
                'const b = a;',
                'const c = b',
                'return c;',
                '}',
            ]);
            expect(evaluationResult.detectedValue).toEqual(value);
            expect(evaluationResult.status).toBe(MethodEvaluationStatus.ReturnValueFound);
        });

    });

});