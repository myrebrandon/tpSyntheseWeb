import { useState } from "react"
import Connexion from "./Connexion"
import Inscription from "./Inscription"
export default function PageDeConnexion() {
    const [typeConnexion, setTypeConnexion] = useState("connexion")
    
    return (
        <div className="border">
            { (typeConnexion === "connexion") && (<Connexion setTypeConnexion={setTypeConnexion}/>)}
            { (typeConnexion === "inscription") && (<Inscription setTypeConnexion={setTypeConnexion}/>)}
        </div>
    )
}