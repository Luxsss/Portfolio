import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from './index';
import { fr } from '@/content/fr';

const fetchMock = global.fetch as jest.Mock;
const dialog = () => screen.getByRole('dialog', { hidden: true }) as HTMLDialogElement;

function openAndFill() {
  fireEvent.click(screen.getByTestId('button-contact'));
  fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: 'Ada' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Bonjour' } });
  fireEvent.submit(screen.getByRole('button', { name: 'Envoyer' }));
}

describe('Contact component', () => {
  beforeEach(() => fetchMock.mockReset());

  test("rend la section 'contact' avec son titre, l'email et le bouton du formulaire", () => {
    const { container } = render(<Contact t={fr.contact} />);
    expect(container.querySelector('section#contact')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /alexsdev@outlook\.fr/ })).toBeInTheDocument();
    expect(screen.getByTestId('button-contact')).toHaveTextContent('Envoyer un message');
  });

  test('ouvre puis ferme la modal', () => {
    render(<Contact t={fr.contact} />);
    expect(dialog().open).toBe(false);
    fireEvent.click(screen.getByTestId('button-contact'));
    expect(dialog().open).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Fermer' }));
    expect(dialog().open).toBe(false);
  });

  test("copie l'email dans le presse-papier", async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<Contact t={fr.contact} />);
    fireEvent.click(screen.getByRole('button', { name: /alexsdev@outlook\.fr/ }));
    expect(writeText).toHaveBeenCalledWith('alexsdev@outlook.fr');
    expect(await screen.findByText('Copié')).toBeInTheDocument();
  });

  test("envoie le formulaire et confirme l'envoi", async () => {
    fetchMock.mockResolvedValue({ ok: true });
    render(<Contact t={fr.contact} />);
    openAndFill();
    expect(await screen.findByText('Merci, je vous réponds au plus vite.')).toBeInTheDocument();
    expect(dialog()).toHaveAccessibleName('Message envoyé');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://submit-form.com/OTTnr3nxj');
    expect(JSON.parse(init.body)).toEqual({ message: 'Bonjour', _email: { from: 'ada@example.com', subject: 'Ada' } });
  });

  test("affiche une erreur actionnable quand l'envoi échoue", async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 });
    render(<Contact t={fr.contact} />);
    openAndFill();
    expect(await screen.findByRole('alert', { hidden: true })).toHaveTextContent('L’envoi a échoué');
    await waitFor(() => expect(screen.getByRole('button', { name: 'Envoyer' })).toBeEnabled());
  });
});
