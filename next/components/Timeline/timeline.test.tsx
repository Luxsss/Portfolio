import React from 'react';
import { render, screen } from '@testing-library/react';
import Timeline from './index';
import { fr } from '@/content/fr';

describe('Timeline component', () => {
  test("rend le parcours dans l'ordre, avec l'id 'journey'", () => {
    const { container } = render(<Timeline t={fr.timeline} />);
    expect(container.querySelector('section#journey')).toBeInTheDocument();
    const titles = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);
    expect(titles).toEqual(fr.timeline.entries.map((entry) => entry.title));
  });
});
