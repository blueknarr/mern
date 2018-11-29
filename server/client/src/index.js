import React from 'react';
import ReactDOM from 'react-dom';

import 'materialize-css/dist/css/materialize.min.css';

//모든 state를 제공
import { Provider } from 'react-redux';
//
import { createStore, applyMiddleware } from 'redux'; 
import reduxThunk from 'redux-thunk';

import App from './components/App';
//파일 이름이 index면 자동으로 불러온다
import reducers from './reducers';

const store = createStore(
    reducers,
    {},
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);