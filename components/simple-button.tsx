import React, { ReactElement } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { colors } from '../theme/colors';
import { metrics } from '../theme/metrics';

/**
 * A sum type which states that the theme can be primary or secondary.
 * If you've not heard of a sum type before, this article may be of interest (although it's not Typescript specific) https://adapptor.com.au/blog/sum-types-in-swift-and-kotlin
 */
export type ButtonTheme = 'primary' | 'secondary';

interface Props {
  /** The label that will be present on the button */
  title: string;
  /**
   * The callback that will be called when the button is pushed. Particularly during development, it's useful to make these callbacks
   * optional so we can build and style it without assigning any actions to the button.
   */
  onPress?: () => void;
  /**
   * An optional styling property. Most commonly used for setting custom width and height of the button
   */
  style?: StyleProp<ViewStyle>;
  /**
   * An optional true|false property which tells us whether or not this button should use a secondary style.
   */
  secondary?: boolean;
  disabled?: boolean;
}

export function SimpleButton(props: Props): ReactElement<Props> {
  const buttonTheme: ButtonTheme = props.secondary === true ? 'secondary' : 'primary';
  return (
    // Touchable Opacity is a commonly used element which provides an on press callback
    // and the opacity fades as the user presses the button.
    <TouchableOpacity
      onPress={props.onPress}
      // Style can either take a style object, or a list of style objects. The properties from later objects in the list may override properties from
      // earlier objects in the list. props.style is an optional property, and so it's not always going to override the default styling.
      style={[styles[buttonTheme].container, props.style]}
      disabled={props.disabled}
    >
      <Text style={styles[buttonTheme].title}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const commonStyles = StyleSheet.create({
  container: {
    padding: metrics.largerMargin,
    borderRadius: metrics.borderRadius,
  },
  title: {
    fontSize: metrics.h2FontSize,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const whiteOnRedStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: colors.buttonRed,
  },
  title: {
    ...commonStyles.title,
    color: colors.buttonWhite,
    fontWeight: 'bold',
  },
});

const redOnWhiteStyles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: colors.buttonWhite,
  },
  title: {
    ...commonStyles.title,
    color: colors.buttonRed,
  },
});

const styles = {
  primary: whiteOnRedStyles,
  secondary: redOnWhiteStyles,
};
