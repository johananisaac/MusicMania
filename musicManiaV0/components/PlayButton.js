import * as React from 'react';
import { Component } from 'react';
import { Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { CustomStyleSheet } from '../styles'
// Use Animated library for ripples in the future
import Ripple from 'react-native-material-ripple';


// NOTE: ALL MUSIC FORMAT
// Note + _ + size of note, with decimal removed + _ + volume of note (try to keep it to F for now)
let TwinkleTwinkle = {
    name: "Twinkle Twinkle",
    clef: "T",
    beat: 4,
    beat2: 4,
    song: ['C4_025_F', 'C4_025_F', 'G4_025_F', 'G4_025_F', 'A4_025_F', 'A4_025_F', 'G4_05_F',
        'F4_025_F', 'F4_025_F', 'E4_025_F', 'E4_025_F', 'D4_025_F', 'D4_025_F', 'C4_05_F',
        'G4_025_F', 'G4_025_F', 'F4_025_F', 'F4_025_F', 'E4_025_F', 'E4_025_F', 'D4_05_F',
        'G4_025_F', 'G4_025_F', 'F4_025_F', 'F4_025_F', 'E4_025_F', 'E4_025_F', 'D4_05_F',
        'C4_025_F', 'C4_025_F', 'G4_025_F', 'G4_025_F', 'A4_025_F', 'A4_025_F', 'G4_05_F',
        'F4_025_F', 'F4_025_F', 'E4_025_F', 'E4_025_F', 'D4_025_F', 'D4_025_F', 'C4_05_F']

};

// Note: Artifical delay creator helper function. DO NOT use outside of testing purposes. 
const delay = ms => new Promise(res => setTimeout(res, ms));



export default class PlayButton extends Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        this.setState({ currentMusic: TwinkleTwinkle, noteName: "Initalized_state" });
        this.noteNum = 0
        // TODO: set proper song object here, from album.
        
    }

    onPlayIn = async () => {
        this.music = new Audio.Sound();
        this._onPlaybackStatusUpdate = async (playbackStatus) => {
            // loads correct note to play, iterates song note after playing
            if (!playbackStatus.isLoaded) {
                //console.log('note start\n');

                // TODO: add more switching action for music note changes etc. 
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
                        console.log('Music note not found\n');
                }
                this.noteNum++;
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
            }
            
        };
        //plays music
        try {
            this.music.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
            try {
                this.music.unloadAsync();
            }
            catch (error) {
                console.log("Error, unable to unsync?");
            }
            this.noteNum = 0;
        } catch (error) {
            // An error occurred!
            console.log("Error, unable to start playing song");
        }
    }
    /*
     * TODO: Unsure how to reimplement this yet
    onPlayOut = () => {
        this.music.pauseAsync();
    }
    */
    render() {
        return (
            <View style={CustomStyleSheet.container}>
                <Ripple style={CustomStyleSheet.playButton}
                    onPress={this.onPlayIn}
                    //onPressOut={this.onPlayOut}
                    rippleSize={150}>
                    <Text style={CustomStyleSheet.playButtonText}>
                        Touch anywhere on the screen to play music!
          </Text>
                </Ripple>
            </View>
        );
    }
}
