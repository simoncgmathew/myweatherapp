import React, { ReactElement } from 'react';
import { Image, ImageURISource, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../theme/colors';
import { metrics } from '../theme/metrics';

/**
 * We define as having a title, optionally having an icon on the left and an on press callback
 */
interface Row {
  title: string;
  leftIcon?: ImageURISource;
  onPress?: () => void;
}

/**
 * The list has a title and a list of rows
 */
interface Props {
  title: string;
  rows: Row[];
}

export function OptionsList(props: Props): ReactElement<Props> {
  return (
    <>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.container}>
        {props.rows.map((row, index) => {
          return (
            <TouchableOpacity key={index} onPress={row.onPress}>
              <View style={styles.row}>
                {row.leftIcon != null && <Image source={row.leftIcon} style={styles.rowLeftSide} />}
                <View
                  style={{
                    ...styles.rowRightSide,
                    borderBottomWidth:
                      // Don't draw bottomBorder for final element
                      index !== props.rows.length - 1 ? 1 : undefined,
                  }}
                >
                  <Text style={styles.rowText}>{row.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: metrics.borderRadius,
    paddingRight: 0,
    marginVertical: metrics.baseMargin,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: metrics.h1FontSize,
    color: colors.title,
  },
  row: {
    flexDirection: 'row',
    marginLeft: metrics.baseMargin,
  },
  rowRightSide: {
    flex: 1,
    marginLeft: metrics.baseMargin,
    paddingVertical: metrics.baseMargin,
    borderBottomColor: colors.veryLightGrey,
    alignContent: 'center',
  },
  rowText: {
    fontSize: metrics.h3FontSize,
    color: colors.bodyTextColor,
    paddingVertical: metrics.smallMargin,
    textAlignVertical: 'center',
  },
  rowLeftSide: {
    height: metrics.icons.smallMedium,
    width: metrics.icons.smallMedium,
    alignSelf: 'center',
  },
});
