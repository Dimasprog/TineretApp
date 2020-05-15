import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Platform} from 'react-native';
import {fonts} from '../../constants';
import {colors} from '../ColorSchemes';
import {Icon} from 'react-native-elements';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

function Header(props) {
  const {themeColor, style, pressEvent, title} = props;

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => pressEvent()}>
        <Icon
          type={'material-community'}
          name={'arrow-left-circle'}
          size={wp(10)}
          color={themeColor}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: themeColor,
          fontFamily:
            style === undefined
              ? Platform.OS === 'ios'
                ? null
                : fonts.rounded
              : style.fontFamily,
          fontSize: style === undefined ? wp(6.5) : style.fontSize - wp(1),
          alignSelf: 'center',
        }}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2},
  },
});

export default Header;
