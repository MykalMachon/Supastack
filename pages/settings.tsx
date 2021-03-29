import IsAuthenticated from '@components/auth/IsAuthenticated';

const SettingsPage = () => {
  return (
    <section className="settings container-wrapper">
      <div className="container">
        <IsAuthenticated strict>
          <h1>Settings</h1>
          <p>All your settings should go here</p>
        </IsAuthenticated>
      </div>
    </section>
  );
};

export default SettingsPage;
