import * as React from 'react';
import { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Audio } from 'expo-av';
import { CustomStyleSheet } from '../styles'
import Theme, {createThemedComponent } from 'react-native-theming';


// Use Animated library for ripples in the future
import Ripple from 'react-native-material-ripple';

const ThemeRipple = createThemedComponent(Ripple);


// NOTE: ALL MUSIC FORMAT
// Note + _ + size of note, with decimal removed + _ + volume of note (try to keep it to F for now)
let TwinkleTwinkle = {
    name: "Twinkle Twinkle",
    fileloc: "TEMPLATE",
    song: ['C4_025_F', 'C4_025_F', 'G4_025_F', 'G4_025_F', 'A4_025_F', 'A4_025_F', 'G4_05_F',
        'F4_025_F', 'F4_025_F', 'E4_025_F', 'E4_025_F', 'D4_025_F', 'D4_025_F', 'C4_05_F',
        'G4_025_F', 'G4_025_F', 'F4_025_F', 'F4_025_F', 'E4_025_F', 'E4_025_F', 'D4_05_F',
        'G4_025_F', 'G4_025_F', 'F4_025_F', 'F4_025_F', 'E4_025_F', 'E4_025_F', 'D4_05_F',
        'C4_025_F', 'C4_025_F', 'G4_025_F', 'G4_025_F', 'A4_025_F', 'A4_025_F', 'G4_05_F',
        'F4_025_F', 'F4_025_F', 'E4_025_F', 'E4_025_F', 'D4_025_F', 'D4_025_F', 'C4_05_F']

};

let RingAround = {
    name: "Ring Around the Posies",
    fileloc: "TEMPLATE",
    song: [ 
            'F4_025_F', 'F4_025_F', 'F4_025_F', 'F4_025_F',
            'F4_05_F', 'C4_025_F', 'C4_025_F',
            'A4_025_F', 'A4_025_F', 'A4_025_F', 'A4_025_F',
            'A4_05_F', 'F4_05_F', 
            'C5_05_F', 'C5_05_F',
            'C5_05_F', 'C5_025_F', 'C5_025_F',
            'C5_05_F', 'C5_025_F', 'C5_025_F',
            'F4_05_F']

};

let Sample_Song = {
    name: "Sample",
    fileloc: "Eine_Kleine_Nachtmusik_by_Mozart_Copyright_Free_Music",
    song: []

};


// Note: Artifical delay creator helper function. DO NOT use outside of testing purposes. 
const delay = ms => new Promise(res => setTimeout(res, ms));



