import IHistory from './IHistory.model';
import React, { memo } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import AudioListItem from './AudioListItem';

interface IProps {
    historyList: IHistory[];
};

const AudioList = (props: IProps) => {
    const { historyList } = props;

    return (
        <>
            <List sx={{ mb: 8 }}>
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>Recent search</ListSubheader>
                {historyList.map((eachItem) => {
                    return (
                        <AudioListItem key={eachItem.request.url} listItem={eachItem} />
                    )
                })}
            </List>
        </>
    )
};


export default memo(AudioList)
