import * as fromReducer from './i-function.reducer';

describe('FunctionReducer', () => {

    const reducer = fromReducer.reducer;

    it('should create reducer', () => {
        expect(reducer).toBeTruthy();
    })

});