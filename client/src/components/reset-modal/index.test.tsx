import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResetModal } from '.';
import '@testing-library/jest-dom';

describe('ResetModal', () => {
  it('renders correctly', () => {
    render(<ResetModal open={true} onClose={() => {}} onReset={() => {}} />);

    expect(screen.getByText('Сбросить результаты таблицы')).toBeInTheDocument();
    expect(
      screen.getByText('Вы уверены, что хотите сбросить результаты таблицы?')
    ).toBeInTheDocument();
    expect(screen.getByText('Сбросить')).toBeInTheDocument();
    expect(screen.getByText('Отменить')).toBeInTheDocument();
  });

  it('calls onClose when "Отменить" button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<ResetModal open={true} onClose={onCloseMock} onReset={() => {}} />);

    fireEvent.click(screen.getByText('Отменить'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onReset when "Сбросить" button is clicked', () => {
    const onResetMock = jest.fn();
    render(<ResetModal open={true} onClose={() => {}} onReset={onResetMock} />);

    fireEvent.click(screen.getByText('Сбросить'));
    expect(onResetMock).toHaveBeenCalledTimes(1);
  });
});
