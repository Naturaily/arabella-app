import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import rrd from 'react-router-dom';

import { Provider } from 'react-redux';

import store from '../store';

import App from '../App';
import Login from '../views/Login';
import Repos from '../views/Repos';
import NoMatch from '../views/NoMatch';


rrd.BrowserRouter = ({ children }) => <div>{children}</div>;
module.exports = rrd;

describe('router test', () => {
    test('invalid link redirects to nomatch', () => {
        localStorage.setItem('token', '');
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/invalid']}>
                    <App />
                </MemoryRouter>
            </Provider>,
        );
        expect(wrapper.find(Login)).toHaveLength(0);
        expect(wrapper.find(Repos)).toHaveLength(0);
        expect(wrapper.find(NoMatch)).toHaveLength(1);
    });

    test('/ redirects to login', () => {
        localStorage.setItem('token', '');
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>,
        );
        expect(wrapper.find(Login)).toHaveLength(1);
        expect(wrapper.find(Repos)).toHaveLength(0);
        expect(wrapper.find(NoMatch)).toHaveLength(0);
    });

    test('valid link redirects to login when not signed', () => {
        localStorage.setItem('token', '');
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/repos']}>
                    <App />
                </MemoryRouter>
            </Provider>,
        );
        expect(wrapper.find(Login)).toHaveLength(1);
        expect(wrapper.find(Repos)).toHaveLength(0);
        expect(wrapper.find(NoMatch)).toHaveLength(0);
    });

    test('valid link redirects to repos when signed', () => {
        localStorage.setItem('token', 'test');
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/login']}>
                    <App />
                </MemoryRouter>
            </Provider>,
        );
        expect(wrapper.find(Login)).toHaveLength(0);
        expect(wrapper.find(Repos)).toHaveLength(1);
        expect(wrapper.find(NoMatch)).toHaveLength(0);
    });
});
