import ChatBot from 'react-simple-chatbot';
 
const steps=[
    {
      id: '1',
      message: 'What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, nice to meet you!',
      end: true,
    },
  ]

const Bot = () => {
    return(
        <div>
            <ChatBot recognitionEnable = {true} headerTitle="How Can I Help?" steps = {steps} />
        </div>

    )
}

export default Bot;