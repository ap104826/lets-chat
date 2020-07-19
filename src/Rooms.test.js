import React from 'react'
import ReactDOM from 'react-dom'
import Rooms from './Rooms'
import { BrowserRouter } from 'react-router-dom'


describe("Rooms renders properly", () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <Rooms />
            </BrowserRouter>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})