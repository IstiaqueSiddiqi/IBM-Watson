import React, { FC, ReactNode, memo } from 'react';
import Header from './Header';

interface IProps {
    children: ReactNode;
};

const PageLayout: FC<IProps> = props => {
    const { children } = props;
    return (
        <>
            <Header pageTitle="Text to Speech" />
            <main>{children}</main>
        </>
    )
};

export default memo(PageLayout);