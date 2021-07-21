import React, { FC, memo, ReactNode } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

interface IProps {
    children: ReactNode;
};

const Footer: FC<IProps> = props => {

    const { children } = props;
    return (
        <>
            <footer>
                <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                    <Toolbar variant="dense">
                        {children}
                    </Toolbar></AppBar>
            </footer>
        </>
    )
};

export default memo(Footer);