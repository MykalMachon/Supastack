import { GetServerSideProps } from 'next';

const EditPostPage = ({ post }) => {
  return (
    <main>
      <h1>Edit Posts</h1>
      <p>the pid is {post}</p>
      <p>
        The user should be logged in and the post should be made by the user
      </p>
    </main>
  );
};

export default EditPostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pid } = context.params;
  return {
    props: {
      post: pid,
    },
  };
};
