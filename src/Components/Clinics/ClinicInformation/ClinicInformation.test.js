import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ClinicInformation from "./ClinicInformation";

describe("ClinicInformation", () => {
  it("should render the component", () => {
    render(
      <MemoryRouter>
        <ClinicInformation />
      </MemoryRouter>
    );

    // Check if the component renders without errors
    expect(screen.getByText("Clinic Information")).toBeInTheDocument();
  });

  it("should navigate to the Add Clinic page when the Add Clinic button is clicked", () => {
    render(
      <MemoryRouter>
        <ClinicInformation />
      </MemoryRouter>
    );

    // Find the Add Clinic button and click it
    const addClinicButton = screen.getByText("Add Clinic");
    fireEvent.click(addClinicButton);

    // Check if the navigation to the Add Clinic page occurred
    // You can add assertions specific to your routing setup or library
  });
});
