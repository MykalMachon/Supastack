import IsAuthenticated from '@components/auth/IsAuthenticated';
import LogoutButton from '@components/auth/LogoutButton';
import AccountForm from '@components/forms/AccountForm';
import { supabase } from '@utils/supabase';
import { User } from '@utils/types';
import { GetServerSideProps } from 'next';

type SettingsPageProps = {
  user?: User;
};

const SettingsPage = ({ user }: SettingsPageProps) => {
  return (
    <div className="settings container-wrapper">
      <div className="container">
        <IsAuthenticated strict>
          <h1>Settings</h1>
          <p>All your settings should go here</p>
          <section>
            <h2>Account Info</h2>
            <AccountForm user={user} />
          </section>
          <section className="logout">
            <h2>Logout</h2>
            <LogoutButton />
          </section>
        </IsAuthenticated>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { data: publicUser } = await supabase
    .from('users')
    .select()
    .filter('id', 'eq', user.id)
    .single();

  return {
    props: {
      user: publicUser || null,
    },
  };
};

export default SettingsPage;
