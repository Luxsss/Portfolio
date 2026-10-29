import '@testing-library/jest-dom';

global.fetch = jest.fn();

// jsdom ships HTMLDialogElement without its modal methods.
HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
  this.open = true;
};
HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
  this.open = false;
};

// Layout observers and canvas are not implemented by jsdom; components only need them to exist.
class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ObserverStub as unknown as typeof ResizeObserver;
global.IntersectionObserver = ObserverStub as unknown as typeof IntersectionObserver;
HTMLCanvasElement.prototype.getContext = (() => null) as unknown as HTMLCanvasElement['getContext'];
