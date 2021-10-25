import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import "antd/dist/antd.css";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import rootReducer from "./store";
import { Provider } from "react-redux";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
