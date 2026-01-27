import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import En from '@site/src/components/Releases/en.mdx';
import Fr from '@site/src/components/Releases/fr.mdx';
import ReleasesLayout from '@site/src/components/Releases/ReleasesLayout';

export default function ReleasesPage() {
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale || 'en';
  const Content = locale.startsWith('fr') ? Fr : En;
  const title = locale.startsWith('fr') ? 'Versions' : 'Releases';
  return (
    <Layout title={title} description="Releases and changelog">
      <ReleasesLayout>
        <article>
          <div className="markdown">
            <Content />
          </div>
        </article>
      </ReleasesLayout>
    </Layout>
  );
}
