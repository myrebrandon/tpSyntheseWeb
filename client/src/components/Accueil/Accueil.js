import './Acceuil.css'
export default function Accueil() {
    const date = new Date().getFullYear();

    return (
        <div className="accueil-container">
            <div className="accueil-header">
                <h1 className="accueil-title">Édition {date}</h1>
            </div>

            <div className="accueil-content">
                <div className="accueil-section">
                    <h2 className="accueil-section-title">Bienvenue sur le site des stages de fin d'études des techniques de l'informatique du Collège Montmorency!</h2>
                </div>

                <div className="accueil-section">
                    <h3 className="accueil-section-subtitle">À la fin de leurs études, les étudiants sont appelés à mettre en pratique les compétences acquises durant le programme. Cela se fait grâce à la participation d'entreprises de la région qui les accueillent afin de finaliser leurs formations.</h3>
                </div>

                <div className="accueil-section">
                    <p className="accueil-paragraph">
                        Le Collège Montmorency offre ainsi aux employeurs l'occasion d'obtenir une main-d'œuvre compétente, tout en leur permettant de participer à la formation finale des étudiants.
                    </p>
                </div>

                <div className="accueil-section">
                    <p className="accueil-paragraph">
                        Le stage de fin d'études est une expérience concrète permettant d'acquérir une expérience professionnelle formatrice.
                    </p>
                </div>

                <div className="accueil-section">
                    <p className="accueil-paragraph">
                        Les étudiants terminent la portion académique de leurs études en informatique selon une des deux voies de sortie du programme:
                    </p>
                    <ul className="accueil-list">
                        <li>Réseaux et sécurité informatique</li>
                        <li>Développement d'applications informatiques</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
