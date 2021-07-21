import Head from 'next/head';
import StopCircleIcon from '@material-ui/icons/StopCircle';
import PlayCircleIcon from '@material-ui/icons/PlayCircle';
import Footer from '../components/Footer';
import TextToSpeechForm from '../components/TextToSpeechForm';
import { memo, useEffect, useRef, useState } from 'react';
import { Container, List, ListItem, ListItemIcon, ListSubheader, ListItemText } from '@material-ui/core/';

export const cacheName = 'audio-cache';

const Home = () => {
  const [historyList, setHistoryList] = useState<readonly Request[]>([]);

  useEffect(() => {
    (async () => {
      setHistoryList(await getAllRequestFromCache());
    })();
  }, []);

  return (
    <>
      <Container disableGutters>
        <Head>
          <title>Convert text to speech</title>
          <meta name="description" content="Convert text to speech" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <List sx={{ mb: 2, mt: 6 }}>
          <ListSubheader sx={{ bgcolor: 'background.paper' }}>
            Recent search
          </ListSubheader>
          {historyList.map(eachItem => {
            return (
              <Row key={eachItem.url} row={eachItem} />
            )
          })}
        </List>
      </Container>
      <Footer>
        <TextToSpeechForm setHistoryList={setHistoryList} />
      </Footer>
    </>
  )
};


const Row = memo(function MemoRow(props: { row: { url: string; }; }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setPlaying] = useState(false);
  const { row: { url } } = props;

  const urlSearchParams = new URLSearchParams(url);
  let inputText = '';
  for (const [key, value] of urlSearchParams) inputText = value;

  const audioEvent = (event: { type: string; }) => setPlaying(event.type === 'playing');

  const playAudio = () => audioRef?.current?.play();

  return (
    <ListItem divider button onClick={playAudio}>
      <ListItemIcon>
        {isPlaying ? <StopCircleIcon color="secondary" /> : <PlayCircleIcon color="secondary" />}
      </ListItemIcon>
      <ListItemText primary={inputText} secondary={null} />
      <audio ref={audioRef} autoPlay={false} hidden preload="metadata" onPlaying={audioEvent} onPause={audioEvent}>
        <source src={url} type="audio/mpeg" />
      </audio>
    </ListItem>
  )
});

const getAllRequestFromCache = async (): Promise<readonly Request[]> => {
  const cache = await caches.open(cacheName);
  const requestArray = await cache.keys();
  return requestArray;
};

export default memo(Home)
