import React from "react";
import ReactDOM from "react-dom";
// redux
import { Provider } from "react-redux";
import configureStore from "./config/store";
// worker
import registerServiceWorker from "./registerServiceWorker";
// custom
import App from "./App";
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("root")
);

if (module.hot) {
    module.hot.accept();
}

registerServiceWorker();
