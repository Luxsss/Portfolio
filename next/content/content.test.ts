import { fr } from './fr';
import { en } from './en';
import { getProjects } from './index';
import { format } from '@/lib/format';

// Shape of a dictionary: keys and array lengths, ignoring the text itself.
const shape = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, shape(inner)]));
  }
  return typeof value;
};

describe('content', () => {
  test('les dictionnaires FR et EN ont exactement la même structure', () => {
    expect(shape(en)).toEqual(shape(fr));
  });

  test('les projets existent dans les deux langues, projet mis en avant en premier', () => {
    const projectsFr = getProjects('fr');
    const projectsEn = getProjects('en');
    expect(projectsFr.map((p) => p.slug)).toEqual(projectsEn.map((p) => p.slug));
    expect(projectsFr[0].featured).toBe(true);
    expect(projectsFr.filter((p) => p.featured)).toHaveLength(1);
  });

  test('un projet privé n’expose aucun lien externe', () => {
    for (const project of getProjects('fr').filter((p) => p.private)) {
      expect(project.links.code).toBeUndefined();
      expect(project.links.live).toBeUndefined();
    }
  });

  test('remplit les emplacements des textes', () => {
    expect(format('Score : {score}', { score: 12 })).toBe('Score : 12');
    expect(format('{missing}', {})).toBe('{missing}');
  });
});
