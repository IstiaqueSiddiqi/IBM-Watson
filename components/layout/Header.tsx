import AppBar from '@material-ui/core/AppBar';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import React, { memo } from 'react';
import { useThemeContext } from '../../theme/Context';

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
});

interface IProps {
    pageTitle: string;
};

const Header = (props: IProps) => {
    const classes = useStyles();
    const { pageTitle } = props;
    const { appTheme, enableDarkTheme } = useThemeContext();

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar variant="dense">
                    <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }} classes={{ root: classes.title }}>
                        {pageTitle}
                    </Typography>
                    <Switch color="secondary" size="small" checked={appTheme.palette.mode === 'dark'} onChange={() => enableDarkTheme(!(appTheme.palette.mode === 'dark'))} inputProps={{ 'aria-label': 'toggle theme' }} />
                </Toolbar>
            </AppBar>
        </>
    )
};

export default memo(Header);