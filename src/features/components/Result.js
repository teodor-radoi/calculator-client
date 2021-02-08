import React from "react";
import {TextField} from "@material-ui/core";
import {connect} from "react-redux";

function Result(props) {
    return <div className={props.className}>
        <TextField disabled defaultValue={'Result'}/>
        <div className={'success'}>{props.result}</div>
        <div className={'error'}>{props.error}</div>
    </div>
}

/* Mapping the relevant state information is similar to subscribing to the store for the mapped props as react
re-renders the component by default on props change
 */
const mapStateToProps = state => {
    return {
        result: state.result,
        error: state.error
    }
}

// Injecting redux in the component
export default connect(mapStateToProps)(Result)