export default class PlayButton extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        additional_players: [],
        color: 'red',
    }

    getColor(){
        var randomColor = require('randomcolor'); // import the script
        this.setState({
            color: randomColor({luminosity: 'light'}),
        });
    } 

    async getAdditionalPlayers() {
        try{
          let additional_players_temp = await AsyncStorage.getItem("Players");
          if(additional_players_temp != null){
            this.setState({
                additional_players: JSON.parse(additional_players_temp),
            });
          }
        }
        catch(err){
          alert(err);
        }
    }

    async componentDidMount() {
        this.getColor();
        this.getAdditionalPlayers();
        this.setState({
            currentMusic: TwinkleTwinkle,
            noteName: "Initalized_state",
            // TODO, fetch instrument settings. 
            instruments: ["clarinet", "saxophone", "violin"]
        });
        this.noteNum = 0;
        this.instrumentChoice = 0;
        this.check_initalized = false;
        // TODO: set proper song object here, from album.
        this.currentPlaylistTemp = [TwinkleTwinkle, RingAround, Sample_Song];
        this.currentMusicChoice = 0;
        this.pause = false;
        


        this._onPlaybackStatusUpdate = async (playbackStatus) => {
            // loads correct note to play, iterates song note after playing
            //let stop = await AsyncStorage.getItem("stopPlay");
            //if(stop == "True"){
            //    this.music.unloadAsync();
            //}
            if (!playbackStatus.isLoaded) {
                // temporary sample tester. 
                if (this.state.currentMusic.name === "Sample") {
                    await this.music.loadAsync(
                        require('../assets/music/Eine_Kleine_Nachtmusik_by_Mozart_Copyright_Free_Music.mp3')
                    );
                }
                // TODO: add more switching action for music note changes etc. 
                else {
                    const wordsd = this.instrumentChoice;
                    const instrument_Final = this.state.instruments[wordsd]
                    if (this.pause && !this.music.isLoaded) {
                        await this.music.loadAsync(
                            require('../assets/music/Soundless.mp3')
                        );
                    }
                    else {
                        switch (instrument_Final) {
                            case "clarinet":
                                switch (this.state.currentMusic.song[this.noteNum]) {
                                    case 'A4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_A4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'A4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_A4_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'B4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_B4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'B4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_B4_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'C4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_C4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'C4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_C4_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'C5_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_C5_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'C5_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_C5_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'D4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_D4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'D4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_D4_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'E4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_E4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'E4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_E4_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'F4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_F4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'F4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_F4_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'G4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_G4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'G4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/clarinet_G4_025_forte_normal.mp3')
                                        );
                                        break;
                                    default:
                                        console.log('Clarinet note not found\n');
                                        console.log(this.state.currentMusic.song[this.noteNum]);
                                }
                                break;

                            case "saxophone":
                                switch (this.state.currentMusic.song[this.noteNum]) {
                                    case 'A4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_A4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'A4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_A4_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'B4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_B4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'B4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_B4_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'C4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_C4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'C4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_C4_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'C5_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_C5_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'C5_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_C5_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'D4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_D4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'D4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_D4_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'E4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_E4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'E4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_E4_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'F4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_F4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'F4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_F4_025_forte_normal.mp3')
                                        );
                                        break;
                                    case 'G4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_G4_05_forte_normal.mp3')
                                        );
                                        break;
                                    case 'G4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/saxophone_G4_025_forte_normal.mp3')
                                        );
                                        break;
                                    default:
                                        console.log('Saxophone note not found\n');
                                        console.log(this.state.currentMusic.song[this.noteNum]);
                                }
                                break;
                            // TODO
                            case "violin":
                                switch (this.state.currentMusic.song[this.noteNum]) {
                                    case 'A4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_A4_05_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'A4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_A4_025_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'B4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_B4_05_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'B4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_B4_025_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'C4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_C4_05_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'C4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_C4_025_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'C5_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_C5_05_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'C5_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_C5_025_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'D4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_D4_05_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'D4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_D4_025_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'E4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_E4_05_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'E4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_E4_025_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'F4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_F4_05_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'F4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_F4_025_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'G4_05_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_G4_05_forte_arco-normal.mp3')
                                        );
                                        break;
                                    case 'G4_025_F':
                                        await this.music.loadAsync(
                                            require('../assets/music/violin_G4_025_forte_arco-normal.mp3')
                                        );
                                        break;
                                    default:
                                        console.log('violin note not found\n');
                                        console.log(this.state.currentMusic.song[this.noteNum]);

                                }
                                break;

                            default:
                                console.log("music instrument not found\n");
                                console.log(wordsd);
                        }
                        this.noteNum++;
                    }
                    
                }
                
                await this.music.playAsync();
            }
            //bugreporting
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            }
            // unloads note to play next note
            else if (playbackStatus.didJustFinish) {
                //console.log('note fin\n');
                this.music.unloadAsync();
                if (this.pause && !this.music.isLoaded) {
                    await this.music.loadAsync(
                        require('../assets/music/Soundless.mp3')
                    );
                    await this.music.playAsync();
                }
                else if (this.noteNum >= this.state.currentMusic.song.length) {
                    this.currentMusicChoice = this.currentMusicChoice + 1
                    if (this.currentMusicChoice < 3) {
                        this.state.currentMusic = this.currentPlaylistTemp[this.currentMusicChoice];
                        this.noteNum = 0;
                        delay(5000);
                    }
                    else {
                        this.check_initalized = false;
                    }
                    
                }
            }

        };
    }

    onPlay = () => {
        
        //plays music
        if (this.check_initalized === false) {
            try {
                this.music = new Audio.Sound();
                this.isPlayingCheck = true;
                this.check_initalized = true;
                this.music.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);

                try {
                    this.music.unloadAsync();
                }
                catch (error) {
                    console.log("Error, unable to unsync?");
                }
                this.noteNum = 0;
            }
            catch (error) {
                // An error occurred!
                console.log("Error, unable to start playing song");
            }
        }
        else {
            if (this.isPlayingCheck) {
                try {
                    //this.music.pauseAsync();
                    const numchoice = this.instrumentChoice;
                    this.instrumentChoice = numchoice +  1;
                    if (this.instrumentChoice >= this.state.instruments.length) {
                        this.instrumentChoice = 0;
                    }
                    //this.music.playAsync();
                }
                catch (error) {
                    console.log("Error, unable to change instrument \n")
                }
            }
            
        }
    }
    
    // Not sure why this isnt working yet 
    
    onlongPlay = async() => {
        console.log("long pressed, attempting to pause\n");
        if (!this.pause) {
            this.pause = true;
            if (this.state.currentMusic.fileloc != "TEMPLATE") {
                try {
                    await this.music.pauseAsync();
                }
                catch (error) {
                    console.log("failed to pause");
                }
            }
            
        }
        else {
            this.pause = false;
            if (this.state.currentMusic.fileloc != "TEMPLATE") {
                try {
                    await this.music.playAsync();
                }
                catch (error) {
                    console.log("failed to pause");
                }
            }
        }
    }
    
    render() {
        this.additional_players = this.state.additional_players.map((item, index) => 
        <Theme.View key={index+2} style={CustomStyleSheet.styles.containerRow}>
            <ThemeRipple name={item} style={CustomStyleSheet.styles.playButton}
            rippleColor={this.state.color}
            rippleDuration={1200} 
            rippleOpacity={0.87} 
            onPress={this.onPlay}
            onPressOut={() => this.getColor()}
            //onPressOut={this.onPlayOut}
            rippleSize={150}>
                <Theme.Text  style={CustomStyleSheet.styles.playButtonText}>
                    Player {index+2}: {item}
                </Theme.Text>
            </ThemeRipple> 
            </Theme.View>
        );
        return (
            <Theme.View style={CustomStyleSheet.styles.container}>
                <Theme.View key={1} style={CustomStyleSheet.styles.containerRow}>
                <ThemeRipple style={CustomStyleSheet.styles.playButton}
                    rippleColor={this.state.color} 
                    rippleDuration={1200} 
                    rippleOpacity={0.87} 
                    onLongPress={this.onlongPlay}
                    onPress={this.onPlay}
                    onPressOut={() => this.getColor()}
                    //onPressIn={this.onPlayin}
                    //onPressOut={this.onPlayOut}
                    
                    rippleSize={150}>
                    <Theme.Text style={CustomStyleSheet.styles.playButtonText}>
                        Player 1: Bubba
                    </Theme.Text>
                </ThemeRipple>
                </Theme.View>
                {this.additional_players}
            </Theme.View>
        );
    }
}
