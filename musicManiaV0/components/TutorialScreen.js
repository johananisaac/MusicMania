import * as React from 'react';
import { Component } from 'react';
import { TouchableOpacity} from 'react-native';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';

const Button = createThemedComponent(TouchableOpacity);

// General purpose separator
const Separator = () => (
  <Theme.View style={CustomStyleSheet.styles.separator} />
);

export default class TutorialScreen extends Component {
  render(){
    return (
      <Theme.View style={CustomStyleSheet.styles.container}>
        <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
          Interactive tutorial coming soon!
        </Theme.Text>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <Button
              onPress={() => this.props.nav.navigate('Home')}
              style={CustomStyleSheet.styles.button}>
              <Theme.Text style={CustomStyleSheet.styles.buttonText}>Get Started!</Theme.Text>
          </Button>
        </Theme.View>
        <Separator />
      </Theme.View>
    )
  } 
}
