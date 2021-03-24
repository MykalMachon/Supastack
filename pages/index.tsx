import IsAuthenticated from '@components/auth/IsAuthenticated';
import { FC, useEffect } from 'react';

const Homepage: FC<any> = () => {
  return (
    <>
      <section className="posts container-wrapper">
        <div className="container">
          <h1>Your Posts</h1>
          <IsAuthenticated>
            <p>My posts go here...</p>
          </IsAuthenticated>
        </div>
      </section>
    </>
  );
};

export default Homepage;
