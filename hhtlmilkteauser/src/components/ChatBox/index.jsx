import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { steps } from "./Steps/steps";
import logo from "./../../assets/img/Milktea.jpg";

const theme = {
  background: "#f5f8fb",
  // fontFamily: "Helvetica Neue",
  headerBgColor: "#416c48",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#fff",
  botFontColor: "#416c48",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const ChatBox = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Chat with HHTLMilkTea coffee"
          floating={true}
          steps={steps}
          botAvatar={logo}
        />
      </ThemeProvider>
    </div>
  );
};

export default ChatBox;
