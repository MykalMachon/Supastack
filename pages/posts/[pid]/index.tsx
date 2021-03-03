import { GetServerSideProps } from 'next';

const EditPostPage = ({ post }) => {
  return (
    <main>
      <h1>{post}</h1>
      <p>This should be a specific post!</p>
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
