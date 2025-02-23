import { useCallback, useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import "./index.css";
import Message from "./components/chat/Message";
import axios from "axios";

function App() {
  const textInputRef = useRef();
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);


  const sendMessage = useCallback(async () => {
    if (loading) {
      return;
    }

    if (!textInput) {
      return;
    }

    if (textInput.trim().length == 0) {
      return;
    }

    setLoading(true);
    var newMessage = {
      from: 'user',
      text: textInput,
      createdAt: Date.now()
    };

    var newMessages = [newMessage, ...messages];
    setTextInput('');
    textInputRef.current.value = '';
    setMessages(newMessages);

    try {
      const response = await axios('https://llm.mandalinai.com/api/v1/chat/completion', {
        method: 'POST',
        headers:
          { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          "instructions": "You are a very good Software developer. Answer on every response like so and connect every context to software development if possible. Use Markdown Format on every Response",
          "text": textInput,
          'token': import.meta.env.VITE_MANDALINAI_LLM_API_KEY
        })
      })

      if (!response) {
        setLoading(false);
        return;
      }

      const responseData = response.data;

      if (responseData.status != 'done') {
        setLoading(false);
        return;
      }

      const responseMessage = responseData.data.message;

      var newResponseMessage = {
        from: 'system',
        text: responseMessage.content.text,
        createdAt: Date.now()
      };

      var resultMessages = [newResponseMessage, ...newMessages];
      setMessages(resultMessages);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  }, [textInput, messages, loading]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission (if in a form)
      sendMessage(); // Call sendMessage when Enter is pressed
    }
  };

  return <>
    <div className="h-dvh w-full flex flex-col">
      <Navbar />
      <div className="flex flex-col-reverse flex-grow max-w-screen-md mx-auto w-full p-6 overflow-y-scroll">
        {loading && <Message systemLoading />}
        {messages.map((message) => {
          return <Message message={message} />
        })}
      </div>

      <div className="flex flex-row w-full p-6 items-center justify-center max-w-screen-md mx-auto gap-6">
        <input onKeyDown={handleKeyDown} ref={textInputRef} type="text" placeholder="Ask something..." onChange={(event) => {
          setTextInput(event.target.value);
        }} className="input w-full" />
        <button className="btn btn-primary btn-md" onClick={sendMessage}>Send</button>
      </div>
    </div>
  </>;
}

export default App;
