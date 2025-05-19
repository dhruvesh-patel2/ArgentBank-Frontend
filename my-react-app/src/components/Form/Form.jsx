import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, getUserProfile } from "../../redux/userSlice";

const Form = () => {
  const postForm = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmailValue(rememberedEmail);
      setRememberMe(true); //remember me 
    }
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    const email = emailValue;
    const password = postForm.current["password"].value;

    try {
      const action = await dispatch(loginUser({ email, password, remember: rememberMe }));

      if (action.error) {
        setError("Incorrect email or password.");
      } else {
        const token = action.payload.token;
        const userAction = await dispatch(getUserProfile(token));

        if (userAction.error) {
          setError("Erreur lors de la récupération du profil.");
        } else {
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }
          navigate("/user");
        }
      }
    } catch (error) {
      console.error("Erreur complète:", error);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <form ref={postForm} onSubmit={handleForm}>
      <div className="input-wrapper">
        <label htmlFor="email">Username</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
      </div>
  
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
      </div>
  
      {error && (
        <div
          ref={errorRef}
          className="form-error"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
  
      <div className="input-remember">
        <input
          id="remember-me"
          name="remember"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
  
      <button type="submit" className="sign-in-button">
        Se connecter
      </button>
    </form>
  );
  
};

export default Form;
