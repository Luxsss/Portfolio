import React from 'react';
import { render, screen, within } from '@testing-library/react';
import GitHubActivity from './index';
import { fr } from '@/content/fr';
import type { GitHubActivity as Activity } from '@/lib/github';

const activity: Activity = {
  repos: [
    { name: 'Portfolio', description: 'My portfolio', language: 'TypeScript', url: 'https://github.com/Luxsss/Portfolio', pushedAt: new Date().toISOString() },
    { name: 'game', description: null, language: null, url: 'https://github.com/Luxsss/game', pushedAt: '2026-04-24T00:00:00Z' },
  ],
  calendar: {
    total: 1234,
    weeks: [
      [{ date: '2026-03-04', count: 3, level: 2 }, { date: '2026-03-05', count: 0, level: 0 }],
      [{ date: '2026-04-01', count: 7, level: 4 }],
    ],
  },
};

describe('GitHubActivity component', () => {
  test('affiche le total et un résumé mensuel lisible par les lecteurs d’écran', () => {
    render(<GitHubActivity t={fr.github} activity={activity} locale="fr" />);
    expect(screen.getByText(/contributions sur les 12 derniers mois/)).toHaveTextContent('1 234');
    const table = screen.getByRole('table', { name: 'Contributions par mois' });
    const rows = within(table).getAllByRole('row');
    expect(rows.map((row) => row.textContent)).toEqual(['mars 20263', 'avril 20267']);
  });

  test('liste les derniers dépôts avec un texte de repli', () => {
    render(<GitHubActivity t={fr.github} activity={activity} locale="fr" />);
    expect(screen.getByRole('link', { name: /Portfolio/ })).toHaveAttribute('href', 'https://github.com/Luxsss/Portfolio');
    expect(screen.getByText(fr.github.noDescription)).toBeInTheDocument();
  });

  test('se passe de la heatmap sans token', () => {
    render(<GitHubActivity t={fr.github} activity={{ ...activity, calendar: null }} locale="fr" />);
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.getByText(fr.github.recent)).toBeInTheDocument();
  });
});
