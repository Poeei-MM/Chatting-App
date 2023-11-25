// src/redux/reducers/chatReducer.js
const initialState = {
  users: {
    user1: [],
    user2: [],
  },
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      const { user, message } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [user]: [...state.users[user], { text: message, sender: user }],
        },
      };
    case 'LOAD_MESSAGES':
      const { user: loadUser, messages } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [loadUser]: messages,
        },
      };
    default:
      return state;
  }
};

export default chatReducer;
