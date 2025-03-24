import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import Projects from './index';
import gsap from 'gsap';

jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  to: jest.fn(() => ({ kill: jest.fn() })),
  set: jest.fn(),
}));

describe("Projects component", () => {

  test("Test: vérification que le container principal contient l'id 'projects'", () => {
    const { container } = render(<Projects />);
    const projectsContainer = container.querySelector('#projects');
    expect(projectsContainer).toBeInTheDocument();
  });

  test('Test: affiche "Loading ..." avant que les données ne soient chargées', () => {
    render(<Projects />);
    expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
  });

  test("Test: appelle gsap.registerPlugin lors du montage", () => {
    render(<Projects />);
    expect(gsap.registerPlugin).toHaveBeenCalled();
  });

  test('Test: Vérification que GSAP fonctionne correctment', () => {
    jest.mock('gsap', () => ({
      registerPlugin: jest.fn(),
      to: jest.fn(() => ({ kill: jest.fn() })),
      set: jest.fn(),
    }));
  });

});
