import * as fromReducer from './i-param.reducer';

describe('ParamReducer', () => {

    const reducer = fromReducer.reducer;

    it('should create reducer', () => {
        expect(reducer).toBeTruthy();
    })

});