import * as React from "react"
import * as ReactDom from "react-dom"

import "./styles/style.scss";

import {App} from "./components/App"

const ROOT = document.querySelector("#root")

ReactDom.render(<App />, ROOT)