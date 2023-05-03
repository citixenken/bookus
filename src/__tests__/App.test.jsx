import App from "../App";
import { it, describe, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";

describe("App.jsx", () => {
  it("renders the landing page by default", async () => {
    // properly render our app
    await act(async () => {
      render(
        <AuthContextProvider>
          <Router>
            <App />
          </Router>
        </AuthContextProvider>
      );
      screen.debug();
    });
  });
});
