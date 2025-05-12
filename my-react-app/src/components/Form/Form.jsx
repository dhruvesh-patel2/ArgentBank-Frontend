import { useRef } from "react";

const Form = () => {
  const postForm = useRef();

  return (
    <form ref={postForm}>
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
      </div>
      <div className="input-remember">
        <input id="remember-me" name="remember" type="checkbox" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
  );
};

export default Form;
