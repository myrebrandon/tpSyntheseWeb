import listeFAQ from "../../data/listefAQ";
import './FAQ.css';
import React, { useEffect } from 'react';

export default function FAQ() {
    useEffect(() => {
        const items = document.querySelectorAll('.FAQ-accordion .FAQ-button');

        function toggleAccordion() {
            const itemToggle = this.getAttribute('aria-expanded');

            items.forEach((item) => {
                item.setAttribute('aria-expanded', 'false');
            });

            if (itemToggle === 'false') {
                this.setAttribute('aria-expanded', 'true');
            }
        }

        items.forEach((item) => item.addEventListener('click', toggleAccordion));

        return () => {
            items.forEach((item) => item.removeEventListener('click', toggleAccordion));
        };
    }, []);

    return (
        <div className="container FAQ-listeFAQ-Main">
            <h2 className="FAQ-h2">Frequently Asked Questions</h2>
            <div className="FAQ-accordion">
                {listeFAQ.map((element, cle) => (
                    <div className="FAQ-accordion-item" key={cle}>
                        <button id={`accordion-button-${cle}`} className="FAQ-button" aria-expanded="false">
                            <span className="FAQ-accordion-title">{element.question}</span>
                            <span className="FAQ-icon" aria-hidden="true"></span>
                        </button>
                        <div className="FAQ-accordion-content">
                            <p className="FAQ-accordion-p">{element.reponse}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
