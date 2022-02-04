import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders learn react link', () => {
  render(<Demo />);
  const linkElement = screen.getByText(/Sao Paulo/i);
  expect(linkElement).toBeInTheDocument();
});
