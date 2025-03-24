// components/Contact/Contact.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Contact from './index';
import gsap from 'gsap';

// On mocke gsap pour éviter d'exécuter les animations réelles
jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  fromTo: jest.fn(),
  to: jest.fn(() => ({ kill: jest.fn() })),
  set: jest.fn(),
}));

describe('Contact component', () => {
  test("Test: vérification que le container principal contient l'id 'contact'", () => {
    const { container } = render(<Contact />);
    const aboutMeContainer = container.querySelector('#contact');
    expect(aboutMeContainer).toBeInTheDocument();
  });

  test("Test: vérification que le boutton 'DÉRANGEZ-MOI' est présent", () => {
    render(<Contact />);
    const contactButton = screen.getByTestId("button-contact");
    expect(contactButton).toBeInTheDocument();
  });

  test('Test: ouvre la modal lorsqu\'on clique sur le bouton "DÉRANGEZ-MOI"', async () => {
    render(<Contact />);
    const button = screen.getByText("DÉRANGEZ-MOI");
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => expect(screen.getByRole('button', { name: "X" })).toBeInTheDocument());
    expect(screen.getByLabelText("Prénom")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  test("Test: vérfie que le champ 'Prénom' apprait bien lorsque la modal est ouverte", async () => {
    render(<Contact />);
    const button = screen.getByText("DÉRANGEZ-MOI");
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => expect(screen.getByRole('button', { name: "X" })).toBeInTheDocument());
    expect(screen.getByLabelText("Prénom")).toBeInTheDocument();
  });
  
  test("Test: vérfie que le champ 'Email' apprait bien lorsque la modal est ouverte", async () => {
    render(<Contact />);
    const button = screen.getByText("DÉRANGEZ-MOI");
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => expect(screen.getByRole('button', { name: "X" })).toBeInTheDocument());
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  test("Test: vérfie que le champ 'Message' apprait bien lorsque la modal est ouverte", async () => {
    render(<Contact />);
    const button = screen.getByText("DÉRANGEZ-MOI");
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => expect(screen.getByRole('button', { name: "X" })).toBeInTheDocument());
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  test('Test: ferme la modal lorsqu\'on clique sur le bouton de fermeture "X"', async () => {
    render(<Contact />);
    const button = screen.getByText("DÉRANGEZ-MOI");
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => expect(screen.getByRole('button', { name: "X" })).toBeInTheDocument());
    const closeButton = screen.getByRole('button', { name: "X" });
    act(() => {
      fireEvent.click(closeButton);
    });
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: "X" })).not.toBeInTheDocument();
    });
  });

});
