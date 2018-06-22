import React from "react";
import { routerRedux } from "dva/router";
import { connect } from "dva";
import style from "../assets/less/index.less";
import request from '../utils/request'


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }





    render() {
        return (
            
        );
    }
}

function mapStateToProps(state, dispatch) {
    return {
        dispatch
    };
}
export default connect(mapStateToProps)(Main);
