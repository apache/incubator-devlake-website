import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Data Silos Connected',
    Svg: require('../../static/img/Homepage/SilosConnected.svg').default,
    description: (
      <>
        Collect DevOps data across the entire Software Development LifeCycle (SDLC) and connect siloed data with a standard data model
      </>
    ),
  },
  {
    title: 'Out-of-the-box Analysis',
    Svg: require('../../static/img/Homepage/OutoftheboxAnalysis.svg').default,
    description: (
      <>
        Visualize out-of-the-box engineering metrics in a series of use-case driven dashboards
      </>
    ),
  },
  {
    title: 'A Highly Flexible Framework',
    Svg: require('../../static/img/Homepage/HighlyFlexible.svg').default,
    description: (
      <>
        Easily extend DevLake to support your data sources, metrics, and dashboards
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
