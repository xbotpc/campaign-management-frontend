import React from 'react';
import { render, screen } from '@testing-library/react';
import Campaigns from './Campaigns';

test('renders learn react link', () => {
  render(<Campaigns />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
