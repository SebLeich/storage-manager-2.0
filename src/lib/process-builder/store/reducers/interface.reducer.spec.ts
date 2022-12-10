import * as fromReducer from './interface.reducer';

describe('InterfaceReducer', () => {

    const reducer = fromReducer.reducer;

    it('should create reducer', () => {
        expect(reducer).toBeTruthy();
    })

});