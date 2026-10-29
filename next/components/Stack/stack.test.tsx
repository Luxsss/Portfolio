import React from 'react';
import { render, screen } from '@testing-library/react';
import Stack from './index';
import { fr } from '@/content/fr';

describe('Stack component', () => {
  test('affiche les trois groupes de technos', () => {
    render(<Stack t={fr.stack} />);
    for (const group of ['Front', 'Back', 'Outils']) {
      expect(screen.getByRole('heading', { level: 3, name: group })).toBeInTheDocument();
    }
  });

  test('cache les bandes défilantes aux lecteurs d’écran', () => {
    const { container } = render(<Stack t={fr.stack} />);
    const bands = container.querySelectorAll('[aria-hidden="true"]');
    expect(bands).toHaveLength(2);
  });
});
