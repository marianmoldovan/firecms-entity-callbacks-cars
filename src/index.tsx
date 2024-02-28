import { FireCMSAppConfig } from "firecms";
import {carsCollection} from "./collections/cars";

const appConfig: FireCMSAppConfig = {
    version: "1",
    collections: [
        carsCollection
    ]
}

export default appConfig;
