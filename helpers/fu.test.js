const fu = require('./fu')

// test('fu must return summ', () => {
//     expect(fu(3, 5)).toBe(8);
// });

// test('fu must work without arguments', () => {
//     expect(fu()).toBeNull();
// });

describe('test fu', () => {
    test('fu must return summ', () => {
        expect(fu(3, 5)).toBe(8);
    });

    test('fu must work without arguments', () => {
        expect(fu()).toBeNull();
    });
});