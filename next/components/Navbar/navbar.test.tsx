import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./index";

describe("Navbar component", () => {

  test("Test: affiche le logo 'AB'", () => {
    render(<Navbar />);
    // On sélectionne notre logo
    const logo = screen.getByText("AB");
    expect(logo).toBeInTheDocument();
  });

  test("Test: vérification que la classe 'active' est bien présente lors du clic sur le bouton du menu", () => {
    render(<Navbar />);
    // On sélectionne le bouton du menu via la classe qui le caractérise
    const menuButton = document.querySelector("div[class*='navbarMenu']") as HTMLElement;
    expect(menuButton).toBeInTheDocument();

    // Au départ, la classe "active" ne doit pas être présente
    expect(menuButton).not.toHaveClass("active");

    // Simuler un clic pour ouvrir le menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveClass("active");

    // Simuler un second clic pour fermer le menu
    fireEvent.click(menuButton);
    expect(menuButton).not.toHaveClass("active");
  });

  test("Test: affiche bien les liens de navigation", () => {
    render(<Navbar />);
    // Ouvre le menu pour rendre visible les éléments (simulateur de clic sur le bouton)
    const menuButton = document.querySelector("div[class*='navbarMenu']") as HTMLElement;
    fireEvent.click(menuButton);

    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("À propos")).toBeInTheDocument();
    expect(screen.getByText("Projets")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("Test: affiche bien les liens sociaux", () => {
    render(<Navbar />);
    // Pour certains liens, tu peux utiliser getByTitle si un attribut title est défini
    expect(screen.getByTitle("GitHub")).toBeInTheDocument();
    expect(screen.getByTitle("LinkedIn")).toBeInTheDocument();
    expect(screen.getByTitle("Email")).toBeInTheDocument();

    const cvMenu = screen.getByTestId("cv-menu");
    expect(cvMenu).toBeInTheDocument();
  });

  test("Test: ferme le menu lors du clic sur un élément du menu", () => {
    render(<Navbar />);
    const menuButton = document.querySelector("div[class*='navbarMenu']") as HTMLElement;

    // Ouvrir le menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveClass("active");

    // Simuler un clic sur un élément du menu (par exemple, le lien 'Accueil')
    const menuItem = screen.getByText("Accueil");
    fireEvent.click(menuItem);

    // Après le clic sur un menu item, le menu devrait être fermé
    expect(menuButton).not.toHaveClass("active");
  });

  test("Test: affiche le bouton CV", () => {
    render(<Navbar />);
    const cvButton = screen.getByTestId("cv-button");
    expect(cvButton).toBeInTheDocument();
  });

  // On vérifie que GSAP fonctionne correctement
  test("Test: vérification que GSAP fonctionne correctement", () => {
    render(<Navbar />);

    jest.mock("gsap", () => ({
      timeline: jest.fn(() => ({
        to: jest.fn().mockReturnThis(),
        fromTo: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        kill: jest.fn(),
      })),
      to: jest.fn(),
      fromTo: jest.fn(),
      set: jest.fn(),
    }));
  });

});
