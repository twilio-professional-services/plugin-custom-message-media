import React from "react";
import * as Flex from "@twilio/flex-ui";

import { Button } from "@twilio-paste/core/button";
import { AttachIcon } from "@twilio-paste/icons/esm/AttachIcon";

const CustomMediaAttachButton = ({ attachFileDisabled, conversationSid, manager }) => {
  const sendAttachment = async () => {
    let previousInputText = manager.store.getState().flex.chat.conversationInput[conversationSid].inputText;
    
    await Flex.Actions.invokeAction("SendMessage", {
      body: "media",
      conversationSid: conversationSid,
      messageAttributes: {
        hasMedia: true,
        mediaUrl: "https://picsum.photos/600.jpg",
      },
    });
    
    // SendMessage clears the input; put it back
    Flex.Actions.invokeAction("SetInputText", {
      body: previousInputText,
      conversationSid: conversationSid,
    });
  };

  return (
    <Button onClick={sendAttachment} variant="secondary_icon" disabled={attachFileDisabled}>
      <AttachIcon decorative={false} title="Add attachment" color={attachFileDisabled ? 'colorTextWeaker' : 'colorText'} />
    </Button>
  );
};

export default CustomMediaAttachButton;
