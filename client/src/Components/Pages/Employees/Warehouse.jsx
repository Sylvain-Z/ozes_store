import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-regular-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Warehouse() {
  return (
    <>

      <h3>Sélectionner une tâche à</h3>

      <FontAwesomeIcon icon={faIdBadge} style={{color: "#446cb7",}} />   {/* regular */}

      <FontAwesomeIcon icon={faBoxOpen} style={{color: "#4e3421",}} /> {/* solid */}

      <FontAwesomeIcon icon={faMessage} />  {/* regular */}

      <FontAwesomeIcon icon={faBars} style={{color: "#000000",}} /> {/* regular */}
    
    
    </>
  )
}

export default Warehouse;