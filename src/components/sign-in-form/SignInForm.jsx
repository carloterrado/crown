import { useState } from "react";
import {
  alertFirebaseErrorMessage,
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/Button";
import FormInput from "../form-input/FormInput";
import "./sign-in.scss";

const googleSignIn = async () => {
  try {
    await signInWithGooglePopup();
  } catch (error) {
    alertFirebaseErrorMessage(error.code);
  }
};

const defaultFormFields = {
  email: "",
  password: "",
};

const validateFormInputs = (formInputs) => {
  if (!formInputs.email) return alert("email is required!");
  if (!formInputs.password) return alert("password is required!");

  return true;
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const valid = validateFormInputs(formFields);
    if (!valid) return;

    try {
      await signInUserWithEmailAndPassword(email, password);
      setFormFields(defaultFormFields);
    } catch (error) {
      alertFirebaseErrorMessage(error.code);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with you email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          value={email}
          name="email"
          onChange={handleChange}
          type="email"
          required
        />
        <FormInput
          label="Password"
          value={password}
          name="password"
          onChange={handleChange}
          type="password"
          required
        />
        <div className="button-body-container">
          <Button children="Sign In" type="submit" />
          <Button
            children="Sign in with Google"
            buttonType="google"
            onClick={googleSignIn}
            type="button"
          />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
