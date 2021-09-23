import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return (
    <View>
      <Text testID="greetingText">Hello {name}!</Text>
    </View>
  );
};

describe('Greeting', () => {
  it('renders a greeting message based on the name prop', () => {
    const { getByTestId } = render(<Greeting name="Kalle" />);
    expect(getByTestId('greetingText')).toHaveTextContent('Hello Kalle!');
  });
});
