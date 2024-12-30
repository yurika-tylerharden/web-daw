import React, { useState } from 'react';
import './AuthPage.css'; // Create simple styling for the black background

const AuthPage = ({ onAuthSuccess }) => {
    const [password, setPassword***REMOVED*** = useState('');
    const [error, setError***REMOVED*** = useState(false);

    const handleLogin = () => {
        if (password === "!dasteworld!") {
            onAuthSuccess();
        } else {
            setError(true);
        }
    };

    return (
        <div className="auth-page">
            <h1 className="title">daste.tracks</h1>
            <input
                type="password"
                className="password-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="login-button">Enter</button>
            {error && <p className="error-text">Incorrect password. Please try again.</p>}
        </div>
    );
};

export default AuthPage;
