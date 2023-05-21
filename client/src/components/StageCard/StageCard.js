import React from 'react';
import {Link} from 'react-router-dom';
import './StageCard.css';




function StageCard( { info, idEtudiant } ){
  const imageSrc = info.type === 'Developpement d\'application'
    ? 'https://cdn-icons-png.flaticon.com/512/2809/2809263.png'
    : 'https://cdn-icons-png.flaticon.com/128/4379/4379213.png';
        // <div className="stage-item__content">
        //   <h2>{info.titre}</h2>
        //   <div className="stage-item__info">
        //     <h3>{info.type}</h3>
        //     <p>{info.nomEntreprise}</p>
        //     {!idEtudiant ? <Link to={`/stage/${info._id}`}>Info Stage</Link> :
        //      <Link to={`/${idEtudiant}/Affectation/${info._id}`}>Info Stage</Link>}
        //   </div>
        // </div>

  return (
        <div className='stageCard-Main'>
          <article class="job-card">
            <div class="company-logo-img">
              <img src={imageSrc} alt="Stage Type"/>
            </div>
            <div class="job-title">{info.titre}</div>
            <div class="company-name">{info.type}</div>
            <div class="skills-container">
              <div class="skill">{info.nomEntreprise}</div>
              <div class="skill">{info.nbPostes} poste(s) à combler</div>
              <div class="skill">{info.etat}</div>
            </div>
            {!idEtudiant ? <Link to={`/stage/${info._id}`}>Info Stage</Link> :
            <Link to={`/${idEtudiant}/Affectation/${info._id}`}>Info Stage</Link>}
        <button class="apply">Apply</button>
        <button class="save">Save Job</button>
        <a href="#"></a>
        </article>
      </div>
  );
};
export default StageCard;

{/* <script
  src="http://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script> */}