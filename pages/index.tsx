import IsAuthenticated from '@components/auth/IsAuthenticated';
import { FC, useEffect } from 'react';

const Homepage: FC<any> = () => {
  return (
    <main>
      <h1>Your Posts</h1>
      <section className="posts">
        <IsAuthenticated>
          <p>My posts go here...</p>
        </IsAuthenticated>
      </section>
    </main>
  );
};

export default Homepage;
