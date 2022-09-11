import * as fromReducer from './i-interface.reducer';

describe('InterfaceReducer', () => {

    const reducer = fromReducer.reducer;

    it('should create reducer', () => {
        expect(reducer).toBeTruthy();
    })

});