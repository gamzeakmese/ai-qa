import { useCallback, useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import "./index.css";
import Message from "./components/chat/Message";

function App() {
  const textInputRef = useRef();
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState([]);


  const sendMessage = useCallback(() => {
    var newMessage = {
      from: 'user',
      text: textInput,
      createdAt: Date.now()
    };

    var newMessages = [newMessage, ...messages];
    setTextInput('');
    textInputRef.current.value = '';
    setMessages(newMessages);
  }, [textInput, messages]);

  return <>
    <div className="h-dvh w-full flex flex-col">
      <Navbar />
      <div className="flex flex-col-reverse flex-grow max-w-screen-md mx-auto w-full p-6 overflow-y-scroll">
        {messages.map((message) => {
          return <Message message={message} />
        })}
      </div>

      <div className="flex flex-row w-full p-6 items-center justify-center max-w-screen-md mx-auto gap-6">
        <input ref={textInputRef} type="text" placeholder="Ask something..." onChange={(event) => {
          setTextInput(event.target.value);
        }} className="input w-full" />
        <button className="btn btn-primary btn-md" onClick={sendMessage}>Send</button>
      </div>
    </div>
  </>;
}

export default App;
