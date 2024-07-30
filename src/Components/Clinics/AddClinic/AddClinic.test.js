
import { render, screen, fireEvent } from '@testing-library/react';
import AddClinic from '../AddClinic/AddClinic';

test("renders form properly and submits successfully", () => {
  render(<AddClinic />);

  const clinicInfoInput = screen.getByTestId("clinicInfoInput");
//   const clinicNameInput = screen.getByTestId("clinicNameInput");
  const locationInput = screen.getByTestId("locationInput");
  const timingsInput = screen.getByTestId("timingsInput");
  const phoneNumberInput = screen.getByTestId("phoneNumberInput");
  const addClinicButton = screen.getByTestId("addClinicButton");

  fireEvent.change(clinicInfoInput, { target: { value: "Clinic Info" } });
  fireEvent.change(locationInput, { target: { value: "Clinic Location" } });
  fireEvent.change(timingsInput, { target: { value: "Open Time" } });
  fireEvent.change(phoneNumberInput, { target: { value: "Contact Number" } });

  

  fireEvent.click(addClinicButton);

  // Assertions
  expect(screen.queryByText("Clinic Info is required!")).toBeNull();
  expect(screen.queryByText("Clinic Location is required!")).toBeNull();
  expect(screen.queryByText("Open Time is required!")).toBeNull();
  expect(screen.queryByText("Clinic Contact Number is required!")).toBeNull();
  // Add more assertions as needed for the desired behavior after form submission
});

test('clinic name input should be rendered', () =>{
    render(<AddClinic/>);
    const clinicNameInput = screen.getByTestId("clinicNameInput");
  fireEvent.change(clinicNameInput, { target: { value: "Clinic Name" } });
  expect(screen.queryByText("Clinic Name is required!")).toBeNull();


})
