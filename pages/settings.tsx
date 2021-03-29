import IsAuthenticated from '@components/auth/IsAuthenticated';
import LogoutButton from '@components/auth/LogoutButton';
import AccountForm from '@components/forms/AccountForm';
import { supabase } from '@utils/supabase';
import { User } from '@utils/types';
import { GetServerSideProps } from 'next';

type SettingsPageProps = {
  user?: User | null;
};

const SettingsPage = ({ user }) => {
  return (
    <div className="settings container-wrapper">
      <div className="container">
        <IsAuthenticated strict>
          <h1>Settings</h1>
          <p>All your settings should go here</p>
          <AccountForm user={user} />
          <section className="logout">
            <LogoutButton />
          </section>
        </IsAuthenticated>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
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
