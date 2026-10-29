import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './index';
import { fr } from '@/content/fr';
import { en } from '@/content/en';

const toggle = () => screen.getByRole('button', { name: /menu/i });

describe('Navbar component', () => {
  test("affiche le logo 'AB'", () => {
    render(<Navbar t={fr.nav} />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  test('le bouton du menu reflète son état avec aria-expanded', () => {
    render(<Navbar t={fr.nav} />);
    expect(toggle()).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle());
    expect(toggle()).toHaveAttribute('aria-expanded', 'true');
    expect(toggle()).toHaveAccessibleName('Fermer le menu');
    fireEvent.click(toggle());
    expect(toggle()).toHaveAttribute('aria-expanded', 'false');
  });

  test('liste toutes les sections, y compris le parcours et le jeu', () => {
    render(<Navbar t={fr.nav} />);
    for (const label of ['Accueil', 'À propos', 'Parcours', 'Projets', 'Jeu', 'Contact']) {
      expect(screen.getByRole('link', { name: label, hidden: true })).toBeInTheDocument();
    }
  });

  test('ferme le menu au clic sur un lien et avec Escape', () => {
    render(<Navbar t={fr.nav} />);
    fireEvent.click(toggle());
    fireEvent.click(screen.getByRole('link', { name: 'Accueil' }));
    expect(toggle()).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle());
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(toggle()).toHaveAttribute('aria-expanded', 'false');
  });

  test('propose de changer de langue', () => {
    const { unmount } = render(<Navbar t={fr.nav} />);
    expect(screen.getByRole('link', { name: 'English', hidden: true })).toHaveAttribute('href', '/en');
    unmount();
    render(<Navbar t={en.nav} />);
    expect(screen.getByRole('link', { name: 'Français', hidden: true })).toHaveAttribute('href', '/');
  });

  test('affiche les liens sociaux et les deux liens CV', () => {
    render(<Navbar t={fr.nav} />);
    expect(screen.getByRole('link', { name: 'GitHub', hidden: true })).toHaveAttribute('href', 'https://github.com/Luxsss');
    expect(screen.getByRole('link', { name: 'Email', hidden: true })).toHaveAttribute('href', 'mailto:alexsdev@outlook.fr');
    expect(screen.getByTestId('cv-menu')).toHaveAttribute('download');
    expect(screen.getByTestId('cv-button')).toHaveAttribute('href', '/download/CvAlexisBrunCom.pdf');
  });
});
