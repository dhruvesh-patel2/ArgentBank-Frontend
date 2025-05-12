import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Form from "../../components/Form/Form";

const SignIn = () => {
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i>
          <FontAwesomeIcon icon={faCircleUser} />
        </i>
        <h1 className="sign-in-content__title">Sign In</h1>
        <Form />
      </section>
    </main>
  );
};

export default SignIn;
