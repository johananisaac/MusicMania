import * as Typography from './typography'
import * as Mixins from './mixins';
import * as Spacing from './spacing';
import { createStyle, createTheme } from 'react-native-theming';

export const themes = [
  createTheme({
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    buttonColor: '#FF0000',
    buttonText: '#FFFFFF',
    icon: require('../assets/icon.png'),
    statusBar: 'dark-content',
  }, 'Dark'),
  createTheme({
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    buttonColor: '#00FF00',
    buttonText: '#FFFFFF',
    icon: require('../assets/icon.png'),
    statusBar: 'light-content',
  }, 'Light'),
  createTheme({
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    buttonColor: '#FFA500',
    buttonText: '#FFFFFF',
    icon: require('../assets/icon.png'),
    statusBar: 'light-content',
  }, 'Light Orange'),
];

export const styles = createStyle({
  baseContainer: {
    flex: 1,
    backgroundColor: '@backgroundColor',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '@backgroundColor',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
  containerRow: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '@backgroundColor',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Paragraph
  baseParagraph: {
    ...Mixins.margin(24, 24, 0, 24),
    fontSize: Typography.FONT_SIZE_50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '@textColor',
  },
  paragraphInput: {
    fontSize: Typography.FONT_SIZE_50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '@textColor',
    ...Mixins.margin(24, 0, 0, 0),
    color: '@backgroundColor',
    borderColor: '@textColor',
    backgroundColor: '@textColor',
    width: '100%'
  },
  // Buttons
  baseButton: {
    width: '100%',
    backgroundColor: '@textColor',
    borderColor: '@buttonColor',
    borderRadius: 5,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    flex: 1,
    // margin: 20,
    height: '100%',
    width: '100%',
    backgroundColor: '@textColor',
    borderColor: '@buttonColor',
    borderRadius: 5,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    margin: 10,
    height: '100%',
    width: '100%',
    backgroundColor: '@textColor',
    borderColor: '@buttonColor',
    borderRadius: 5,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonShort: {
    height: '5%',
    width: '100%',
    backgroundColor: '@textColor',
    borderColor: '@backgroundColor',
    borderRadius: 5,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareButton: {
    margin: 5,
    width: Spacing.SCALE_100,
    height: Spacing.SCALE_100,
    backgroundColor: '@textColor',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    // borderColor: '@buttonColor',
    // borderWidth: 2,
  },
  squareButtonHighlighted: {
    margin: 5,
    width: Spacing.SCALE_100,
    height: Spacing.SCALE_100,
    backgroundColor: '@textColor',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#00FFFF',
    borderWidth: 2,
  },
  // ButtonText
  baseButtonText: {
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: '@backgroundColor',
    textAlign: 'center',
  },
  playButtonText: {
    fontSize: Typography.FONT_SIZE_90,
    // lineHeight: 100,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: '@backgroundColor',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: Typography.FONT_SIZE_75,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: '@backgroundColor',
    textAlign: 'center',
  },
  shortButtonText: {
    fontSize: Typography.FONT_SIZE_30,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: '@backgroundColor',
    textAlign: 'center',
  },
  buttonTextMedium: {
    fontSize: Typography.FONT_SIZE_25,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: '@backgroundColor',
    textAlign: 'center',
  },
  // Separator
  separator: {
    width: '100%',
    height: '3%',
    backgroundColor: '@backgroundColor'
  },
  // Title
  // headerStyling: {
  //   headerStyle: {
  //     backgroundColor: '@buttonColor',
  //   },
  //   headerTintColor: '@textColor',
  // },
  // Misc
  row: {
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  }
});
