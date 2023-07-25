import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./modules/fbReducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // Provider 는 store의 state 에 접근 가능 한 영역을 지정
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);
