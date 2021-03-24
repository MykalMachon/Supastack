import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main className="site-content">{children}</main>
    </div>
  );
};

export default Layout;
