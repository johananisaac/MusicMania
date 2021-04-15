import * as React from 'react';
import { Component } from 'react';
import { TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import SelectOption from './SelectOption';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';

const Button = createThemedComponent(TouchableOpacity);

export default class SelectPlaylistScreen extends Component {
  constructor(props){
    super(props);
    this.references = [];
    for (var i = 0; i < 10; i++) { // Max references, must be greater than or equal to max number of playlists
      this.references.push(React.createRef());
    }
    this.intervalID = 0;
    this.interval_active = null;
  }

  state = {
    playlist_names: [],
    accessible_select_active: null,
    current_selection: 0,
  }

  makeTimer(){
      if (!this.interval_active) {
        this.interval_active = true;
        this.intervalID = setInterval(() => {
          if (!this.state.accessible_select_active) {
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
        } else {
          this.references[0].current.removeHighlight();
        }
      }, 2000) // Make this customizable, 2 seconds
    }
  }

  async getName() {
    try{
      //await AsyncStorage.clear();
      let playlistsTemp = await AsyncStorage.getItem("Playlist_names");
      let playlists1 = JSON.parse(playlistsTemp);
      let playlistsTemp2 = await AsyncStorage.getItem("Youtube_Playlist_names");
      let playlists2 = JSON.parse(playlistsTemp2);
      let total_playlists = [];
      if(playlists1 != null && playlists2 == null){
        total_playlists = playlists1;
      }
      else if(playlists2 != null && playlists1 == null){
        total_playlists = playlists2;
      }
      else if(playlists2 != null && playlists1 != null){
        total_playlists = playlists1.concat(playlists2);
      }
      
      this.setState({
        playlist_names: total_playlists,
      });
    }
    catch(err){
      alert(err);
    }
  }

  // get accessible select state
  async getAccessibleSelectState() {
    try{
      let settingsTemp = await AsyncStorage.getItem("AccessibleSelect");
      if(settingsTemp != null){
        this.setState({
          accessible_select_active: JSON.parse(settingsTemp),
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
      let playlistsTemp2 = await AsyncStorage.getItem("Youtube_Playlist_names");
      let playlists2 = JSON.parse(playlistsTemp2);
      if (playlists2.indexOf(name) > -1){
        destination = 'Youtube';
      }
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

  select(){
    this.references[this.state.current_selection].current.props.onPress();
  }

  componentDidMount(){
    this.getName();
    this.forceUpdate();
    this.getAccessibleSelectState();

    if (!this.state.accessible_select_active) {
      this.references[0].current.highlight();
      this._unsubscribe = this.props.nav.addListener('blur', () => {
        console.log("Stop timer from listener");
        this.interval_active = false;
        clearInterval(this.intervalID);
      });
      this._unsubscribe2 = this.props.nav.addListener('focus', () => {
        console.log("Start timer from listener" + this.interval_active);
        this.makeTimer();
      });
    }
    
    // this._unsubscribe = this.props.nav.addListener('blur', () => {
    //   console.log("Stop timer from listener");
    //   this.interval_active = false;
    //   clearInterval(this.intervalID);
    // });
    // this._unsubscribe2 = this.props.nav.addListener('focus', () => {
    //   console.log("Start timer from listener" + this.interval_active);
    //   this.makeTimer();
    // });
  }

  componentWillUnmount() {
    console.log("Stop timer from unmount");
    this.interval_active = false;
    clearInterval(this.intervalID);
    this._unsubscribe();
  }

  renderPopover() {
    if (this.state.accessible_select_active) {
      return null;
    }
  
    return (
      <Button style={CustomStyleSheet.styles.containerOver} onPress={() =>  this.select()}/>
    );
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
          <SelectOption ref={node => this.references[0].current = node} name='Create New Playlist' onPress={() =>  this.newPlaylist('Playlist')}/>
          <SelectOption ref={node => this.references[1].current = node} name='New Youtube Playlist' onPress={() =>  this.newPlaylist('Youtube')}/>
          <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
          </Theme.Text>
        </Theme.View>
        {this.renderPopover()}
      </Theme.View>
      </ScrollView>
    )
  } 
}
