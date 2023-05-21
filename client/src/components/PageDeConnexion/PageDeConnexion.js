import { useState } from "react"

import Connexion from "./Connexion"
import Inscription from "./Inscription"
import Loading from "../Loading/Loading"

export default function PageDeConnexion() {
    const [typeConnexion, setTypeConnexion] = useState("connexion")
    const [loading, setLoading] = useState(false)

    return (
        <div className="border">
            { (typeConnexion === "connexion" && loading != true) && (<Connexion setTypeConnexion={setTypeConnexion} setLoading={setLoading}/>)}
            { (typeConnexion === "inscription" && loading != true) && (<Inscription setTypeConnexion={setTypeConnexion} setLoading={setLoading} />)}
            { (loading == true && (<Loading/>)) }
        </div>
    )
}