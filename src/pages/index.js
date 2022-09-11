import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import { HomepageHeader } from '@site/src/components/Sections/HomepageHeader';
import { WhyDevlake } from '../components/Sections/WhyDevlake';
import { UseCases } from '../components/Sections/UseCases';
import { UserFlow } from '../components/Sections/UserFlow';
import { JoinCommunity } from '../components/Sections/JoinCommunity';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Apache DevLake is an open-source dev data platform that ingests, analyzes, and visualizes the fragmented data from DevOps tools to distill insights for engineering productivity.">
      <div className='bg-[#f8f8f8]'>
        <div className='max-w-[1280px] mx-auto bg-white'>
          <HomepageHeader />
          <main>
            <WhyDevlake />
            <UseCases />
            <UserFlow />
            <JoinCommunity />
          </main>
        </div>
      </div>
    </Layout>
  );
}
