import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { BlogpageHeaderBG, BlogpageBottomBG } from '@site/src/components/Blog/BlogpageBG';
import { BlogHeader } from '@site/src/components/Blog/BlogHeader';
import { EditorPick } from '@site/src/components/Blog/EditorPick';
import { AllPosts } from '@site/src/components/Blog/AllPosts';

export default function BlogOverview() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Apache DevLake is an open-source dev data platform that ingests, analyzes, and visualizes the fragmented data from DevOps tools to distill insights for engineering productivity.">
      <div className='bg-[#f8f8f8]'>
        <div className='mx-auto bg-white max-w-[100vw] overflow-hidden relative'>
          <BlogpageHeaderBG />
          <main 
          className='
          text-start w-[70%] max-w-[1200px] sm:w-[90%] 
          relative mx-auto min-h-[800px]
          '>
            <BlogHeader />
            <EditorPick />
            <AllPosts />
          </main>
        </div>
      </div>
    </Layout>
  );
}
