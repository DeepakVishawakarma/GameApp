/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from './../Constants/Colors';

const Header = props => {
  const {title} = props;

  return (
    <View
      style={{
        width: wp('100'),
        height: 50,
        backgroundColor: Colors.primary,
        alignItem: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: 'black', fontSize: 18, textAlign: 'center'}}>
        {title}
      </Text>
    </View>
  );
};

export default Header;
