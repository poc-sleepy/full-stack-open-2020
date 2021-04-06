/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import axios from 'axios';
import { Container, Table, Icon, SemanticICONS } from 'semantic-ui-react';

import { Gender, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import HealthRatingBar from '../components/HealthRatingBar';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';

const PatientDetailPage = () => {
  const [{ patients }, dispatch] = useStateValue();

  const { id } = useParams<{ id?: string }>();
  const patient = Object.values(patients)
    .filter((val) => val !== undefined)
    .find((patient) => patient !== undefined && patient.id === id);

  const genderIconName = (gender: Gender): SemanticICONS => {
    switch (gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      default:
        return 'genderless';
    }
  };

  if (id === undefined) {
    return <p>No input for id</p>;
  } else if (patient === undefined) {
    return <p>No patient matches</p>;
  } else {
    return (
      <div className="App">
        <Container>
          <h2>
            {patient.name}
            <Icon name={genderIconName(patient.gender)} />
          </h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </Container>
      </div>
    );
  }
};

export default PatientDetailPage;
