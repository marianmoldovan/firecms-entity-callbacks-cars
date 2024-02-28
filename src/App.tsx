import React from "react"
import { FireCMSApp } from "firecms";
import appConfig from "./index";

function App() {
    return <FireCMSApp
        projectId={"fire-cms-devrel-demo"}
        appConfig={appConfig}
    />;
}

export default App
