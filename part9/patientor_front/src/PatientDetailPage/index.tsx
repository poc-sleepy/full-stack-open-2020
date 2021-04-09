import React from 'react';
import axios from 'axios';
import { Card, Container, Icon } from 'semantic-ui-react';

import { Diagnosis, Entry, HealthCheckRating, Patient } from '../types';
import { genderIconName, entryIconName } from '../utils';
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

  switch (entry.type) {
    case 'OccupationalHealthcare':
      return (
        <Card fluid={true}>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name={entryIconName(entry.type)} />{' '}
              {entry.employerName}
            </Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            <Diagnoses diagnosisCodes={entry.diagnosisCodes} />
          </Card.Content>
        </Card>
      );
    case 'Hospital':
      return (
        <Card fluid={true}>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name={entryIconName(entry.type)} />
            </Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            <Diagnoses diagnosisCodes={entry.diagnosisCodes} />
          </Card.Content>
        </Card>
      );
    case 'HealthCheck':
      return (
        <Card fluid={true}>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name={entryIconName(entry.type)} />
            </Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            <Diagnoses diagnosisCodes={entry.diagnosisCodes} />
            <HealthCheckRatingComponent
              healthCheckRating={entry.healthCheckRating}
            />
          </Card.Content>
        </Card>
      );
    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthCheckRatingComponent = (prop: {
  healthCheckRating: HealthCheckRating;
}) => {
  const rating = prop.healthCheckRating;
  switch (rating) {
    case 0:
      return (
        <>
          <Icon name="heart" color="green" />
          <Icon name="heart" color="green" />
          <Icon name="heart" color="green" />
          <Icon name="heart" color="green" />
        </>
      );
    case 1:
      return (
        <>
          <Icon name="heart" color="yellow" />
          <Icon name="heart" color="yellow" />
          <Icon name="heart" color="yellow" />
          <Icon name="heart" color="grey" />
        </>
      );
    case 2:
      return (
        <>
          <Icon name="heart" color="orange" />
          <Icon name="heart" color="orange" />
          <Icon name="heart" color="grey" />
          <Icon name="heart" color="grey" />
        </>
      );
    case 3:
      return (
        <>
          <Icon name="heart" color="red" />
          <Icon name="heart" color="grey" />
          <Icon name="heart" color="grey" />
          <Icon name="heart" color="grey" />
        </>
      );
    default:
      return null;
  }
};

const Diagnoses = (prop: {
  diagnosisCodes: Array<Diagnosis['code']> | undefined;
}) => {
  const diagnosisCodes = prop.diagnosisCodes;

  if (diagnosisCodes === undefined) {
    return null;
  } else {
    return (
      <ul>
        {diagnosisCodes?.map((diagnosisCode) => (
          <DiagnosisSingle key={diagnosisCode} diagnosisCode={diagnosisCode} />
        ))}
      </ul>
    );
  }
};

const DiagnosisSingle = (prop: { diagnosisCode: Diagnosis['code'] }) => {
  const [{ diagnoses }] = useStateValue();
  const diagnosisCode = prop.diagnosisCode;

  const findDiagnosis = (code: Diagnosis['code']): Diagnosis | undefined => {
    if (diagnoses === undefined) {
      return undefined;
    } else if (Object.keys(diagnoses).includes(code)) {
      return diagnoses[code];
    } else {
      return undefined;
    }
  };

  return (
    <li>
      {diagnosisCode}: {findDiagnosis(diagnosisCode)?.name}
    </li>
  );
};

export default PatientDetailPage;
