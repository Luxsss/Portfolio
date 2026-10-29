import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import Projects from './index';
import { fr } from '@/content/fr';
import { getProjects } from '@/content';

const projects = getProjects('fr');
const cardOf = (title: string) => screen.getByRole('heading', { level: 3, name: title }).closest('li') as HTMLElement;

describe('Projects component', () => {
  test("rend la section avec l'id 'projects' et le projet mis en avant en premier", () => {
    const { container } = render(<Projects t={fr.projects} projects={projects} />);
    expect(container.querySelector('section#projects')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })[0]).toHaveTextContent('Runelith');
  });

  test('marque les projets privés sans lien mort', () => {
    render(<Projects t={fr.projects} projects={projects} />);
    const runelith = cardOf('Runelith');
    expect(within(runelith).getByText('Code privé')).toBeInTheDocument();
    expect(within(runelith).queryByRole('link')).not.toBeInTheDocument();
  });

  test('propose les bons liens pour les projets publics', () => {
    render(<Projects t={fr.projects} projects={projects} />);
    const code = screen.getByRole('link', { name: 'Voir le code : Portfolio' });
    expect(code).toHaveAttribute('target', '_blank');
    expect(code).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByRole('link', { name: 'Jouer : Dodge Game' })).toHaveAttribute('href', '#game');
    expect(screen.getByRole('link', { name: 'Voir le site : Puissance 4' })).toHaveAttribute('href', 'https://luxsss.github.io/Puissance4/');
  });

  test('affiche les technologies en liste', () => {
    render(<Projects t={fr.projects} projects={projects} />);
    const stack = within(cardOf('Portfolio')).getByRole('list', { name: 'Technologies' });
    expect(within(stack).getAllByRole('listitem').map((li) => li.textContent)).toEqual(['Next.js', 'React', 'GSAP', 'TypeScript', 'CSS']);
  });

  test('ne propose « Détails » que pour les projets qui en ont', () => {
    render(<Projects t={fr.projects} projects={projects} />);
    expect(screen.queryByRole('button', { name: /^Détails/ })).not.toBeInTheDocument();
  });

  test('ouvre la fiche détails d’un projet documenté', () => {
    const documented = {
      ...projects[0],
      details: { context: 'Projet de fin d’année', did: ['Le moteur de combat'], learned: ['Rails en profondeur'] },
    };
    render(<Projects t={fr.projects} projects={[documented]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Détails : Runelith' }));
    const dialog = screen.getByRole('dialog', { hidden: true }) as HTMLDialogElement;
    expect(dialog.open).toBe(true);
    expect(within(dialog).getByRole('heading', { level: 2, hidden: true })).toHaveTextContent('Runelith');
    expect(within(dialog).getByText('Le moteur de combat')).toBeInTheDocument();
  });
});
