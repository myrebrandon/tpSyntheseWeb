import React from 'react';
import { Link } from 'react-router-dom';
import './StageCard.css';

function StageCard({ info, idEtudiant }) {
  const imageSrc = info.type === 'Developpement d\'application'
    ? 'https://cdn-icons-png.flaticon.com/512/2809/2809263.png'
    : 'https://cdn-icons-png.flaticon.com/128/4379/4379213.png';
  const poste = info.nbPostes > 1 ? 'postes' : 'poste';

  return (
    <div className='stageCard-Main'>
      <article className="job-card">
        <div className="company-logo-img">
          <img src={imageSrc} alt="Stage Type" />
        </div>
        <div className="job-title">{info.titre}</div>
        <div className="company-name">{info.type}</div>
        <div className="skills-container">
          <div className="skill">{info.nomEntreprise}</div>
          <div className="skill">{info.nbPostes} {poste} à combler</div>
          <div className="skill">{info.etat}</div>
        </div>
        {!idEtudiant ? 
          <Link className='apply button-apply' to={`/stage/${info._id}`}>Appliquer</Link> :
          <Link className='apply button-apply' to={`/${idEtudiant}/Affectation/${info._id}`}>Appliquer</Link>}
          {/* <div className='div-apply'>
            <button className="apply button-apply">Appliquer</button>
          </div> */}
        {/* <button className="save">Save Job</button> */}
        <a href="#"></a>
      </article>
    </div>
  );
}

export default StageCard;
