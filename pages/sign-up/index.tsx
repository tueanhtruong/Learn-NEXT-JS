import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="./">Sign Up Page</a>
        </h1>
        <p className={styles.description}>
          This is <code className={styles.code}>Sign Up Page</code> page.
        </p>
        <div className={styles.grid}>
          <Link href={'/'}>
            <a className={styles.card}>
              <h2>Back to Home &rarr;</h2>
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

export default Home;
