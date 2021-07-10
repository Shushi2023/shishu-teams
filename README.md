# shishu-teams

<pre>
1.) I have used React.js for the frontend and Node.js for backend. <br/>
2.) Socket.io is used for Chatting and Video Calling, along with Peer.js(WebRTC). <br/>
3.) The application is deployed on Heroku, Continious Deployment is activated, so as soon as some code 
    is pushed to master branch, automatic deployment is started on Heroku. <br/>
4.) The features of the project are as follows:
    (Note : All the features can be used only after you login, if you don't have an account signUp first)
    (This logIn and signUp functionality is implemented using Firebase Authentication)
<br/>
    4.1) Video Calling, both One-One and Group(upto 4 people) [Used Socket.io and Peer.js]
        4.1.1) The one-one video calling includes features like screenshare, fullscreen, chat while video call, whiteboard.  <br />
    4.2) A Youtube room where we can view Youtube Videos. [Youtube API provided by Rapidapi.com]<br/>
    4.3) A Chess Game, that can be played among 2 people while Video Calling. [Used chess.js, socket.io and peer.js]
         (Note : The Video Calling might not work at large distances due to some security issues of Heroku) <br/>
    4.4) A Chat Room, where all the past chats are saved, rooms can be created and people can be added to rooms. 
         We can also share pictures, which are also saved.[Used ChatEngine API]<br />
    4.5) Watch Streams from Twitch, so if you enter any username on twitch that's streaming, you'll be able to see that
         on Shishu Teams. [Used react player for this]<br />
    4.6) A small Calendar just for reference. [Used @syncfusion/ej2-react-calendars for this]<br />
    4.7) A Website page where you can view websites within the site. [Used react-iframe]
         (Note : Some sites like google, microsoft and many more might not be visible because of security issues)
         (To try the feature you can use https://wikipedia.com/)<br />
    4.8) A News page where you can search for latest news. [Used Bing API(by Microsoft Azure) via Rapidapi.com platform]<br />
    4.9) Finally, since the site seems too complex to use for starters, I have also added a ChatBot for guiding you. [Used react-simple-chatbot]<br />
5.) I have created 3 branches here, Master Branch which is the final code that's deployed, Dev Branch where I did all the development,
    and a QA branch for testing. Since I was the only one working on the project, I used the Dev branch for testing and merged the code
    directly from dev branch to master branch which is then automatically deployed to Heroku. 
    
The Site is hosted at :  https://shishu-teams.herokuapp.com/
    
</pre>
