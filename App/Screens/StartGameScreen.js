/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  addGameText,
  resetGame,
  confirmGame,
  randomNumber,
  gameStarted,
} from './../Actions/gameAction';
import Colors from './../Constants/Colors';
import {connect} from 'react-redux';

class StartGameScreen extends Component {
  GameText = text => {
    const textValue = text.replace(/[^0-9]/g, '');
    this.props.addGameText(textValue);
  };

  startGame = () => {
    const {text} = this.props;
    this.props.gameStarted();
    this.generateRandomNumber(1, 99, text);
  };

  generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randNum = Math.floor(Math.random() * (max - min)) + min;
    console.log(
      'TCL: StartGameScreen -> generateRandomNumber -> randNum',
      randNum,
      max,
      min,
    );
    if (randNum === exclude) {
      this.generateRandomNumber(min, max, exclude);
    } else {
      this.props.randomNumber(randNum);
    }
  };

  onConfirm = () => {
    const {text} = this.props;
    console.log('TCL: StartGameScreen -> text', typeof text);
    if (text === 0) {
      Alert.alert(
        'Invalid Number',
        'Number has to be a number between 1 and 99.',
        [{text: 'Ok', style: 'destructive', onPress: this.props.resetGame()}],
      );
    } else {
      this.props.confirmGame(text);
      Keyboard.dismiss();
    }
  };

  render() {
    const {text, confirmed, randNumber} = this.props;
    console.log('TCL: StartGameScreen -> render -> text', text, confirmed);
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View
          style={{
            flex: 1,
            padding: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginVertical: 10,
              color: '#000',
              fontSize: 20,
              textAlign: 'center',
            }}>
            Start a New Game!
          </Text>
          <View
            style={{
              alignItems: 'center',
              width: wp('70'),
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 6,
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 10,
            }}>
            <Text>Select a Number</Text>
            <TextInput
              style={{
                width: wp('10'),
                alignItems: 'center',
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
              value={text}
              maxLength={2}
              keyboardType="number-pad"
              placeholder=""
              onChangeText={text => {
                this.GameText(text);
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                width: wp('70'),
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}>
              <View style={{width: wp('25')}}>
                <Button
                  title="Reset"
                  color={Colors.primary}
                  onPress={() => {
                    this.props.resetGame();
                  }}
                />
              </View>
              <View style={{width: wp('25')}}>
                <Button
                  title="Confirm"
                  color={Colors.secondary}
                  onPress={() => this.onConfirm()}
                />
              </View>
            </View>
          </View>
          {confirmed && (
            <View style={{width: wp(50)}}>
              <Text style={{marginTop: 20, fontSize: 16, marginBottom: 10}}>
                Choosen Number: {text}
              </Text>
              <Button title="START GAME" onPress={() => this.startGame()} />
            </View>
          )}
          <Text>{randNumber}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = ({gameR}) => {
  const {text, confirmed, randNumber} = gameR;
  return {
    text,
    confirmed,
    randNumber,
  };
};

export default connect(
  mapStateToProps,
  {
    addGameText,
    resetGame,
    confirmGame,
    randomNumber,
    gameStarted,
  },
)(StartGameScreen);
