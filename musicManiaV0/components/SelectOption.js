import * as React from 'react';
import { Component } from 'react';
import {TouchableOpacity, Text } from 'react-native';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';

const Button = createThemedComponent(TouchableOpacity);

 
export default class SelectOption extends Component {
  state = {
    style_swap: CustomStyleSheet.styles.squareButton,
    highlighted: false
  }

  highlight = () => {
    // console.log('highlight changed to ');
    // console.log(this.state.highlighted);
    if (this.state.highlighted){
      this.setState({
        style_swap: CustomStyleSheet.styles.squareButton,
        highlighted: false
      });
    } 
    else {
      this.setState({
        style_swap: CustomStyleSheet.styles.squareButtonHighlighted,
        highlighted: true
      });
    }
  }

  render(){
    return (
      <Theme.View>
        <Button
          onPress={this.props.onPress}
          style={this.state.style_swap}>
          <Theme.Text style={CustomStyleSheet.styles.buttonTextMedium}>{this.props.name}</Theme.Text>
        </Button>
      </Theme.View>
    )
  }
}
