import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PATHS } from '../../app-config/constants';
import styles from '../../styles/Home.module.css';

const Fetching: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="./">Fetching Page</a>
        </h1>
        <p className={styles.description}>
          This is <code className={styles.code}>Fetching Page</code> page.
        </p>
        <div className={styles.grid}>
          <Link href={'/'}>
            <a className={styles.card}>
              <h2>Back to Home &rarr;</h2>
              Welcome to Next.js!
            </a>
          </Link>
        </div>
        <div className={styles.grid}>
          {posts?.map((item, idx) => {
            return (
              <Link
                as={`${PATHS.FETCHING}/${item.id}`}
                href={PATHS.FETCHING_DETAIL}
                key={`fetching-item-key-${idx}`}
              >
                <a className={styles.card}>
                  <h2>{item.title} &rarr;</h2>
                  {item.body}
                </a>
              </Link>
            );
          })}
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

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

Fetching.getInitialProps = async (params): Promise<{ posts: Post[] }> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = (await res.json()) as Post[];
  return { posts: json };
};

export default Fetching;
