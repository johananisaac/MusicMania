import * as React from 'react';
import { Component } from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
import SelectOption from './SelectOption';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';

export default class SelectPlaylistScreen extends Component {
  state = {
    playlist_names: [],
  }

  async getName() {
    try{
      let playlistsTemp = await AsyncStorage.getItem("Playlist_names");
      if(playlistsTemp != null){
        this.setState({
          playlist_names: JSON.parse(playlistsTemp),
        });
      }
    }
    catch(err){
      alert(err);
    }
  }

  componentDidMount(){
    this.getName();
  }

  render(){
    this.playlist_names = this.state.playlist_names.map((item, index) => 
        <SelectOption name={item} key={index} onPress={() => this.props.nav.navigate('Playlist')}/>
    );
    return (
      <ScrollView>
      <Theme.View style={CustomStyleSheet.styles.container}>
        <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
          Choose a playlist to edit, or create a new one!
        </Theme.Text>
        <Theme.View>
          {this.playlist_names}
          <SelectOption name='My Favorites' onPress={() => this.props.nav.navigate('Playlist')}/>
          <SelectOption name='Create New Playlist' onPress={() =>  this.props.nav.navigate('Playlist')}/>
        </Theme.View>
      </Theme.View>
      </ScrollView>
    )
  } 
}
