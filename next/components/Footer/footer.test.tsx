// components/Content/Content.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './content';

describe('Content component', () => {

  test('Test: affiche les textes de version', () => {
    render(<Footer />);
    expect(screen.getByText("VERSION")).toBeInTheDocument();
    expect(screen.getByText("2025 © Edition")).toBeInTheDocument();
  });

  test('Test: affiche les textes de local time', () => {
    render(<Footer />);
    expect(screen.getByText("LOCAL TIME")).toBeInTheDocument();
    expect(screen.getByText("23:00 PM GMT+2")).toBeInTheDocument();
  });

  test('Test: affiche le texte de "SOCIALS"', () => {
    render(<Footer />);
    expect(screen.getByText("SOCIALS")).toBeInTheDocument();
  });

  test('Test: affiche le lien de "GitHub"', () => {
    render(<Footer />);
    const githubButton = screen.getByTestId("button-GitHub");
    expect(githubButton).toBeInTheDocument();
  });
  test('Test: affiche le lien de "LinkedIn"', () => {
    render(<Footer />);
    const linkedinButton = screen.getByTestId("button-LinkedIn");
    expect(linkedinButton).toBeInTheDocument();
  });
  test('Test: affiche le lien de "Email"', () => {
    render(<Footer />);
    const emailButton = screen.getByTestId("button-Email");
    expect(emailButton).toBeInTheDocument();
  });
  test('Test: affiche le lien de "CV"', () => {
    render(<Footer />);
    const cvButton = screen.getByTestId("button-CV");
    expect(cvButton).toBeInTheDocument();
  });

});
