import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { TeampageHeaderBG, TeampageBottomBG } from '@site/src/components/Team/TeampageBG';
import { Title } from '@site/src/components/Team/Title';
import { PPMC } from '@site/src/components/Team/PPMC';
import { Committer } from '@site/src/components/Team/Committer';
import { Contributor } from '@site/src/components/Team/Contributor';

export default function Team() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Get to know the team behind Apache DevLake, the open-source platform to measure cycle time, track engineering performance, and implement DORA metrics.">
      <div className='bg-[#f8f8f8]'>
        <div className='mx-auto bg-white max-w-[100vw] overflow-hidden relative'>
          <TeampageHeaderBG />
          <main 
          className='
          text-start w-[70%] max-w-[1200px] sm:max-w-[650px] mobile:w-[90%] 
          relative mx-auto
          '>
            <Title />
            <PPMC />
            <Committer />
            <Contributor />
          </main>
        </div>
      </div>
    </Layout>
  );
}
