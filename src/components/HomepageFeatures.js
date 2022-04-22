import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Silos Connected',
    Svg: require('../../static/img/SilosConnected.svg').default,
    description: (
      <>
        Collect DevOps data across the entire SDLC process and connect data silos
      </>
    ),
  },
  {
    title: 'Out-of-the-box Analysis',
    Svg: require('../../static/img/OutoftheboxAnalysis.svg').default,
    description: (
      <>
        Collect DevOps data across the entire SDLC process and connect data silos
      </>
    ),
  },
  {
    title: 'Highly Flexible',
    Svg: require('../../static/img/HighlyFlexible.svg').default,
    description: (
      <>
        Flexible framework for data collection and ETL, support customized analysis
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
