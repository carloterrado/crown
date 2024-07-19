import { useState } from "react";
import {
  alertFirebaseErrorMessage,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/FormInput";
import "./signup-form.scss";
import Button, { BUTTON_TYPES_CLASSES } from "../button/Button";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validateFormInputs = (formInputs) => {
  if (!formInputs.displayName) return alert("display name is required!");
  if (!formInputs.email) return alert("email is required!");
  if (!formInputs.password) return alert("password is required!");
  if (!formInputs.confirmPassword)
    return alert("confirm password is required!");
  if (formInputs.password !== formInputs.confirmPassword)
    return alert("passwords do not match");
  return true;
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const valid = validateFormInputs(formFields);
    if (!valid) return;

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth({ ...user, displayName });

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
    <div className="sign-up-container">
      <h2>I do not have a account</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          value={displayName}
          name="displayName"
          onChange={handleChange}
          type="text"
          required
        />

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

        <FormInput
          label="Confirm Password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          type="password"
          required
        />

        <Button
          children="Sign Up"
          buttonType={BUTTON_TYPES_CLASSES.google}
          type="submit"
        />
      </form>
    </div>
  );
};

export default SignUpForm;
