import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to use',
    Svg: (props) => (
      <img
        {...props}
        src={require('@site/static/img/click_mouse_transparent.png').default}
        alt="Click mouse"
      />
    ),
    description: (
      <>
        <code>geol</code> was designed be easily installed and
        used to get you ready and efficient with software end-of-life management.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        <code>geol</code> lets you focus on software end-of-life management, 
        exporting useful reports while we handle the data gathering and processing.
      </>
    ),
  },
  {
    title: 'Powered by Go',
    Svg: (props) => (
      <img
        {...props}
        src={require('@site/static/img/Go language gris.png').default}
        alt="Go language (grey)"
      />
    ),
    description: (
      <>
        Built with the Go programming language, <code>geol</code> is a fast,
        efficient, and reliable tool for managing software end-of-life information on
        any platform.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className={clsx('text--center padding-horiz--md', !title && styles.noTitle)}>
        <Heading as="h3" style={{visibility: title ? 'visible' : 'hidden'}} aria-hidden={!title}>
          {title || ' '}
        </Heading>
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
