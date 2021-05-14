import React from 'react';

type Props = {
  loginHandler: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const LoginForm: React.FC<Props> = (props: Props) => (
  <form onSubmit={props.loginHandler}>
    <div>
      username:
      <input
        type="text"
        name="username"
        value={props.username}
        onChange={({ target }) => {
          props.setUsername(target.value);
        }}
      />
    </div>
    <div>
      password:
      <input
        type="password"
        name="password"
        value={props.password}
        onChange={({ target }) => {
          props.setPassword(target.value);
        }}
      />
    </div>
    <button type="submit" value="login">
      login
    </button>
  </form>
);

export default LoginForm;
