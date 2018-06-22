import React from 'react';
import ReatDOM from 'react-dom';
import { Router, Route, Redirect } from 'dva/router';

// 模板

import Index from './components/Index' //首页


// 模板
function RouterConfig({history}) {
    return (
        <Router history={history}>
            <Route path="/" component={Index} />
            <Redirect from='*' to='/' />
        </Router>
    );
}


export default RouterConfig;
