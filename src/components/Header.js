import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Platform} from 'react-native';
import {fonts, shadow} from '../../constants';
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
          fontFamily: style === undefined ? fonts.rounded : style.fontFamily,
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
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius - 1,
    shadowOffset: { width: 0, height: shadow.height - 1 },
  },
});

export default Header;
