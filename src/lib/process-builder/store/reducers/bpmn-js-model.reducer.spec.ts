import * as fromReducer from './param.reducer';

describe('BPMNJSModelReducer', () => {

    const reducer = fromReducer.reducer;

    it('should create reducer', () => {
        expect(reducer).toBeTruthy();
    })

});
