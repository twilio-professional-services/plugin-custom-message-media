import React from "react";

import { Box } from "@twilio-paste/core/box";
import { Button } from "@twilio-paste/core/button";
import { Flex } from "@twilio-paste/core/flex";
import {
  MediaObject,
  MediaFigure,
  MediaBody,
} from "@twilio-paste/core/media-object";
import { FileIcon } from "@twilio-paste/icons/esm/FileIcon";
import { MMSCapableIcon } from "@twilio-paste/icons/esm/MMSCapableIcon";
import { Stack } from "@twilio-paste/core/stack";
import { Text } from "@twilio-paste/core/text";

const CustomMediaMessageBubble = ({ message, member }) => {
  let {
    source: {
      state: { attributes },
    },
  } = message;
  let { friendlyName } = member;

  let { mediaUrl = "https://twilio.com/missing-url.error" } = attributes;

  const openAttachment = () => {
    window.open(mediaUrl, "_blank");
  };

  const renderIcon = () => {
    let fileExt = mediaUrl.substring(mediaUrl.lastIndexOf(".") + 1);

    switch (fileExt) {
      case "bmp":
      case "gif":
      case "heic":
      case "heif":
      case "jfif":
      case "jpeg":
      case "jpg":
      case "png":
      case "tif":
      case "tiff":
      case "webm":
        return <MMSCapableIcon decorative={true} title={mediaUrl} />;
      default:
        return <FileIcon decorative={true} title={mediaUrl} />;
    }
  };

  return (
    <Stack orientation="vertical">
      <Flex>
        <Flex hAlignContent="left" paddingRight="space40">
          <Text
            fontSize="fontSize20"
            fontWeight="fontWeightBold"
            color={message.isFromMe ? "colorTextWeakest" : "colorText"}>
            {friendlyName}
          </Text>
        </Flex>
        <Flex grow></Flex>
        <Flex hAlignContent="right">
          <Text
            fontSize="fontSize20"
            color={message.isFromMe ? "colorTextWeakest" : "colorText"}>
            {message.source.timestamp.toLocaleTimeString([], {
              timeStyle: "short",
            })}
          </Text>
        </Flex>
      </Flex>
      <Box padding="space10" paddingTop="space20">
        <Button onClick={openAttachment} variant="secondary">
          <MediaObject verticalAlign="center">
            <MediaFigure spacing="space40">{renderIcon()}</MediaFigure>
            <MediaBody>
              <Stack orientation="vertical">
                <Text fontSize="fontSize20" textAlign="left" title={mediaUrl}>
                  {mediaUrl.substring(mediaUrl.lastIndexOf("/") + 1)}
                </Text>
                <Text
                  color="colorTextWeak"
                  fontSize="fontSize10"
                  textAlign="left">
                  Open attachment
                </Text>
              </Stack>
            </MediaBody>
          </MediaObject>
        </Button>
      </Box>
    </Stack>
  );
};

export default CustomMediaMessageBubble;
