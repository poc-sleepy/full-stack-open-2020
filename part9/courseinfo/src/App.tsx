import React from 'react';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseWithDescription {
  type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseWithDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseWithDescription {
  type: 'special';
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = ({ courseName }: { courseName: string }): JSX.Element => {
  return <h1>{courseName}</h1>;
};

const Content = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <i>{coursePart.description}</i>
        </>
      );
    case 'groupProject':
      return (
        <>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p>Project Exercises: {coursePart.groupProjectCount}</p>
        </>
      );
    case 'submission':
      return (
        <>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <i>{coursePart.description}</i>
          <p>submit to {coursePart.exerciseSubmissionLink}</p>
        </>
      );
    case 'special':
      return (
        <>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <i>{coursePart.description}</i>
          <p>required skills: {coursePart.requirements.join()}</p>
        </>
      );
    default:
      return assertNever(coursePart);
  }
};

const Contents = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  return (
    <>
      {courseParts.map((coursePart) => (
        <Content key={coursePart.name} coursePart={coursePart} />
      ))}
    </>
  );
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Contents courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
