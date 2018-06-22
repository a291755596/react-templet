import './index.html';
import './index.css';
import 'flex.css'; //flex布局
// import './utils/websocket';
import dva from 'dva';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use({});

// 3. Model
// app.model(require('./models/login.js'));
// app.model(require('./models/xuangu.js'));
// app.model(require('./models/ask.js'));
// app.model(require('./models/trans.js'));


// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');