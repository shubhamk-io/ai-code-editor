import { cert, initializeApp  } from "firebase-admin";
import serviceAccoutn from "../servicesAccountKey.json" with {type:"json"} // type json


export const app = initializeApp(
    {
        credential:cert(serviceAccoutn),
    }
)