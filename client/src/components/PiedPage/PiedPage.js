import React from 'react';
import './PiedPage.css';

function PiedPage() {
  return (
<div className='maFooter'>
  <footer class="footer">
    <div class="waves">
      <div class="wave" id="wave1"></div>
      <div class="wave" id="wave2"></div>
      <div class="wave" id="wave3"></div>
      <div class="wave" id="wave4"></div>
    </div>
    <ul class="menu">
      
    <li class="menu__item menu__link">Sylvain Labranche</li>
    <li class="menu__item menu__link">|</li>
    <li class="menu__item menu__link">Coordonnateur</li>

    </ul>
    <p>&copy;2023 WorkForce | All Rights Reserved</p>
  </footer>
</div>
      // <div className="Footer-Main">
      //   <footer className="Footer-Container">
      //     <div>
      //       <p>Coordonnateur :</p>
      //       <p>Sylvain Labranche</p>
      //       <p>sylvain.labranche@cmontmorency.qc.ca</p>
      //     </div>
      //   </footer>
      // </div>
  );
}

export default PiedPage;
