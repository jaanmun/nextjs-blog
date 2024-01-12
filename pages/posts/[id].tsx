import React from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPostIds, getPostData } from '../../lib/post';
import { PostDetail } from '../../models/post.model';
import Head from 'next/head';
import postStyle from '../../styles/Post.module.css';

const Post = ({ postData }: { postData: PostDetail }) => {
  return (
    <div className={postStyle.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllPostIds();
  console.log('paths : ', paths);
  // [{ parmas: { id: 'pre-rendering }}, { params: { id: 'ssg-ssr' }}]
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};
