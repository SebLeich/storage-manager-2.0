export default {
    'const': { type: 'variable' },
    'injector': { type: 'variable', apply: 'injector' },
    'main': { type: 'function', apply: 'async () => {\n  // your code\n}\n', hint: 'async' },
    'let': { type: 'variable' },
    'parseInt()': { type: 'function' },
    'var': { type: 'variable' },
};