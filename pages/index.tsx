import type { GetStaticProps } from 'next';
import Head from 'next/head';
import homeStyles from '../styles/Home.module.css';
import { getSortedPostsData } from '../lib/post';
import { Post } from '../models/post.model';
import Link from 'next/link';

const Home = ({ allPostsData }: { allPostsData: Post[] }) => {
  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Jaanmun</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[Jaanmun Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostsData.map(({ id, title, date }) => (
            <li key={id} className={homeStyles.listItem}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={homeStyles.lightText}>{date}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
