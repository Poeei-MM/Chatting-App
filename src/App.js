import React, { useState, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import ChatBox from './components/ChatBox';
import './App.css';

const App = () => {
    const [users, setUsers] = useState(['user1', 'user2']);
    const [activeUser, setActiveUser] = useState(users[0]);

    const handleAddUser = () => {
        const newUser = `user${users.length + 1}`;
        setUsers([...users, newUser]);
        setActiveUser(newUser);
    };

    useEffect(() => {
        const updatdUsers = JSON.parse(localStorage.getItem('chatMessages')) || {};
        console.log(Object.keys(updatdUsers));
        setUsers([...Object.keys(updatdUsers)]);
    }, []);

    return (
        <Provider store={store}>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-6">
                        <ul className="nav nav-tabs">
                            {
                            users.map((user) => (
                                <li key={user} className="nav-item">
                                <button
                                    className={`nav-link ${activeUser === user ? 'active' : ''}`}
                                    onClick={() => setActiveUser(user)}
                                >
                                    {user}
                                </button>
                                </li>
                            ))
                            }
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleAddUser}>
                                + Add User
                                </button>
                            </li>
                        </ul>

                        <div className="tab-content">
                            {
                            users.map((user) => (
                                <div key={user} className={`tab-pane ${activeUser === user ? 'active show' : ''}`}>
                                    <ChatBox user={user} />
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Provider>
    );
};

export default App;