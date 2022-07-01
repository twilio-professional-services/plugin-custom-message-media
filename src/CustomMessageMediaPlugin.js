import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import { CustomizationProvider } from '@twilio-paste/core/customization';

import CustomMediaAttachButton from './components/CustomMediaAttachButton/CustomMediaAttachButton';
import CustomMediaMessageBubble from './components/CustomMediaMessageBubble/CustomMediaMessageBubble';

const PLUGIN_NAME = 'CustomMessageMediaPlugin';

export default class CustomMessageMediaPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider
    });
    
    flex.MessageBubble.Content.replace(<CustomMediaMessageBubble key="CustomMediaMessageBubble-component" />, {
      if: props => props.message.source.state.attributes.hasMedia
    });
    
    flex.MessageInputActions.Content.remove("attach-file-button");
    flex.MessageInputActions.Content.add(<CustomMediaAttachButton key="CustomMediaAttachButton-component" />, {
      align: 'start'
    });
  }
}
