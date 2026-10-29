import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DodgeGame from './index';
import { fr } from '@/content/fr';

describe('DodgeGame component', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("rend la section avec l'id 'game', les consignes et l'arène", () => {
    const { container } = render(<DodgeGame t={fr.game} />);
    expect(container.querySelector('section#game')).toBeInTheDocument();
    expect(screen.getByText(fr.game.controls)).toBeInTheDocument();
    expect(screen.getByRole('application', { name: fr.game.arenaLabel })).toBeInTheDocument();
  });

  test('lance le compte à rebours au clic sur « Jouer »', () => {
    render(<DodgeGame t={fr.game} />);
    fireEvent.click(screen.getByRole('button', { name: 'Jouer' }));
    expect(screen.getByText('3')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(700));
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByRole('application')).toHaveFocus();
  });

  test('affiche le record enregistré', () => {
    localStorage.setItem('dodge-best', '42');
    render(<DodgeGame t={fr.game} />);
    expect(screen.getByText('Record : 42')).toBeInTheDocument();
    localStorage.clear();
  });
});
