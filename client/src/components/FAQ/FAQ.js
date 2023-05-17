import listeFAQ from "../../data/listefAQ"
export default function FAQ() {
    return (
        <div className="listeFAQ-Main">
            {
                listeFAQ.map((element, cle) => (
                    <div className="listeFAQ-Question" key={cle}>
                        <h1> Question : {element.question} </h1>
                        <p> Reponse : {element.reponse} </p>
                    </div>
                ))
            }
        </div>
    )
}