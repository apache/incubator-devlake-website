import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import { HomepageHeader } from '@site/src/components/Sections/HomepageHeader';
import { WhyDevlake } from '../components/Sections/WhyDevlake';
import { UseCases } from '../components/Sections/UseCases';
import { UserFlow } from '../components/Sections/UserFlow';
import { JoinCommunity } from '../components/Sections/JoinCommunity';
import { Discover } from '../components/Sections/Discover';
import { HeaderLearnMore } from '../components/Sections/HeaderLearnMore';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Apache DevLake is an open-source dev data platform that ingests, analyzes, and visualizes the fragmented data from DevOps tools to distill insights for engineering productivity.">
      <div className='bg-[#f8f8f8]'>
       <HeaderLearnMore />
        <div className=' mx-auto bg-white'>
          <HomepageHeader />
          <main className='max-w-[70%] xl:mx-auto
            sm:max-w-[90%] mx-auto xl:max-w-[1280px]'>
            <WhyDevlake />
            <UseCases />
            <UserFlow />
            <JoinCommunity />
          </main>
          <Discover />
        </div>
      </div>
    </Layout>
  );
}
