// src/redux/actions/chatActions.js
export const sendMessage = (user, message, time) => ({
  type: 'SEND_MESSAGE',
  payload: { user, message, time },
});

export const loadMessages = (user, messages) => ({
  type: 'LOAD_MESSAGES',
  payload: { user, messages },
});
