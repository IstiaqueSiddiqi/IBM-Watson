import IHistory from './IHistory.model';
import React, { memo, useEffect, useState } from 'react';
import Head from 'next/head';
import App from '../layout/App';
import AudioList from './AudioList';
import ConvertTextToSpeechForm from './ConvertTextToSpeechForm';
import Footer from '../layout/Footer';

const TextToSpeech = () => {
  const [historyList, setHistoryList] = useState<IHistory[]>([]);

  useEffect(() => {
    (async () => {
      const { getAllRequestFromCache } = await import('../../util');
      setHistoryList(await getAllRequestFromCache());
    })();
  }, []);


  return (
    <>
      <App pageTitle="Text to Speech">
        <Head>
          <title>Convert text to speech</title>
          <meta name="description" content="Convert text to speech" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AudioList historyList={historyList} />
        <Footer>
          <ConvertTextToSpeechForm setHistoryList={setHistoryList} historyList={historyList} />
        </Footer>
      </App>
    </>
  )
};


export default memo(TextToSpeech)
