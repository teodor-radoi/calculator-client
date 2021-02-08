import React from 'react';
import './App.scss';
import Calculator from "./features/components/Calculator";
import Result from "./features/components/Result";
import {makeStyles, Paper} from "@material-ui/core";


// styling with material ui classes
const componentClasses = makeStyles((theme) => ({
    paper: {
        margin: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
    }
}))

function App() {
    const classes = componentClasses()
    return (
        <Paper className={classes.paper} elevation={1}>
            <Calculator className={'block'}/>
            <Result className={'block'}/>
        </Paper>
    );
}

export default App;
