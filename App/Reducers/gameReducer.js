const initialState = {
  text: '',
  confirmed: false,
  randNumber: '',
  score: 0,
  attempt: 3,
  gameStart: true,
};

const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_GAME_TEXT':
      return {
        ...state,
        text: action.payload,
      };

    case 'GAME_STARTED':
      return {
        ...state,
        gameStart: false,
      };

    case 'RESET_GAME_TEXT':
      console.log('TCL: goalReducer -> RESET_GAME_TEXT');
      return {
        ...state,
        text: '',
        confirmed: false,
      };

    case 'SAVE_RANDOM_NUMBER':
      console.log('TCL: goalReducer -> SAVE_RANDOM_NUMBER');
      return {
        ...state,
        randNumber: action.payload,
      };

    case 'CONFIRM_GAME_TEXT':
      return {
        ...state,
        text: action.payload,
        confirmed: true,
      };

    case 'SCORE_NUMBER':
      return {
        ...state,
        score: action.payload,
      };

    case 'WRONG_ATTEMPT_NUMBER':
      return {
        ...state,
        attempt: action.payload,
      };

    case 'REPLAY_GAME':
      return {
        text: '',
        confirmed: false,
        randNumber: '',
        score: 0,
        attempt: 3,
        gameStart: true,
      };

    default:
      return state;
  }
};

export default goalReducer;
