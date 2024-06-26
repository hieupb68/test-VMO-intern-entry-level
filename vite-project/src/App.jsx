import React, { useState, useRef, useEffect } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import './login.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleLogin = () => {
    if (!username || !password) {
      setError('Phải nhập tên người dùng và mật khẩu');
      return;
    }

    if (username.length < 6 || username.length > 20) {
      setError('Tên người dùng phải nhập từ 6-20 ký tự');
      return;
    }

    localStorage.setItem('username', username);
    setIsLoggedIn(true);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-form">
      {isLoggedIn ? (
        <div>
          <h2>Xin chào: {username}</h2>
        </div>
      ) : (
        <form className='form-container' onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="form-group">
            <label className="form-label">
              Tên đăng nhập
            </label>
            <div className="form-input-wrapper">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                ref={usernameRef}
                placeholder='Nhập 6-20 ký tự'
                required
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">
              Mật khẩu
            </label>
            <div className="form-input-wrapper">
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Mật khẩu'
                  required
                  className="form-input password-input"
                />
                {showPassword ? (
                  <BsEyeSlashFill onClick={handleShowPassword} className="icon-eye" />
                ) : (
                  <BsEyeFill onClick={handleShowPassword} className="icon-eye" />
                )}
              </div>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={!username || !password} className="submit-button">
            Đăng nhập
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
