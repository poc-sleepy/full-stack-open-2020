import { SemanticICONS } from 'semantic-ui-react';
import { Entry, Gender } from './types';

export const genderIconName = (gender: Gender): SemanticICONS => {
  switch (gender) {
    case 'male':
      return 'mars';
    case 'female':
      return 'venus';
    default:
      return 'genderless';
  }
};

export const entryIconName = (entryType: Entry['type']): SemanticICONS => {
  switch (entryType) {
    case 'OccupationalHealthcare':
      return 'doctor';
    case 'Hospital':
      return 'hospital outline';
    case 'HealthCheck':
      return 'stethoscope';
    default:
      return 'question circle outline';
  }
};
