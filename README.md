
## dva + TypeScript + atool-build

### dev
- Run `npm install`
antd的启动配置文件基于package.json文件，配合roadhog使用时，启动配置是：

 "scripts": {
  "start": "roadhog server",
  "build": "roadhog build",
  "lint": "eslint --ext .js src test",
  "precommit": "npm run lint"
},

 这样默认的自启动关口是8000，如果修改为其他端口只要将“start”改为"set port=8008 && roadhog server"这种形式即可；
"scripts": {
  "start": "set port=8008 && roadhog server",
  "build": "roadhog build",
  "lint": "eslint --ext .js src test",
  "precommit": "npm run lint"
},
以上配置在linux上不生效，可以使用以下方法：export PORT=8808  npm start
配合dora使用时，可以通过启动命令时指定监听端口：npm start -- --port=8010,也可以通过配置文件修改,修改前package.json文件中内容：

 "scripts": {
    "build": "atool-build",
    "lint": "eslint --ext .js,.jsx src/",
    "start": "dora --plugins webpack",
    "test": "atool-test-mocha ./**/__tests__/*-test.js"
  }
修改后文件内容
 "scripts": {
    "build": "atool-build",
    "lint": "eslint --ext .js,.jsx src/",
    "start": "dora --plugins webpack --port=8009",
    "test": "atool-test-mocha ./**/__tests__/*-test.js"
  }
### build

运行项目： npm run start
编译打包项目： npm run build

组件的生命周期

组件在初始化时会触发5个钩子函数：
1、getDefaultProps()
设置默认的props，也可以用dufaultProps设置组件的默认属性。
2、getInitialState()
在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props。
3、componentWillMount()
组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。
4、 render()
react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。
5、componentDidMount()
组件渲染之后调用，可以通过this.getDOMNode()获取和操作dom节点，只调用一次。
在更新时也会触发5个钩子函数：
6、componentWillReceivePorps(nextProps)
组件初始化时不调用，组件接受新的props时调用。
7、shouldComponentUpdate(nextProps, nextState)
react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候。不过调用this.forceUpdate会跳过此步骤。
8、componentWillUpdata(nextProps, nextState)
组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state
9、render()
不多说
10、componentDidUpdate()
组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。
还有一个卸载钩子函数
11、componentWillUnmount()
组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
以上可以看出来react总共有10个周期函数（render重复一次），这个10个函数可以满足我们所有对组件操作的需求，利用的好可以提高开发效率和组件性能。
// 下单json
{
"Code" : 0,
"Data" :{
    "Dingjin" : 10000,
"HeyueId" : 1,
"Liquan" : 0,
"Newprice" : 107628, 
"Towards" : 1
},
"Msg" : "5a040158c359bc517c499c74"
}
/**
 * Export echarts 选择性引入模块
 */
module.exports = require('./lib/echarts');

React.js component wrap for ECharts.js(v3.x+)

Feature

轻量，更高的效率，支持按需引入 ECharts 的图表和组件，配合react-grid-layout支持拖拽布局。

Screen.gif

Installation

$ npm install --save react-echarts-v3
Usage

import IECharts from 'react-echarts-v3';
 
const option = {
    title: { text: 'ECharts 入门示例' },
    tooltip: {},
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};
 
const onEvents = {
    'click': function(params) {
        // the 'this' variable can get echarts instance
        console.log(params);
    }
};
 
return (
    <IECharts option={option} onEvents={onEvents} />
);
OR

// const CandlestickReact = asyncComponent(() => import(/* webpackChunkName: "CandlestickReact" */'./EchartsDemo/CandlestickReact')) //k线图组件
// const CandlestickReact = asyncComponent(() => import(/* webpackChunkName: "CandlestickReact" */'./EchartsDemo/CandlestickReact')) //k线图组件
import IECharts from 'react-echarts-v3/lib/echarts.jsx';
 
// Import all charts and components
// require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
// require('echarts/lib/chart/pie');
// require('echarts/lib/chart/scatter');
// require('echarts/lib/chart/radar');
 
// require('echarts/lib/chart/map');
// require('echarts/lib/chart/treemap');
// require('echarts/lib/chart/graph');
// require('echarts/lib/chart/gauge');
// require('echarts/lib/chart/funnel');
// require('echarts/lib/chart/parallel');
// require('echarts/lib/chart/sankey');
// require('echarts/lib/chart/boxplot');
// require('echarts/lib/chart/candlestick');
// require('echarts/lib/chart/effectScatter');
// require('echarts/lib/chart/lines');
// require('echarts/lib/chart/heatmap');
 
// require('echarts/lib/component/graphic');
// require('echarts/lib/component/grid');
// require('echarts/lib/component/legend');
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/polar');
// require('echarts/lib/component/geo');
// require('echarts/lib/component/parallel');
// require('echarts/lib/component/singleAxis');
// require('echarts/lib/component/brush');
 
// require('echarts/lib/component/title');
 
// require('echarts/lib/component/dataZoom');
// require('echarts/lib/component/visualMap');
 
// require('echarts/lib/component/markPoint');
// require('echarts/lib/component/markLine');
// require('echarts/lib/component/markArea');
 
// require('echarts/lib/component/timeline');
// require('echarts/lib/component/toolbox');
 
// require('zrender/lib/vml/vml');
 
 
const option = {
    title: { text: 'ECharts 入门示例' },
    tooltip: {},
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};
 
return (
    <IECharts option={option} />
);
propTypes

    className:    React.PropTypes.string,
    style:        React.PropTypes.object,
    group:        React.PropTypes.string,
    theme:        React.PropTypes.string,
    initOpts:     React.PropTypes.object,
    option:       React.PropTypes.object.isRequired,
    notMerge:     React.PropTypes.bool,
    lazyUpdate:   React.PropTypes.bool,
    onReady:      React.PropTypes.func,
    loading:      React.PropTypes.bool,
    resizable:    React.PropTypes.bool,
    optsLoading:  React.PropTypes.object,
    onEvents:     React.PropTypes.object
Read More

defaultProps

    className: 'react-echarts',
    style: { width: '100%', height: '100%' },
    notMerge: false,
    lazyUpdate: false,
    onReady: function(instance) {},
    loading: false,
    resizable: false,
    optsLoading: {
        text: 'loading',
        color: '#c23531',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0
    },
    onEvents: {}
License
MIT