import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AllPets from './AllPets';

jest.mock('axios');

describe('AllPets Component', () => {
  test('renders AllPets component', async () => {
    const mockApiData = [
      { petId: 1, petName: 'Dog', city: 'New York' },
      { petId: 2, petName: 'Cat', city: 'Los Angeles' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockApiData });

    render(<AllPets />);

    await waitFor(() => {
      expect(screen.getByText('Dog')).toBeInTheDocument();
      expect(screen.getByText('Cat')).toBeInTheDocument();
    });
  });

  test('deletes a pet on button click', async () => {
    const mockApiData = [
      { petId: 1, petName: 'Dog', city: 'New York' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockApiData });
    axios.delete.mockResolvedValueOnce({ data: {} });

    render(<AllPets />);

    await waitFor(() => {
      expect(screen.getByText('Dog')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        'https://petservice.dev.skillassure.com/pet/pet/delete/1'
      );
    });

    expect(screen.queryByText('Dog')).not.toBeInTheDocument();
  });
});


// import React from 'react';
// import {fireEvent, render, screen, waitFor} from "@testing-library/react"
// import AllPets from './AllPets';


// jest.mock("axios", ()=>({

//     __esModule: true,
 
//      default:{
//          get: ()=> ({
//              data:{petName:""}
//          })
//      }
//  }))

//  test("username petname should be rendered", ()=>{
//     render(<AllPets/>);
//     const petname = screen.getByTestId(/petname/i);
//     expect(petname).toBeInTheDocument()
//  })