import React, { ReactNode, memo } from 'react';
import Header from './Header';

interface IProps {
    children: ReactNode;
    pageTitle?: string;
};

const App = (props: IProps) => {
    const { pageTitle = "IBM Watson", children } = props;

    return (
        <>
            <Header pageTitle={pageTitle} />
            <main>{children}</main>
        </>
    )
};

export default memo(App);