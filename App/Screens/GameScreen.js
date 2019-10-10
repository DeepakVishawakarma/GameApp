/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  addGameText,
  resetGame,
  confirmGame,
  randomNumber,
  scoreNumber,
  attamptChance,
  rePlay,
} from './../Actions/gameAction';
import {connect} from 'react-redux';

class GameScreen extends Component {
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

  shouldLower = () => {
    const {randNumber, text} = this.props;
    console.log('TCL: GameScreen -> shouldLower -> text type', text);
    if (text <= randNumber) {
      console.log(
        'TCL: GameScreen -> shouldLower -> text < randNumber',
        text < randNumber,
      );
      this.props.scoreNumber();
      this.generateRandomNumber(1, 99, randNumber);
    } else {
      Alert.alert('The Number is Greater', 'Play Again', [
        {
          text: 'Ok',
          style: 'destructive',
          onPress: this.generateRandomNumber(1, 99, randNumber),
        },
      ]);
      this.props.attamptChance();
    }
  };

  shouldGreater = () => {
    const {randNumber, text} = this.props;
    console.log('TCL: GameScreen -> shouldGreater -> text', text);
    if (text >= randNumber) {
      this.props.scoreNumber();
      this.generateRandomNumber(1, 99, randNumber);
    } else {
      Alert.alert('The Number is Lower', 'Play Again', [
        {
          text: 'Ok',
          style: 'destructive',
          onPress: this.generateRandomNumber(1, 99, randNumber),
        },
      ]);
      this.props.attamptChance();
    }
  };

  render() {
    const {attempt, randNumber, score} = this.props;
    return (
      <View style={{alignItems: 'center'}}>
        {attempt > 0 && (
          <View style={{padding: 10, alignItems: 'center', marginBottom: 50}}>
            <Text style={{fontSize: 18}}>Guess Numbers is</Text>
            <Text style={{fontSize: 25}}>{randNumber}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                width: wp(60),
              }}>
              <Button
                title="Lower"
                onPress={() => {
                  this.shouldLower();
                }}
              />
              <Button
                title="Greater"
                onPress={() => {
                  this.shouldGreater();
                }}
              />
            </View>
          </View>
        )}
        {attempt === 0 && (
          <View
            style={{
              height: hp('50'),
              width: wp('50'),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 26}}>Game Over</Text>
            <Text style={{fontSize: 18, marginBottom: 20}}>
              Score is: {score}
            </Text>
            <Button
              title="Replay a Game"
              onPress={() => {
                this.props.rePlay();
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({gameR}) => {
  const {text, confirmed, randNumber, score, attempt} = gameR;
  console.log('TCL: mapStateToProps -> gameR', gameR);
  return {
    text,
    confirmed,
    randNumber,
    score,
    attempt,
  };
};

export default connect(
  mapStateToProps,
  {
    addGameText,
    resetGame,
    confirmGame,
    randomNumber,
    scoreNumber,
    attamptChance,
    rePlay,
  },
)(GameScreen);
