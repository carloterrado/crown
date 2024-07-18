import SignUpForm from "../../components/sign-up-form/SignUpForm";

import "./auth.scss";

import SignInForm from "../../components/sign-in-form/SignInForm";

const Auth = () => {
  return (
    <div className="auth-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Auth;
