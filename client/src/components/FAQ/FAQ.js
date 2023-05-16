import listeFAQ from "../../data/listefAQ"
export default function FAQ() {
    return (
        <div>
            {
                listeFAQ.map((element, cle) => (
                    <div key={cle}>
                        <h1> Question : {element.question} </h1>
                        <p> Reponse : {element.reponse} </p>
                    </div>
                ))
            }
        </div>
    )
}