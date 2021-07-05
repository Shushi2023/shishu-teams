import ChatBot from "react-simple-chatbot";

const steps = [
  {
    id: "1",
    message: "What is your Name?",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "Hi {previousValue}, nice to meet you! How may I help you?",
    trigger: "4",
  },
  {
    id: "4",
    options: [
      { value: 1, label: "Video Chat", trigger: "5" },
      { value: 2, label: "Chat Room", trigger: "6" },
      { value: 3, label: "Youtube Room", trigger: "7" },
      { value: 4, label: "Play Chess", trigger: "8" },
      { value: 5, label: "Join Stream", trigger: "9" },
      { value: 6, label: "View Websites", trigger: "10" },
      { value: 7, label: "Watch News", trigger: "11" },
      { value: 8, label: "Check Calendar", trigger: "12" },
      { value: 9, label: "Exit", trigger: "100" },
    ],
  },
  {
    id: "100",
    message: "Thank You, Have Nice Day",
    end: true,
  },
  {
    id: "5",
    options: [
      { value: 1, label: "One To One", trigger: "5.1" },
      { value: 2, label: "Group Video Chat", trigger: "5.2" },
    ],
  },
  {
    id: "5.1",
    options: [
      { value: 1, label: "Make A Call", trigger: "5.1.1" },
      { value: 2, label: "Answer A Call", trigger: "5.1.2" },
    ],
  },
  {
    id: "5.1.1",
    message:
      "1.) Login 2.) Go to features section 3.) Click on Lets Video Chat 4.) Click on one-to-one Video Call 5.) Click on Start Video Call 6.) Click on Lets make a call 7.) Enter the ID of the person to call 8.)Make the call",
    trigger: "4",
  },
  {
    id: "5.1.2",
    message:
      "1.) Login 2.) Go to features section 3.) Click on Lets Video Chat 4.) Click on one-to-one Video Call 5.) Click on Start Video Call 6.) A call will be coming, accept it",
    trigger: "4",
  },
  {
    id: "5.2",
    message:
      "1.) Login 2.) Go to features section 3.) Click on Lets Video Chat 4.) Click on Group Video Call 5.) Click on Create Room 6.) Copy the URL and send it people you want to call",
    trigger: "4",
  },
  {
    id: "6",
    message:
      "1.) Login First 2.) Go to features section 3.) Click on Chat Room 4.) Chat will be started as soon as you enter the room",
    trigger: "4",
  },
  {
    id: "7",
    message:
      "1.) Login First 2.) Go to features section 3.) Click on Youtube Room 4.)Type what you want to search 5.)Click on Search",
    trigger: "4",
  },
  {
    id: "8",
    message:
      "1.) Login First 2.) Go to features section 3.) Click on Lets Play Chess 4.) Enter your username 5.) Copy the link and send to your friend you want to play with 6.) Once he joins the game will be started",
    trigger: "4",
  },
  {
    id: "9",
    message:
      "1.) Login First 2.) Go to features section 3.) Click on Join Stream 4.) Enter the twitch username you want to watch the stream of 5.) Click on Search",
    trigger: "4",
  },
  {
    id: "10",
    message:
      "1.) Login First 2.) Go to features section 3.) Click on Website 4.) Enter the website you want to search in https format(Note : Some sites won't be possible to visit due to security issues) 5.)Click on Search",
    trigger: "4",
  },
  {
    id: "11",
    message:
      "1.) Login First 2.) Go to features section 3.) Click on Search News 4.) Enter the keywords you want the news about 5.) Click on Search",
    trigger: "4",
  },
  {
    id: "12",
    message: "1.) Login First 2.) Go to features section 3.) Click on Calendar",
    trigger: "4",
  },
];

const Bot = (props) => {
  return (
    <div>
      <ChatBot
        recognitionEnable={true}
        headerTitle="How Can I Help?"
        steps={steps}
        opened={props.flag}
      />
    </div>
  );
};

export default Bot;
