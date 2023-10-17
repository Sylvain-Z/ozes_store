import React from 'react'

import DashboardNav from './Components/Container/Nav'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';


function Informations() {
  return (
    <>
      <DashboardNav/>
    
      <h3>Vos informations</h3>

      <FontAwesomeIcon icon={faCircleCheck} style={{color: "#21832b",}} /> {/* solid */}

      <FontAwesomeIcon icon={faDeleteLeft} style={{color: "#d10a23",}} /> {/* solid */}
    
    </>
  )
}

export default Informations;