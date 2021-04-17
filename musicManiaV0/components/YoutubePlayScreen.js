import * as React from 'react';
import { Component } from 'react';
import { TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import SelectOption from './SelectOption';
import { TextInput } from 'react-native-gesture-handler';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';
import YoutubePlayer from "react-native-youtube-iframe";
import { useState, useCallback, useRef } from "react";
import { WebView } from 'react-native-webview';
import { interpolate } from 'react-native-reanimated';


const Button = createThemedComponent(TouchableOpacity);
const ThemeTextInput = createThemedComponent(TextInput);

export default class YoutubePlayScreen extends Component {
    state = {
        playlist: [],
        playlistName: '',
        started: false,
        index: 0,
        playorpause: 'Play',
        action: false,
        getNext: false,
        clickedpauseorplay: false,
    }

    startThis(){
        this.state.clickedpauseorplay = true;
        this.forceUpdate();
    }

    next(){
        this.state.getNext = true;
        this.forceUpdate();
    }

    changed(){
        if(this.state.clickedpauseorplay == true){
            this.state.action = !(this.state.action);
            if(this.state.action == false){
                this.state.playorpause = 'Play';
            }
            else{
                this.state.playorpause = 'Pause';
            }
            this.state.clickedpauseorplay = false;
            this.forceUpdate();
        }

        if(this.state.getNext == true){
            if(this.state.playlist.length == (this.state.index + 1)){
                this.state.index = 0;
            }
            else{
                this.state.index = this.state.index + 1;
            }
            this.state.getNext = false;
            this.forceUpdate();
        }
    }

    async componentDidMount(){
        // get currentPlaylistName
        this.state.playlistName = await AsyncStorage.getItem("currentPlaylist");
        // get the list of videos
        let vids = await AsyncStorage.getItem(this.state.playlistName.toString());
        let temp = JSON.parse(vids);
        this.state.playlist = temp;
        this.forceUpdate();
    }

    render() {

        return (
            <ScrollView style={{width: '100%'}}>
                <Theme.View style={CustomStyleSheet.styles.container}>
                    <Theme.View style={CustomStyleSheet.styles.containerRow, {flex: .15}}>
                        <Button
                            onPress={() => {this.props.nav.navigate('Home')}}
                            style={CustomStyleSheet.styles.buttonShort}>
                            <Theme.Text style={CustomStyleSheet.styles.shortButtonText}>Back to home!</Theme.Text>
                        </Button>
                    </Theme.View>
                    <Theme.View style={CustomStyleSheet.styles.row}>
                        <SelectOption name={this.state.playorpause} onPress={() => this.startThis()}/>
                        <SelectOption name='Next' onPress={() => this.next()}/>
                    </Theme.View>
                </Theme.View>
                <YoutubePlayer
                        height={1600}
                        play={this.state.action}
                        videoId={this.state.playlist[this.state.index]}
                        onChangeState={this.changed()}
                />
            </ScrollView>
        );
    }
}