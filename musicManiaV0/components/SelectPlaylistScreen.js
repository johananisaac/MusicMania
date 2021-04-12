import * as React from 'react';
import { Component } from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
import SelectOption from './SelectOption';
import { CustomStyleSheet } from '../styles';
import Theme from 'react-native-theming';

export default class SelectPlaylistScreen extends Component {
  constructor(props){
    super(props);
    this.references = [];
    for (var i = 0; i < 10; i++) { // Max references, must be greater than or equal to max number of playlists
      this.references.push(React.createRef());
    }
    this.intervalID = 0;
  }

  state = {
    playlist_names: [],
    current_selection: 0,
  }

  makeTimer(){
    this.intervalID = setInterval(() => {
        // console.log(this.state.playlist_names.length);
        if (this.state.current_selection+1 >= this.state.playlist_names.length + 2){ // current number of songs + 2 for the create new playlist button
          if (this.references[this.state.current_selection].current != null){
            this.references[this.state.current_selection].current.highlight();
            this.references[0].current.highlight();
          }
          this.setState({current_selection: 0});
        } 
        else {
          if (this.references[this.state.current_selection].current != null){
            this.references[this.state.current_selection].current.highlight();
            this.references[this.state.current_selection+1].current.highlight();
          }
          this.setState({current_selection: this.state.current_selection+1});
        }
        console.log("current selection: " + this.state.current_selection);
    }, 2000) // Make this customizable, 2 seconds
  }

  async getName() {
    try{
      //await AsyncStorage.clear();
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

  async editPlaylist(destination, name) {
    try{
      await AsyncStorage.setItem("EditPlaylist", "True");
      await AsyncStorage.setItem("currentPlaylist", name);
    }
    catch (err){
      alert(err);
    }
    this.props.nav.navigate(destination);
  }

  async newPlaylist(destination) {
    try{
      await AsyncStorage.setItem("EditPlaylist", "False");
    }
    catch (err){
      alert(err);
    }
    this.props.nav.navigate(destination);
  }

  componentDidMount(){
    this.getName();
    this.forceUpdate();
    this.makeTimer();
    this.references[0].current.highlight();
    this._unsubscribe = this.props.nav.addListener('blur', () => {
      clearInterval(this.intervalID);
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    this._unsubscribe();
  }

  render(){
    this.playlist_names = this.state.playlist_names.map((item, index) => 
        <SelectOption ref={node => this.references[index+2].current = node} name={item} key={index} onPress={() => this.editPlaylist('Playlist', item)}/>
    );
    return (
      <ScrollView>
      <Theme.View style={CustomStyleSheet.styles.container}>
        <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
          Choose a playlist to edit, or create a new one!
        </Theme.Text>
        <Theme.View>
          {this.playlist_names}
          <SelectOption ref={node => this.references[1].current = node} name='New Youtube Playlist' onPress={() =>  this.newPlaylist('Youtube')}/>
          <SelectOption ref={node => this.references[0].current = node} name='Create New Playlist' onPress={() =>  this.newPlaylist('Playlist')}/>
          <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
          </Theme.Text>
        </Theme.View>
      </Theme.View>
      </ScrollView>
    )
  } 
}
