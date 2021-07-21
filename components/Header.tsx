import { AppBar, Typography } from '@material-ui/core';
import React, { FC, memo } from 'react';

interface IProps {
    pageTitle: string;
};

const Header: FC<IProps> = props => {
    const { pageTitle } = props;

    return (
        <>
            <header>
                <AppBar position="sticky" elevation={0} color="primary">
                    <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                        {pageTitle}
                    </Typography>
                </AppBar>
            </header>
        </>
    )
};

export default memo(Header);