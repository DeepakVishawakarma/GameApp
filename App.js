import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './App/Component/Header';
import StartGameScreen from './App/Screens/StartGameScreen';
import GameScreen from './App/Screens/GameScreen';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    const {gameStart} = this.props;
    return (
      <View style={styles.screen}>
        <Header title="Guess a Number" />
        {gameStart && <StartGameScreen />}
        {!gameStart && <GameScreen />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

const mapStateToProps = ({gameR}) => {
  const {gameStart} = gameR;
  return {
    gameStart,
  };
};

export default connect(
  mapStateToProps,
  null,
)(App);
