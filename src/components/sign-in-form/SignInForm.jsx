import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/Button";
import FormInput from "../form-input/FormInput";
import "./sign-in.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const googleSignIn = async () => {
  try {
    const { user } = await signInWithGooglePopup();
    // console.log(user);
    const userDocRef = await createUserDocumentFromAuth(user);
  } catch (error) {
    // console.log(error.code);
    switch (error.code) {
      case "auth/popup-closed-by-user":
        console.log("popup window closed by user");
    }
  }
};

const alertErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-credential":
      alert("wrong email or password");
      break;
    case "auth/weak-password":
      alert("weak password");
      break;

    default:
      console.log(errorCode);
      break;
  }
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
      const { user } = await signInUserWithEmailAndPassword(email, password);

      //   console.log(user);
      setFormFields(defaultFormFields);
    } catch (error) {
      //   console.log(error.code);
      alertErrorMessage(error.code);
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
