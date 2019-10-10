export const addGameText = text => dispatch => {
  dispatch({type: 'ADD_GAME_TEXT', payload: text});
};

export const resetGame = () => dispatch => {
  dispatch({type: 'RESET_GAME_TEXT'});
};

export const confirmGame = text => dispatch => {
  dispatch({type: 'CONFIRM_GAME_TEXT', payload: text});
};

export const gameStarted = () => dispatch => {
  dispatch({type: 'GAME_STARTED'});
};

export const randomNumber = text => dispatch => {
  dispatch({type: 'SAVE_RANDOM_NUMBER', payload: text});
};

export const scoreNumber = () => (dispatch, getState) => {
  const {gameR} = getState();
  const {score} = gameR;
  let scores = score + 1;
  console.log('TCL: scoreNumber -> scores', scores);
  dispatch({type: 'SCORE_NUMBER', payload: scores});
};

export const attamptChance = () => (dispatch, getState) => {
  const {gameR} = getState();
  const {attempt} = gameR;
  let attempted = attempt - 1;
  dispatch({type: 'WRONG_ATTEMPT_NUMBER', payload: attempted});
};

export const rePlay = () => dispatch => {
  dispatch({type: 'REPLAY_GAME'});
};
