import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutMe from './index';
import gsap from 'gsap';

jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  to: jest.fn(),
  set: jest.fn(),
}));

describe('AboutMe component', () => {
  test("Test: vérification que le container principal contient l'id 'about'", () => {
    const { container } = render(<AboutMe />);
    const aboutMeContainer = container.querySelector('#about');
    expect(aboutMeContainer).toBeInTheDocument();
  });

  test('Test: affiche le titre "Qui suis-je ?"', () => {
    render(<AboutMe />);
    expect(screen.getByText("Qui suis-je ?")).toBeInTheDocument();
  });

  test('Test: découpe la phrase en plusieurs paragraphes', () => {
    const { container } = render(<AboutMe />);
    const paragraphs = container.querySelectorAll('#about p');
    expect(paragraphs.length).toBeGreaterThan(5);
    expect(screen.getByText((content, element) =>
      element?.tagName.toLowerCase() === 'p' && content.includes("Tout")
    )).toBeInTheDocument();
  });

  test('Test: appelle gsap.registerPlugin lors du montage', () => {
    render(<AboutMe />);
    expect(gsap.registerPlugin).toHaveBeenCalled();
  });
});
