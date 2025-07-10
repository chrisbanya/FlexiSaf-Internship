import "@testing-library/jest-dom";

// Mock fetch globally
global.fetch = vi.fn();

// Clear all mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});
