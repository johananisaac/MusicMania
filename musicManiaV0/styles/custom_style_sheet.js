import * as Colors from './colors'
import * as Typography from './typography'
import * as Mixins from './mixins';
import * as Spacing from './spacing'

// Containers
export const baseContainer = {
  flex: 1,
  backgroundColor: Colors.BACKGROUND_COLOR,
  justifyContent: 'center',
  alignItems: 'center',
}

export const container = {
  ...baseContainer
}

export const containerRow =  {
  flexDirection: 'row',
  ...baseContainer
}

// Paragraph
export const baseParagraph = {
  ...Mixins.margin(24, 24, 0, 24),
  fontSize: Typography.FONT_SIZE_50,
  fontWeight: 'bold',
  textAlign: 'center',
  color: Colors.FOREGROUND_COLOR,
}

export const paragraphInput =  {
  ...baseParagraph,
  ...Mixins.margin(24, 0, 0, 0),
  color: Colors.BACKGROUND_COLOR,
  borderColor: Colors.FOREGROUND_COLOR,
  backgroundColor: Colors.FOREGROUND_COLOR,
  width: '100%'
}

// Buttons
export const baseButton = {
  width: '100%',
  backgroundColor: Colors.FOREGROUND_COLOR,
  borderColor: Colors.PRIMARY,
  borderRadius: 5,
  borderWidth: 2,
  alignItems: 'center',
  justifyContent: 'center',
}

export const playButton = {
  flex: 1,
  margin: 20,
  height: '100%',
  ...baseButton
}

export const button = {
  flex: 1,
  margin: 10,
  height: '100%',
  ...baseButton
}

export const buttonShort = {
  height: '5%',
  ...baseButton
}

export const squareButton = {
  margin: 5,
  width: Spacing.SCALE_100,
  height: Spacing.SCALE_100,
  backgroundColor: Colors.FOREGROUND_COLOR,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 5,
  borderColor: Colors.PRIMARY,
  borderWidth: 2,
}

// ButtonText
export const baseButtonText = {
  fontWeight: Typography.FONT_WEIGHT_BOLD,
  color: Colors.BLACK,
  textAlign: 'center',
}

export const playButtonText = {
  fontSize: Typography.FONT_SIZE_90,
  ...baseButtonText
}

export const buttonText = {
  fontSize: Typography.FONT_SIZE_90,
  ...baseButtonText
}

export const shortButtonText = {
  fontSize: Typography.FONT_SIZE_30,
  ...baseButtonText
}

export const buttonTextMedium = {
  fontSize: Typography.FONT_SIZE_30,
  ...baseButtonText
}

// Separator
export const separator = {
  width: '100%',
  height: '3%',
  backgroundColor: Colors.BACKGROUND_COLOR
}

// Misc
export const row = {
  flexDirection: 'row',
}

export const fullWidth = {
  width: '100%',
}