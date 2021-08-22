import IHistory from './IHistory.model';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StopCircleIcon from '@material-ui/icons/StopCircle';
import PlayCircleIcon from '@material-ui/icons/PlayCircle';
import React, { memo, useCallback, useState } from 'react';

interface IAudioListItem {
    listItem: IHistory;
};

const AudioListItem = (props: IAudioListItem) => {
    const { listItem: { request, response } } = props;
    const [isPlaying, setPlaying] = useState(false);
    const urlSearchParams = new URLSearchParams(request.url);
    let inputText = '';

    for (const [key, value] of urlSearchParams) inputText = value;

    const play = useCallback(async () => {
        const { playAudio } = await import('../../util');

        setPlaying(true);

        const buffer: any = await response?.clone().arrayBuffer();
        const source = playAudio(buffer);

        source.addEventListener('ended', () => {
            setPlaying(false);
        });

        source.removeEventListener('ended', () => console.log('Removed listener'));
    }, [response]);

    return (
        <ListItem divider button id={request.url} onClick={play}>
            <ListItemIcon>
                {isPlaying ? <StopCircleIcon color="secondary" /> : <PlayCircleIcon color="secondary" />}
            </ListItemIcon>
            <ListItemText primary={inputText} secondary={null} />
        </ListItem>
    )
};

export default memo(AudioListItem);
