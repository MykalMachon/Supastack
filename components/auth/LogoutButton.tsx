import useSupabase from 'hooks/useSupabase';

const LogoutButton = () => {
  const client = useSupabase();

  const logout = () => {
    client.auth.signOut();
  };

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
