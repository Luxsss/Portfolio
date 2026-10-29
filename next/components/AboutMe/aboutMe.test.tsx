import React from 'react';
import { render, screen, within } from '@testing-library/react';
import AboutMe from './index';
import { fr } from '@/content/fr';

describe('AboutMe component', () => {
  test("rend la section avec l'id 'about' et son titre", () => {
    const { container } = render(<AboutMe t={fr.about} />);
    expect(container.querySelector('section#about')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Qui suis-je ?' })).toBeInTheDocument();
  });

  test('garde le texte dans un seul paragraphe lisible', () => {
    render(<AboutMe t={fr.about} />);
    const text = screen.getByText(/en construisant le jeu\.$/);
    expect(text.tagName).toBe('P');
  });

  test('affiche le bloc « En ce moment »', () => {
    render(<AboutMe t={fr.about} />);
    const now = screen.getByRole('complementary', { name: 'En ce moment' });
    expect(within(now).getByText('Je bosse sur')).toBeInTheDocument();
    expect(within(now).getByText('J’attends')).toBeInTheDocument();
  });
});
