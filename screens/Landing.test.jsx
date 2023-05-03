import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { UserAuth } from "../context/AuthContext";
import { vi } from "vitest";
import Landing from "./Landing";
import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", () => {
  return {
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
    Link: vi.fn().mockReturnValue(null),
  };
});

vi.mock("../context/AuthContext", () => {
  return {
    UserAuth: vi.fn().mockReturnValue({
      user: null,
      signIn: vi.fn().mockReturnValue(Promise.resolve()),
      signInGoogle: vi.fn().mockReturnValue(Promise.resolve()),
    }),
  };
});

describe("Landing component", () => {
  it("should render without errors", () => {
    const { getByText } = render(<Landing />);
    expect(getByText("SIL Assessment Center")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
  });

  it("should handle email/password sign-in correctly", async () => {
    const { getByPlaceholderText, getByText } = render(<Landing />);
    const emailInput = getByPlaceholderText("Your Email");
    const passwordInput = getByPlaceholderText("Your Password");
    const submitBtn = getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(UserAuth().signIn).toHaveBeenCalledWith(
      "test@test.com",
      "password123"
    );
  });
  it("should handle Google sign-in correctly", async () => {
    const { getByText } = render(<Landing />);
    const googleSignInBtn = getByText(/continue with google/i);

    await act(async () => {
      fireEvent.click(googleSignInBtn);
    });

    expect(UserAuth().signInGoogle).toHaveBeenCalled();
  });
});
