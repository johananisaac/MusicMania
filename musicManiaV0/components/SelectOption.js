import * as React from 'react';
import { Component } from 'react';
import {TouchableOpacity, Text } from 'react-native';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';

const Button = createThemedComponent(TouchableOpacity);

 
export default class SelectOption extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <Theme.View>
        <Button
          onPress={this.props.onPress}
          style={CustomStyleSheet.styles.squareButton}>
          <Theme.Text style={CustomStyleSheet.styles.buttonTextMedium}>{this.props.name}</Theme.Text>
        </Button>
      </Theme.View>
    )
  }
}
