import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function LocalizedIntro(){
  const { i18n } = useDocusaurusContext();
  const locale = (i18n && i18n.currentLocale) ? i18n.currentLocale : 'en';

  if (locale && locale.toLowerCase().startsWith('fr')) {
    return (
      <>
        <p>Voici un terminal vous permettant d'essayer quelques commandes et d'avoir le rendu exact de ce que vous pourriez avoir. Bien entendu l'ordinateur utilisé n'a pas les mêmes applications ou la même configuration que le vôtre, donc ne vous inquiétez pas si ce n'est pas vos applications — c'est normal, c'est un exemple.</p>
      </>
    );
  }

  return (
    <>
      <p>Here is a terminal allowing you to try a few commands and see the kind of output you might get. The machine used here doesn't have the same applications or configuration as yours, so don't worry if outputs differ — this is normal, it's just an example.</p>
    </>
  );
}
