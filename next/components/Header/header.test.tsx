import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';
import gsap from 'gsap';

jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  to: jest.fn(),
  set: jest.fn(),
}));

describe('Header component', () => {
  test("Test: vérification que le container principal contient l'id 'home'", () => {
    const { container } = render(<Header />);
    const headerContainer = container.querySelector('#home');
    expect(headerContainer).toBeInTheDocument();
  });

  test("Test: affiche les textes 'Développeur' et 'Full-stack'", () => {
    render(<Header />);
    expect(screen.getByText("Développeur")).toBeInTheDocument();
    expect(screen.getByText("Full-stack")).toBeInTheDocument();
  });

  test("Test: affiche trois fois le texte 'Alexis Brun -' dans le slider", () => {
    render(<Header />);
    const sliderTexts = screen.getAllByText("Alexis Brun -");
    expect(sliderTexts.length).toBe(3);
  });

  test("Test: affiche deux images avec l'attribut alt 'Picture'", () => {
    render(<Header />);
    const images = screen.getAllByAltText("Picture");
    expect(images.length).toBe(2);
  });

  test("Test: appelle gsap.registerPlugin lors du montage", () => {
    render(<Header />);
    expect(gsap.registerPlugin).toHaveBeenCalled();
  });

  test("Test: appelle gsap.registerPlugin lors du montage", () => {
    jest.mock('gsap', () => ({
      registerPlugin: jest.fn(),
      to: jest.fn(),
      set: jest.fn(),
    }));
  });
});
