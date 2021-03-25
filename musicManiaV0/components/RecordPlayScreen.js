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

export default class RecordPlayScreen extends Component {
  render(){
    return (
      <Theme.View style={CustomStyleSheet.styles.container}>
        <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
          Record
        </Theme.Text>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
            <Button
            onPress={() => this.props.nav.navigate('Play Options')}
            style={CustomStyleSheet.styles.button}>
            <Theme.Text style={CustomStyleSheet.styles.buttonText}>Back to play options</Theme.Text>
            </Button>
        </Theme.View>
        <Separator />
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <Button
              // onPress={}
              style={CustomStyleSheet.styles.button}>
              <Theme.Text style={CustomStyleSheet.styles.buttonText}>Record your song!</Theme.Text>
          </Button>
        </Theme.View>
        <Separator />
      </Theme.View>
    )
  } 
}
