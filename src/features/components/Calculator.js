import React from "react";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import {IconButton, makeStyles, Paper, Tooltip} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import {connect} from "react-redux";
import {SET_ERROR, SET_NUMBER_1, SET_NUMBER_2, SET_RESULT} from "../../app/redux/dispatchTypes";

const styles = makeStyles((theme) => ({
    // Also added classes for add and multiply for further styling
    add: {
    },
    subtract: {
        border: '1px solid'
    },
    multiply: {
    },
    divide: {
        border: '1px solid'
    }
}))

function Calculator(props) {
    const classes = styles()

    const inputsAreInvalid = () => {
        return !props.number1 || isNaN(props.number1) || !props.number2
    }

    const handleRequest = operationType => {
        // encoding everything for safety, even if only operation should realistically need encoding
        const operation = encodeURIComponent(operationType)
        const number1 = encodeURIComponent(props.number1)
        const number2 = encodeURIComponent(props.number2)
        axios.get(`/api/operation/${operation}/${number1}/${number2}`).then(response => {
            props.setResult(response.data.result)
        }).catch(error => {
            props.setError(`Could not do operation ${number1} ${operationType} ${number2}.
            Status code ${error.response.status} ${error.response.data}`)
        })
    }

    // While both text fields can be of type number, I wanted to show a simple input validation
    return <div className={props.className}>
        <TextField error={isNaN(props.number1)}
                   required
                   label={'Number 1'}
                   helperText={isNaN(props.number1) ? 'Value should be a number' : null}
                   onChange={event => {
                       props.setNumber1(event.target.value)
                   }}/>
        <TextField type={'number'}
                   required
                   label={'Number 2'}
                   onChange={event => {
                       props.setNumber2(event.target.value)
                   }}/>
        <Paper>
            <Tooltip title={'Add'}>
                <div className={'inline'}>
                    <IconButton id={'add'}
                                className={`${classes.add} add`}
                                disabled={inputsAreInvalid()}
                                onClick={() => handleRequest('+')}>
                        <AddIcon/>
                    </IconButton>
                </div>
            </Tooltip>
            <Tooltip title={'Subtract'}>
                <div className={'inline'}>
                    <IconButton id={'subtract'}
                                className={`${classes.subtract} subtract`}
                                disabled={inputsAreInvalid()}
                                onClick={() => handleRequest('-')}>
                        <RemoveIcon/>
                    </IconButton>
                </div>
            </Tooltip>
            <Tooltip title={'Multiply'}>
                <div className={'inline'}>
                    <IconButton id={'multiply'}
                                className={`${classes.multiply} multiply`}
                                disabled={inputsAreInvalid()}
                                onClick={() => handleRequest('*')}>
                        <ClearIcon/>
                    </IconButton>
                </div>
            </Tooltip>
            <Tooltip title={'Divide'}>
                <div className={'inline'}>
                    <IconButton id={'divide'}
                                className={`${classes.divide} divide`}
                                disabled={parseFloat(props.number2) === 0 || inputsAreInvalid()}
                                onClick={() => handleRequest(':')}>
                        <FormatItalicIcon/>
                    </IconButton>
                </div>
            </Tooltip>
        </Paper>
    </div>
}

// adding relevant information from the redux store to the props
const mapStateToProps = (state) => {
    return {
        number1: state.number1,
        number2: state.number2,
    }
}

// adding dispatch functions to the props
const mapDispatchToProps = (dispatch) => {
    return {
        setNumber1: (value) => dispatch({type: SET_NUMBER_1, value: value}),
        setNumber2: (value) => dispatch({type: SET_NUMBER_2, value: value}),
        setResult: (value) => dispatch({type: SET_RESULT, value: value}),
        setError: (value) => dispatch({type: SET_ERROR, value: value})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calculator)