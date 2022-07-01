import React from "react";
import * as Flex from '@twilio/flex-ui';

import { Button } from "@twilio-paste/core/button";
import { AttachIcon } from "@twilio-paste/icons/esm/AttachIcon";

const CustomMediaAttachButton = ({ conversationSid }) => {
  const sendAttachment = () => {
    Flex.Actions.invokeAction("SendMessage", {
      body: "media",
      conversationSid: conversationSid,
      messageAttributes: {
        hasMedia: true,
        mediaUrl: "https://picsum.photos/600.jpg"
      }
    });
  }
  
  return (
	  <Button onClick={sendAttachment} variant='secondary_icon'>
	   <AttachIcon decorative={false} title='Add attachment' />
	  </Button>
  );
};

export default CustomMediaAttachButton;
