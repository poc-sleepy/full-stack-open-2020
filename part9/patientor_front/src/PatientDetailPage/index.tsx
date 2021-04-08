import React from 'react';
import axios from 'axios';
import { Container, Icon, SemanticICONS } from 'semantic-ui-react';

import { Entry, Gender, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, getPatient } from '../state';
import { useParams } from 'react-router-dom';

const PatientDetailPage = () => {
  const [{ patients }, dispatch] = useStateValue();

  const { id } = useParams<{ id?: string }>();
  const patient = Object.values(patients)
    .filter((val) => val !== undefined)
    .find((patient) => patient !== undefined && patient.id === id);

  const fetchPatient = async () => {
    try {
      if (id !== undefined) {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(getPatient(patient));
      }
    } catch (e) {
      console.error(e);
    }
  };

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
    if (patient.ssn === undefined) {
      void fetchPatient();
    }

    return (
      <div className="App">
        <Container>
          <h2>
            {patient.name}
            <Icon name={genderIconName(patient.gender)} />
          </h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <Entries entries={patient.entries} />
        </Container>
      </div>
    );
  }
};

const Entries = (prop: { entries: Entry[] | undefined }) => {
  const entries = prop.entries;
  if (entries === undefined) {
    return null;
  } else {
    return (
      <>
        <h3>entries</h3>
        {entries.map((entry) => (
          <EntrySingle key={entry.id} entry={entry} />
        ))}
      </>
    );
  }
};

const EntrySingle = (prop: { entry: Entry }) => {
  const entry = prop.entry;
  return (
    <div>
      <p>
        {entry.date}: <i>{entry.description}</i>
      </p>
      <ul>
        {entry.diagnosisCodes?.map((diagnosisCode) => (
          <li key={diagnosisCode}>{diagnosisCode}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDetailPage;
