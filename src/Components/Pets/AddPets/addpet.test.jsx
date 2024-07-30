import { render,screen,fireEvent } from "@testing-library/react";
import AddPets from "./AddPets";

jest.mock("axios", ()=>({

    __esModule: true,
 
     default:{
         post: ()=> ({
             data:{petName:""}
         })
     }
 }))

test('The firstname should be rendered', () =>{
    render(<AddPets/>);
    const firstname = screen.getByTestId(/vinay/i);
    expect(firstname).toBeInTheDocument('')
})

test('The lastname should be rendered',() =>{
    render(<AddPets/>);
    const lastname = screen.getByTestId(/last/i);
    expect(lastname).toBeInTheDocument('')
})

test('The username should be rendered', () =>{
    render(<AddPets/>);
    const username = screen.getByTestId(/petuser/i);
    expect(username).toBeInTheDocument('')
})

test('The email should be rendered',()=>{
    render(<AddPets/>);
    const petemail = screen.getByTestId(/petemail/);
    expect(petemail).toBeInTheDocument('')
})


test('The petAge should be rendered',() =>{
    render(<AddPets/>);
    const petAge = screen.getByTestId(/petAge/i)
    expect(petAge).toBeInTheDocument('')
})

test('The gender should be rendered',() =>{
    render(<AddPets/>);
    const petGender = screen.getAllByTestId(/petgender/i)
    expect(petGender.length).toBe(2)
})

test('The petadress should be rendered', () =>{
    render(<AddPets/>);
    const petadress = screen.getByTestId(/petadress/i);
    expect(petadress).toBeInTheDocument('')
})



test('The country should be rendered', ()=>{
    render(<AddPets/>);
    const country = screen.getByTestId(/petcountry/i);
    expect(country).toBeInTheDocument('')
})

test('The petcity should be rendered', ()=>{
    render(<AddPets/>);
    const city = screen.getByTestId(/petcity/i);
    expect(city).toBeInTheDocument('')

})

test('The petstate should be rendered ', ()=>{
    render(<AddPets/>);
    const state  = screen.getByTestId(/petstate/i);
    expect(state).toBeInTheDocument('')
})

test('The petpincode should be rendered ', ()=>{
    render(<AddPets/>);
    const pincode  = screen.getByTestId(/petpincode/i);
    expect(pincode).toBeInTheDocument()
})

test('The petphonenumber should be rendered ', ()=>{
    render(<AddPets/>);
    const petphonenumber  = screen.getByTestId(/petphonenumber/i);
    expect(petphonenumber).toBeInTheDocument()
})

test('The petbiography should be rendered ', ()=>{
    render(<AddPets/>);
    const petbiography  = screen.getByTestId(/petbiography/i);
    expect(petbiography).toBeInTheDocument()
})

test('The petStatus should be rendered ', ()=>{
    render(<AddPets/>);
    const petStatus  = screen.getAllByTestId(/petStatus/i);
    expect(petStatus.length).toBe(2)
})

test('The error message should be disabled', ()=>{
    render(<AddPets/>);
    const error1 = screen.getByTestId(/error/i)

    const petemail = screen.getByTestId(/petemail/);

    fireEvent.change(petemail, {target:{value: testValue}});
    expect(error1).not.toBeVisible(true)
})

test('The error message should be disabled', ()=>{
    render(<AddPets/>);
    const error2 = screen.getByTestId(/error1/i)

    const petemail = screen.getByTestId(/petemail/);

    fireEvent.change(petemail, {target:{value: testValue}});
    expect(error2).not.toBeVisible(true)
})
