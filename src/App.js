import React from 'react';

import './App.css';

function App() {
  return (
    <div class="App">
      <header class="App_header">
        <h1><a href="/">LetsChat</a></h1>
      </header>
      <div></div>

      <div class="main_chat">



        <div>
          <a class="LeaveRoom_button" type="button" href="/Leave Room">Leave Room</a>
          <h2>Users</h2>
          <ul class="list">
            <li>
              <div class="about">
                <div class="name">
                  Arpita Mehta
              </div>
              </div>
            </li>
          </ul>
          <ul class="list">
            <li>
              <div class="about">
                <div class="name">
                  Nachiket Mehta
              </div>
              </div>
            </li>
          </ul>


        </div>
        <div class="chat messages">
          <div class="chat-about">
            <div class="chat-with">Chat with Arpita Mehta</div>
          </div>

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
        <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="2" cols="120"></textarea>
        &nbsp;&nbsp;
        <button>Send</button>
      </div>
    </div>
  );
}
export default App;
