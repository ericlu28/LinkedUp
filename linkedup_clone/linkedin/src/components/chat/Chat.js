import { useContext } from "react";

import { CometChatUserListWithMessages } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src";

import Context from "../../context";

const Chat = () => {
  const { cometChat } = useContext(Context);

  return (
    <div className="chat">
      <div className="chat__content">
        <div className="chat__container">
          {cometChat && <CometChatUserListWithMessages />}
        </div>
      </div>
    </div>
  );
};
export default Chat;