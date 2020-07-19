import React from 'react'
import ReactDOM from 'react-dom'
import RoomNav from './RoomNav'
import { BrowserRouter } from 'react-router-dom'


describe("CategoryListNav renders properly", () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <RoomNav />
            </BrowserRouter>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})