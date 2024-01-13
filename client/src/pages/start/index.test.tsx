import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Start } from '.';

describe('Start component', () => {
  it('renders "Quiz" heading', () => {
    render(<Start />);
    expect(screen.getByText('Quiz')).toBeInTheDocument();
  });

  it('renders a "Начать" button', () => {
    render(<Start />);
    const startButton = screen.getByText('Начать');
    expect(startButton).toBeInTheDocument();
    expect(startButton.tagName).toBe('H4');
  });
});
