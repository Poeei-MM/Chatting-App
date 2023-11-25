// src/components/ChatBox.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, loadMessages } from '../redux/actions/chatActions';
import moment from 'moment';

const ChatBox = ({ user }) => {
    const messages = useSelector((state) => state.chat.users);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            dispatch(sendMessage(user, message, moment()));
            // Save messages to local storage whenever messages are updated
            saveMessagesToLocalStorage();
            setMessage('');

            setTimeout(() => {
                dispatch(sendMessage(user === 'user1' ? 'user2' : 'user1', message));
            }, 1000);
        }
    };

    const saveMessagesToLocalStorage = useCallback(() => {
        // Save messages to local storage
        const allMessages = JSON.parse(localStorage.getItem('chatMessages')) || {};
        const userMessages = allMessages[user] || [];
        if (message.trim() !== '') {
            userMessages.push({ sender: user, text: message, time: moment()});
        }
        allMessages[user] = userMessages;

        localStorage.setItem('chatMessages', JSON.stringify(allMessages));
    }, [user, message]);

    const retrieveMessagesFromLocalStorage = useCallback(() => {
        // Retrieve messages from local storage
        const allMessages = JSON.parse(localStorage.getItem('chatMessages')) || {};
        return allMessages[user] || [];
    }, [user, message]);

    useEffect(() => {
        // Load messages from local storage when the component mounts
        dispatch(loadMessages(user, retrieveMessagesFromLocalStorage()));
        scrollToBottom();
    }, [user, dispatch]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const flattenedMessages = Object.keys(messages).reduce(
        (result, time) => result.concat(messages[time]),
        []
    ).sort((a, b) => {
        const timeA = moment(a.time);
        const timeB = moment(b.time);
        return timeA - timeB;
    });

    return (
        <div className="chat-box">
            <div className="card">
                <h6 className="card-title text-center p-2">Welcome From Our Chatting App...</h6>
                <div className="card-body">
                    <div className="chat-box">
                        {/* <ul className="list-unstyled">
                            {
                            flattenedMessages.map((msg, index) => (
                                <li key={index}
                                    className={`bg-light my-2 p-2 rounded ${msg.sender === user ? 'sent' : 'received'}`}>
                                    <div className={`d-flex ${msg.sender === user ? 'justify-content-end' : 'justify-content-start'}`}>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAMAAAC4XpwXAAAAYFBMVEX///8AAADw8PA0NDTCwsLGxsb4+Pj19fXW1tZ7e3ucnJwpKSkxMTHJycm6urqvr69ra2tgYGAgICCHh4c5OTmoqKjj4+NMTEzQ0NA/Pz8SEhJVVVUZGRnc3NyTk5NlZWXEd9MwAAACwElEQVRoge2aW7aiMBBFSZSXIE8BxavOf5a30+CCVhpSlQN+mD0A9xKSk6IqjmOKTPLCM/4VFr6btUI8PuK+lSehcLdX+2kueoKt3UEpBo6bqmUViTHxhqsuCFvxSiI3UXtu/qZW7MKkXtvtV82kuyMvj/6K8sOMuidcawVWy+6/pCu467ln/i/NDS0/v6/zGcCP/0hx/2GPlN+Icmj4+jHZHuH2Xrlse6NEySVDLgQq+jRCZoIDyE5/64odRu6x5EJgjt2Aacdsuj3Tjkkca7d2a/8eu2vt1k4A01Owdmv/NnvCtCcQ+4NpzwBueWHKhbiYN7LubLkQd2M77yOuw/xTjltbKMzPmdrAbv4RLXdseQxon3I3nBC5uZzVNulANE+4UYdpWvKXHaJlyW1dgJoXV6a8QcjZyw7TsUuZdkyn/LM9K2d6ErMEImsUvIMGU9o4jv/DkP/AmtSc8uaCkn+2Q8568bjZCH0wggn5HnrYXnFyRmmJmg0oauqea6EjYeqqx614hU8aRYoWPIumDSPh10BCgjxEyx2p/+zbFa5BRMvanggvdwpte4GXS/0tv8KTp2Q9/O6BcybYz3A75YMKVVQNUOpq/K0TyjGHPOA6Ppt1lBYGaPQ+QKsvsI9e6sdsR4QMHMpL7wC++lo/458UuNKK07rBJQ6newErqQmFxQDsoOP1zECP3md2DxB1rVfRF3xHURn3TlJqzoyJzA67hLPexrT8t+/yRzIDF96XRcDtUb5ypV+4qjOQW5HRYlfSj5V5Qv3sgbsJfmkygZvjvuz3DyYbfJ7osBB/Ke8OpS7xXPwkp1XditP/4me/7v9+Ek/1Ec/6N9RNaV6/8wL+zI/DYxx/0GDTY4g/6uV4DP0Nf2+7Nz6m6WoPgymzCTtp7dZu7db+Pfb1K5opTn2Ruf35qnhev5Of0Gfqr/8C4o8vCddFVegAAAAASUVORK5CYII=" width="20" height="20" alt={msg.sender} />
                                        <h6 className='px-2'>{msg.sender}</h6>
                                    </div>
                                    <p className="mt-0 mb-1">{msg.text}</p>
                                    <small>{moment(msg.time).fromNow()}</small>
                                </li>
                            ))
                            }
                        </ul> */}
                        <div className='row'>
                            {
                            flattenedMessages.map((msg, index) => (
                                <div key={index}
                                    className={`bg-light my-2 p-2 rounded ${msg.sender === user ? 'sent' : 'received'}`}>
                                    <div className={`d-flex ${msg.sender === user ? 'justify-content-end' : 'justify-content-start'}`}>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAMAAAC4XpwXAAAAYFBMVEX///8AAADw8PA0NDTCwsLGxsb4+Pj19fXW1tZ7e3ucnJwpKSkxMTHJycm6urqvr69ra2tgYGAgICCHh4c5OTmoqKjj4+NMTEzQ0NA/Pz8SEhJVVVUZGRnc3NyTk5NlZWXEd9MwAAACwElEQVRoge2aW7aiMBBFSZSXIE8BxavOf5a30+CCVhpSlQN+mD0A9xKSk6IqjmOKTPLCM/4VFr6btUI8PuK+lSehcLdX+2kueoKt3UEpBo6bqmUViTHxhqsuCFvxSiI3UXtu/qZW7MKkXtvtV82kuyMvj/6K8sOMuidcawVWy+6/pCu467ln/i/NDS0/v6/zGcCP/0hx/2GPlN+Icmj4+jHZHuH2Xrlse6NEySVDLgQq+jRCZoIDyE5/64odRu6x5EJgjt2Aacdsuj3Tjkkca7d2a/8eu2vt1k4A01Owdmv/NnvCtCcQ+4NpzwBueWHKhbiYN7LubLkQd2M77yOuw/xTjltbKMzPmdrAbv4RLXdseQxon3I3nBC5uZzVNulANE+4UYdpWvKXHaJlyW1dgJoXV6a8QcjZyw7TsUuZdkyn/LM9K2d6ErMEImsUvIMGU9o4jv/DkP/AmtSc8uaCkn+2Q8568bjZCH0wggn5HnrYXnFyRmmJmg0oauqea6EjYeqqx614hU8aRYoWPIumDSPh10BCgjxEyx2p/+zbFa5BRMvanggvdwpte4GXS/0tv8KTp2Q9/O6BcybYz3A75YMKVVQNUOpq/K0TyjGHPOA6Ppt1lBYGaPQ+QKsvsI9e6sdsR4QMHMpL7wC++lo/458UuNKK07rBJQ6newErqQmFxQDsoOP1zECP3md2DxB1rVfRF3xHURn3TlJqzoyJzA67hLPexrT8t+/yRzIDF96XRcDtUb5ypV+4qjOQW5HRYlfSj5V5Qv3sgbsJfmkygZvjvuz3DyYbfJ7osBB/Ke8OpS7xXPwkp1XditP/4me/7v9+Ek/1Ec/6N9RNaV6/8wL+zI/DYxx/0GDTY4g/6uV4DP0Nf2+7Nz6m6WoPgymzCTtp7dZu7db+Pfb1K5opTn2Ruf35qnhev5Of0Gfqr/8C4o8vCddFVegAAAAASUVORK5CYII=" width="20" height="20" alt={msg.sender} />
                                        <h6 className='px-2'>{msg.sender}</h6>
                                    </div>
                                    <p className="mt-0 mb-1">{msg.text}</p>
                                    <small>{moment(msg.time).fromNow()}</small>
                                </div>
                            ))
                            }
                        </div>
                    </div>

                    <div className="input-group mt-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
            <div ref={messagesEndRef}></div>
        </div>
    );
};

export default ChatBox;