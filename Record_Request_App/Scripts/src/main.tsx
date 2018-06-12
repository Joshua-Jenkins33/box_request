import * as React from "react"
import * as ReactDom from "react-dom"
import { BrowserRouter, Router } from "react-router-dom"
import { App } from "./components/"
import { folderData, mockUser, boxData } from "./res/"
import { DataService } from "./services/DataService"
import { Provider } from "mobx-react"
import { rootStore } from "./stores/RootStore"
const root = document.getElementById("root")

ReactDom.render(
    <Provider rootStore={rootStore} >
        <App
            dataService={new DataService()}
            user={mockUser}
            boxData={boxData}
            folderData={folderData}
        />
    </Provider>,
    root
)
