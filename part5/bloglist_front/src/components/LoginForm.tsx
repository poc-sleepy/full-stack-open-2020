import React, { useState } from 'react';

type Props = {
  loginHandler: (user: { username: string; password: string }) => Promise<void>;
};

const LoginForm: React.FC<Props> = (props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void props.loginHandler({ username, password });
  };

  return (
    <form onSubmit={loginHandler}>
      <div>
        username:
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
      </div>
      <button type="submit" id="login_button" value="login">
        login
      </button>
    </form>
  );
};

export default LoginForm;
