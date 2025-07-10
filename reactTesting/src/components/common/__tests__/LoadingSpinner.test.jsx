import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  test("renders with default props", () => {
    render(<LoadingSpinner />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders with custom text", () => {
    render(<LoadingSpinner text="Custom loading text" />);
    expect(screen.getByText("Custom loading text")).toBeInTheDocument();
  });

  test("renders without text when text prop is empty", () => {
    render(<LoadingSpinner text="" />);
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});
