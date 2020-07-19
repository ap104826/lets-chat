import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import AppNav from './AppNav'


describe.only("Register renders properly", () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <AppNav />,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})