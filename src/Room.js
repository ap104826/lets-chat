import React, { Component } from 'react';

export default class Room extends Component {
    render() {
        return (
            <div className="chat_container">
                <div class="main_chat">
                    <div className="chat_nav">
                        <div className="chat_users">
                            <h2>Users</h2>
                            <ul>
                                <li>
                                    Arpita Mehta
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    Nachiket Mehta
                                </li>
                            </ul>
                        </div>
                        <div className="chat_rooms">
                            <h2>Rooms</h2>
                            <ul>
                                <li>
                                    Cooking
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    Travel
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="chat_messages">
                        <div class="chat-history">
                            <ul>
                                <li>
                                    <div class="message-data align-right">
                                        <span class="message-data-time">10:00 Am, Today</span> &nbsp; &nbsp;
              <span class="message-data-name">Nachiket</span>
                                    </div>
                                    <div class="message other-message float-right">
                                        Hi Arpita, how are you? How is the project coming along?
                                    </div>
                                </li>
                                <li>
                                    <div class="message-data">
                                        <span class="message-data-name"> Arpita</span>
                                        <span class="message-data-time">10:12 AM, Today</span>
                                    </div>
                                    <div class="message my-message">
                                        Are we meeting today? Project has been already finished and I have results to show you.
                                    </div>
                                </li>
                                <li>
                                    <div class="message-data align-right">
                                        <span class="message-data-time"> 10:14 AM, Today</span> &nbsp; &nbsp;
                                        <span class="message-data-name">Nachiket</span>
                                    </div>
                                    <div class="message other- message float-right">Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                    </div>
                                </li>
                                <li>
                                    <div class="message-data">
                                        <span class="message-data-name"> Arpita</span>
                                        <span class="message-data-time">10:20 AM, Today</span>
                                    </div>
                                    <div class="message my-message">
                                        Actually everything was fine. I'm very excited to show this to our team.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="chat_message">
                    <input name="message-to-send" className="message_input" id="message-to-send" placeholder="Type your message" />
                    <button>Send</button>
                </div>
            </div>
        )

    }
}
