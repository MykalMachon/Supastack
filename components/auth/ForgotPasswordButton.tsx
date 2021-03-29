import useAuth from 'hooks/useAuth';

const ForgotPasswordButton = () => {
  const { user } = useAuth();

  const sendForgotPasswordEmail = () => {
    // TODO send update email
  };

  return <button onClick={sendForgotPasswordEmail}>Forgot password</button>;
};
