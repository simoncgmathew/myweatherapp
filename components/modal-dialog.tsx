import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SimpleButton } from './simple-button';
import { colors } from '../theme/colors';
import { metrics } from '../theme/metrics';

interface StandardModal {
  type: 'standard';
  text: string;
}
interface CustomModal {
  type: 'custom';
  element: ReactElement;
}

/**
 * The content type will either be standard, or custom.
 */
type ModalContentType = StandardModal | CustomModal;

interface Props {
  /**
   * The modal will/won't show depending on the show property
   */
  show: boolean;
  /**
   * The content type and it's payload.
   */
  content: ModalContentType;
  /**
   * The title to be displayed at the top of the modal
   */
  title: string;
  /**
   * Optionally an action to occur when clicking the OK button at the bottom of the dialog
   */
  dismissButton?: { title?: string; onDismiss?: () => void };
}

export function Modal(props: Props): ReactElement<Props> | null {
  if (!props.show) {
    return null;
  }
  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{props.title}</Text>
        {/**
         * If the content is standard, just render the text in the <Text> element
         */}
        {props.content.type === 'standard' && (
          <View style={styles.standardContentContainer}>
            <Text style={styles.message}>{props.content.text}</Text>
          </View>
        )}
        {/**
         * If the content is custom, render the element as is
         */}
        {props.content.type === 'custom' && <View style={styles.customContentContainer}>{props.content.element}</View>}
        <SimpleButton
          title={props.dismissButton?.title ?? 'OK'}
          style={{ width: '50%', alignSelf: 'center' }}
          onPress={props.dismissButton?.onDismiss}
          disabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    // We place the element over the entire screen and center it
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: colors.blankedOutBackground,
  },
  title: {
    fontSize: metrics.h1FontSize,
    alignSelf: 'center',
    paddingBottom: metrics.baseMargin,
  },
  innerContainer: {
    backgroundColor: colors.buttonWhite,
    minHeight: '30%',
    marginHorizontal: metrics.doubleMargin,
    padding: metrics.baseMargin,
    borderRadius: metrics.borderRadius,
  },
  standardContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  customContentContainer: {
    alignItems: 'center',
  },
  message: {
    fontSize: metrics.bodyFontSize,
  },
});
