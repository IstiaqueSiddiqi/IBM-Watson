import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React, { memo, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
};

const Footer = (props: IProps) => {
    const { children } = props;

    return (
        <>
            <AppBar component="footer" position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar variant="dense">
                    {children}
                </Toolbar>
            </AppBar>
        </>
    )
};

export default memo(Footer);