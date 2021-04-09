import * as React from 'react';
import { Component } from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
import SelectOption from './SelectOption';
import { CustomStyleSheet } from '../styles';
import Theme from 'react-native-theming';

export default class SelectPlaylistScreen extends Component {
  constructor(props){
    super(props);
    this.componentRef = React.createRef();
    this.componentRef2 = React.createRef();
    this.intervalID = 0;
  }

  state = {
    playlist_names: [],
    number:0,
    current_selection: 0,
  }

  referComponentByRef = () => {
    this.componentRef.current.highlight();
    this.componentRef2.current.highlight();
  }

  makeTimer(){
    this.intervalID = setInterval(() => {
        this.setState({current_selection: this.state.current_selection+1})
        console.log(this.componentRef);
        if (this.componentRef.current != null){
          this.componentRef.current.highlight();
          this.componentRef2.current.highlight();
        }
        // this.highlightElement((this.current_selection + 1)%this.playlist_names.length);
        // this.setState({
        //   current_selection : (this.current_selection + 1)%this.playlist_names.length
        // });
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
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render(){
    this.playlist_names = this.state.playlist_names.map((item, index) => 
        <SelectOption name={item} key={index} onPress={() => this.editPlaylist('Playlist', item)}/>
    );
    return (
      <ScrollView>
      <Theme.View style={CustomStyleSheet.styles.container}>
        <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
          Choose a playlist to edit, or create a new one!
        </Theme.Text>
        <Theme.View>
          {this.playlist_names}
          <SelectOption name='Create New Playlist' onPress={() =>  this.newPlaylist('Playlist')}/>
          <SelectOption ref={node => this.componentRef.current = node} name='Tester' />
          <SelectOption ref={node => this.componentRef2.current = node} name='Tester2' />
          <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
          {this.state.current_selection}
          </Theme.Text>
        </Theme.View>
      </Theme.View>
      </ScrollView>
    )
  } 
}
