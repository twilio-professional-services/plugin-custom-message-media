# Custom Message Media Flex Plugin Example

This plugin is an example solution for sending message media/attachments through infrastructure of your choosing, rather than using the built-in solution.

From a high level, this is accomplished by adding a message to a conversation with specific attributes indicating that a) there is media, and b) a URL or other identifier that can be used to retrieve the data. The Flex plugin in this repository shows how to render a custom component when these attributes are present.

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
twilio api:conversations:v1:conversations:messages:create --conversation-sid CHxxxxxxxxxx --author Customer --body "media" --attributes "{\"hasMedia\":true,\"mediaUrl\":\"https://picsum.photos/600.jpg\"}"
```

The message will then be rendered in Flex using the custom component from this plugin.

## Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.

