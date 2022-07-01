# Custom Message Media Flex Plugin Example

This plugin is an example solution for sending message media/attachments through infrastructure of your choosing, rather than using the built-in solution.

Out-of-the-box, conversation participants can attach and send media with their message. This media is [uploaded to the Twilio Media Content Service](https://www.twilio.com/docs/conversations/media-support-conversations) and displayed as an attachment in the Flex UI. However, depending on the sensitivity of data in the attachment, it may be more desirable to host the attachment using your own infrastructure.

From a high level, this is accomplished by adding a message to a conversation with specific attributes indicating that a) there is media, and b) a URL or other identifier that can be used to retrieve the data. Out-of-the-box, these attributes would not be used, and a blank message would be displayed without the attachment information. The Flex plugin in this repository shows how to render a custom component when these attributes are present.

In this example, we add the following attributes to the chat message, which are consumed by the plugin for display to the user:

```
{
  "hasMedia": true,
  "mediaUrl": "https://picsum.photos/600.jpg"
}
```

Note that the media URL would need to be accessible by the agent's desktop. For additional security, an identifier could be provided instead of a URL, which the component could then be customized to use to fetch additional information from your media service.

## Disclaimer

**This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Twilio bears no responsibility to support the use or implementation of this software.**

## Pre-requisites

This plugin is designed for usage with Flex UI 2.x only.

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart). If you are using Homebrew on macOS, you can do so by running:

```bash
brew tap twilio/brew && brew install twilio
```

Finally, install the [Flex Plugin extension](https://www.twilio.com/docs/flex/developer/plugins/cli/install) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex
```

## Installation

First, clone the repository and change to its directory:

```bash
git clone https://github.com/twilio-professional-services/plugin-custom-message-media.git

cd plugin-custom-message-media
```

Copy `public/appConfig.example.js` to `public/appConfig.js`:

```bash
cp public/appConfig.example.js public/appConfig.js
```

Install the dependencies:

```bash
npm install
```

Run the plugin locally:

```bash
twilio flex:plugins:start
```

## Sending a message with custom media

Example using the Twilio CLI:

```bash
# Get conversation SID from the conversations list
twilio api:conversations:v1:conversations:list

# Send message with media flag and URL
twilio api:conversations:v1:conversations:messages:create --conversation-sid CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX --author Customer --body "media" --attributes "{\"hasMedia\":true,\"mediaUrl\":\"https://picsum.photos/600.jpg\"}"
```

Example using the Conversations SDK:

```
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.conversations.conversations('CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                    .messages
                    .create({
                      author: 'Customer',
                      body: 'media',
                      attributes: JSON.stringify({
                        hasMedia: true,
                        mediaUrl: 'https://picsum.photos/600.jpg'
                      })
                    })
                    .then(message => console.log(message.sid));
```

Example using Flex UI Actions: See the included [CustomMediaAttachButton component](https://github.com/twilio-professional-services/plugin-custom-message-media/blob/main/src/components/CustomMediaAttachButton/CustomMediaAttachButton.jsx).

The message will then be rendered in Flex using the custom component from this plugin:

![Plugin screenshot](https://github.com/twilio-professional-services/plugin-custom-message-media/blob/main/resources/screenshot.png)

## Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.

