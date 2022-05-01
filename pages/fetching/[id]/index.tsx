import type { NextPage, NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '..';
import { PATHS } from '../../../app-config/constants';
import styles from '../../../styles/Home.module.css';

const FetchingDetail: NextPage<{ post: Post; comments: Comment[] }> = ({ post, comments }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="./">FetchingDetail Page</a>
        </h1>
        <p className={styles.description}>
          <code className={styles.code}>FetchingDetail Id</code> {post.id}
        </p>
        <h2>{post.title}</h2>
        <p>{post.body}</p>

        <div className={styles.grid}>
          {comments?.map((item, idx) => {
            return (
              <a className={styles.card} key={`fetching-item-key-comments-${idx}`}>
                <h4>Comment: {item.name}</h4>
                <h3>{item.body} &rarr;</h3>
                <span>by: {item.email}</span>
              </a>
            );
          })}
        </div>

        <div className={styles.grid}>
          <Link href={PATHS.FETCHING}>
            <a className={styles.card}>
              <h2>Back to Fetching &rarr;</h2>
              Welcome to Next.js!
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

FetchingDetail.getInitialProps = async (
  params: NextPageContext
): Promise<{ post: Post; comments: Comment[] }> => {
  const {
    query: { id = null },
  } = params;
  const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = (await resPost.json()) as Post;
  const resComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
  const comments = (await resComments.json()) as Comment[];
  return {
    post,
    comments,
  };
};

export default FetchingDetail;
