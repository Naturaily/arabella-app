import reducer from '../../reducers/authReducer';

describe('reducers', () => {
    describe('default', () => {
        it('SIGN_IN changes state appropriately', () => {
            expect(reducer({
                token: '',
                user: '',
                signInError: false,
                signOutError: false,
            }, {
                type: 'SIGN_IN',
                payload: {
                    credential: {
                        accessToken: '123',
                    },
                    additionalUserInfo: {
                        username: 'Test',
                    },
                },
            })).toEqual(
                JSON.parse(JSON.stringify({
                    token: '123',
                    user: 'Test',
                    signInError: false,
                    signOutError: false,
                })),
            );
        });
    });
    describe('default', () => {
        it('SIGN_IN_ERROR changes state appropriately', () => {
            expect(reducer({
                token: '',
                user: '',
                signInError: false,
                signOutError: false,
            }, {
                type: 'SIGN_IN_ERROR',
            })).toEqual(
                JSON.parse(JSON.stringify({
                    token: '',
                    user: '',
                    signInError: true,
                    signOutError: false,
                })),
            );
        });
    });
    describe('default', () => {
        it('SIGN_OUT changes state appropriately', () => {
            expect(reducer({
                token: '123',
                user: 'Test',
                signInError: false,
                signOutError: false,
            }, {
                type: 'SIGN_OUT',
            })).toEqual(
                JSON.parse(JSON.stringify({
                    token: '',
                    user: '',
                    signInError: false,
                    signOutError: false,
                })),
            );
        });
    });
    describe('default', () => {
        it('SIGN_OUT_ERROR changes state appropriately', () => {
            expect(reducer({
                token: '123',
                user: 'Test',
                signInError: false,
                signOutError: false,
            }, {
                type: 'SIGN_OUT_ERROR',
            })).toEqual(
                JSON.parse(JSON.stringify({
                    token: '123',
                    user: 'Test',
                    signInError: false,
                    signOutError: true,
                })),
            );
        });
    });
    describe('default', () => {
        it('inproper action doesn\'t change state', () => {
            expect(reducer({
                token: '',
                user: '',
                signInError: false,
                signOutError: false,
            }, {
                type: 'NONEXISTING_ACTION',
                payload: {
                    credential: {
                        accessToken: '123',
                    },
                    additionalUserInfo: {
                        username: 'Test',
                    },
                },
            })).toEqual(
                JSON.parse(JSON.stringify({
                    token: '',
                    user: '',
                    signInError: false,
                    signOutError: false,
                })),
            );
        });
    });
});
