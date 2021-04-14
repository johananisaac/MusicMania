import * as React from 'react';
import { Component } from 'react';
import { TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import SelectOption from './SelectOption';
import { CustomStyleSheet } from '../styles';
import { TextInput } from 'react-native-gesture-handler';
import Theme, {createThemedComponent } from 'react-native-theming';

const ThemeTextInput = createThemedComponent(TextInput);
const Button = createThemedComponent(TouchableOpacity);

export default class SettingsOptionScreen extends Component {
  state = {
    players: [],
    playerName: "",
  }

  setName(playername){
    this.state.playerName = playername;
  }
  
  // save players
  async savePlayer(destination) {
    if(this.state.playerName == ''){
      alert("Name your player!");
    }
    else{
      this.addToPlayersList(this.state.playerName.toString());
      try{
        // await AsyncStorage.clear();
        let playersTemp = await AsyncStorage.getItem("Players");
        if(playersTemp == null){
          let players = [];
          players.push(this.state.playerName.toString());
          await AsyncStorage.setItem("Players", JSON.stringify(players));
        }
        else{
          let players = JSON.parse(playersTemp);
          players.push(this.state.playerName.toString());
          await AsyncStorage.setItem("Players", JSON.stringify(players));
        }
        await AsyncStorage.setItem("Players", JSON.stringify(this.state.players));
        // await AsyncStorage.clear();
        this.props.nav.navigate(destination);
      }
      catch (err){
        alert(err);
      }
    }
  }

  // update/remove players
  async updatePlayer() {
      try{
        await AsyncStorage.setItem("Players", JSON.stringify(this.state.players));
      }
      catch (err){
        alert(err);
      }
  }

  async getAdditionalPlayers() {
    try{
      let additional_players_temp = await AsyncStorage.getItem("Players");
      if(additional_players_temp != null){
        this.setState({
            players: JSON.parse(additional_players_temp),
        });
      }
    }
    catch(err){
      alert(err);
    }
  }

  addToPlayersList(name) {
    if(this.state.players.length < 5){
      this.setState({
        players: [...this.state.players, name]
      });
    }
  }

  removeFromPlayersList(id) {
    this.state.players.splice(id, 1);
    this.updatePlayer();
    this.forceUpdate();
  }

  componentDidMount(){
    this.getAdditionalPlayers();
  }

  render(){
    this.players = this.state.players.map((item, index) => 
        <Button style={CustomStyleSheet.styles.button} 
          key={index}
          onPress={() => this.removeFromPlayersList(index)}>
          <Theme.Text style={CustomStyleSheet.styles.buttonTextMedium}>
            {item}
          </Theme.Text>
        </Button>
    );
    return (
      <ScrollView>
      <Theme.View style={CustomStyleSheet.styles.container}>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
            Select your color scheme!
          </Theme.Text>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.row}>
            { CustomStyleSheet.themes.map(theme => (
            <SelectOption name={theme.name} key={theme.name} onPress={() => theme.apply()} />
            ))
          }
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
            Add or remove more players!
          </Theme.Text>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <ThemeTextInput style={CustomStyleSheet.styles.paragraphInput} placeholder={"Player name here"} placeholderTextColor= '#808080' onChangeText={(text) => this.setName(text)}/>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <SelectOption name='Save and Play' onPress={() => this.savePlayer('Play')}/>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <Theme.View>{this.players}</Theme.View>
        </Theme.View>
      </Theme.View>
      </ScrollView>
    )
  }
  
}
