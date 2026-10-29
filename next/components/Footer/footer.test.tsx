import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Content from './content';
import { fr } from '@/content/fr';

const renderFooter = () => render(<Content t={fr.footer} nav={fr.nav} />);

describe('Footer content', () => {
  test("affiche l'édition de l'année en cours et l'heure de Paris", () => {
    renderFooter();
    expect(screen.getByText(`© ${new Date().getFullYear()} Alexis Brun`, { exact: false })).toBeInTheDocument();
    expect(document.querySelector('time')?.textContent).toMatch(/^\d{2}:\d{2}/);
  });

  test('reprend la navigation des sections', () => {
    renderFooter();
    const nav = screen.getByRole('navigation', { name: 'Navigation' });
    expect(within(nav).getAllByRole('link')).toHaveLength(fr.nav.links.length);
    expect(screen.getByRole('link', { name: 'Retour en haut' })).toHaveAttribute('href', '#home');
  });

  test('affiche les liens sociaux, le CV et la langue', () => {
    renderFooter();
    expect(screen.getByTestId('button-GitHub')).toHaveAttribute('href', 'https://github.com/Luxsss');
    expect(screen.getByTestId('button-LinkedIn')).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByTestId('button-Email')).toHaveAttribute('href', 'mailto:alexsdev@outlook.fr');
    expect(screen.getByTestId('button-CV')).toHaveAttribute('download');
    expect(screen.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/en');
  });
});
