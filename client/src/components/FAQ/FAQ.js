import listeFAQ from "../../data/listefAQ"
export default function FAQ() {
    return (
        <div class="container" className="listeFAQ-Main">
            <h2>Frequently Asked Questions</h2>
                <div class="accordion">
                {
                    listeFAQ.map((element, cle) => (
                    <div className="accordion-item" key={cle}>
                    <div class="accordion-item">
                        <button id="accordion-button-1" aria-expanded="false">
                            <span class="accordion-title">Question : {element.question}</span>
                            <span class="icon" aria-hidden="true"></span>
                        </button>
                        <div class="accordion-content">
                            <p>Reponse : {element.reponse}</p>
                        </div>
                    
                    </div>
                    </div>
                }
                </div>
        </div>

        // <div className="listeFAQ-Main">
        //     {
        //         listeFAQ.map((element, cle) => (
        //             <div className="listeFAQ-Question" key={cle}>
        //                 <h1> Question : {element.question} </h1>
        //                 <p> Reponse : {element.reponse} </p>
        //             </div>
        //         ))
        //     }
        // </div>
    )
}