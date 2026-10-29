import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';
import { fr } from '@/content/fr';
import { en } from '@/content/en';

describe('Header component', () => {
  test("rend la section avec l'id 'home'", () => {
    const { container } = render(<Header t={fr.hero} />);
    expect(container.querySelector('section#home')).toBeInTheDocument();
  });

  test('expose un h1 avec le nom et le métier, dans chaque langue', () => {
    const { unmount } = render(<Header t={fr.hero} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Alexis Brun, Développeur Full-stack');
    unmount();
    render(<Header t={en.hero} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Alexis Brun, Full-stack Developer');
  });

  test("cache le marquee décoratif aux lecteurs d'écran", () => {
    const { container } = render(<Header t={fr.hero} />);
    const marquee = container.querySelector('[data-marquee]');
    expect(marquee).toHaveAttribute('aria-hidden', 'true');
    expect(marquee?.querySelectorAll('[data-marquee-group]')).toHaveLength(3);
  });

  test('décrit les deux photos', () => {
    render(<Header t={fr.hero} />);
    expect(screen.getByAltText(fr.hero.photoMainAlt)).toBeInTheDocument();
    expect(screen.getByAltText(fr.hero.photoSmallAlt)).toBeInTheDocument();
  });
});
