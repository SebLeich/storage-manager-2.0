import { MethodEvaluationStatus } from "../process-builder/globals/method-evaluation-status";
import { CodemirrorRepository } from "./codemirror.repository";

describe('CodemirrorRepository', () => {

    const values = [
        { value: 1, definite: true },
        { value: '"testValue"', definite: true },
        { value: true, definite: true },
        { value: false, definite: true },
        { value: 5, definite: true },
        { value: 5.012, definite: true },
        { value: null, definite: true },
        { value: undefined, definite: true },
        { value: { key: 'value' }, definite: true },
        { value: ['test'], definite: false },
        { value: [{ key: 'value' }], definite: false }
    ];

    it(`should detect missing main method`, () => {
        const evaluationResult = CodemirrorRepository.evaluateCustomMethod(undefined, ['return 1;']);
        expect(evaluationResult.injectorNavigationPath).toBeFalsy();
        expect(evaluationResult.status).toBe(MethodEvaluationStatus.NoMainMethodFound);
    });

    values.forEach(({ value, definite }) => {

        const preview = typeof value === 'object' ? JSON.stringify(value) : value;

        it(`should correctly evaulate value ${preview}`, () => {
            const evaluationResult = CodemirrorRepository.evaluateCustomMethod(undefined, [
                'async (injector) => {',
                `return ${preview};`,
                '}',
            ]);
            expect(evaluationResult.detectedValue).toEqual(value);
            expect(evaluationResult.status).toBe(MethodEvaluationStatus.ReturnValueFound);
            expect(evaluationResult.valueIsDefinite).toBe(definite);
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
            expect(evaluationResult.valueIsDefinite).toBe(false);
        });

    });

});