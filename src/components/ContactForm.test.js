import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const FirstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(FirstName, 'abdd');

    const output = screen.queryByText(/error: firstname must have at least 5 characters/i)
    expect(output).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const button = screen.queryByText(/submit/i)
    userEvent.click(button)

    const firstname = screen.queryByText(/error: firstname/i)
    expect(firstname).toBeInTheDocument();

    const lastname = screen.queryByText(/error: lastname/i)
    expect(lastname).toBeInTheDocument();

    const email = screen.queryByText(/error: email/i)
    expect(email).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const FirstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(FirstName, 'lorenzo');
   

    const LastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(LastName, 'gallo');
    
    const Email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(Email, '');

    const button = screen.queryByText(/submit/i)
    userEvent.click(button)

    const output = screen.queryByText(/error: email/i)
    expect(output).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const Email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(Email, 'asdeasrtfawsdfewdf');

    const output = screen.queryByText(/error: email/i)
    expect(output).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const LastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(LastName, '');
    

    const button = screen.queryByText(/submit/i)
    userEvent.click(button)

    const output = screen.queryByText(/error: lastname/i)
    expect(output).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const FirstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(FirstName, 'lorenzo');
    

    const LastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(LastName, 'gallo');
    
    const Email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(Email, 'lgallo2005@gmail.com');

    const button = screen.queryByText(/submit/i)
    userEvent.click(button)
    
    const output1 = screen.queryByText(/you submitted:/i);
    expect(output1).toBeInTheDocument();

    const output2 = screen.queryByText(/first name:/i);
    expect(output2).toBeInTheDocument();
    
    const output3 = screen.queryByText(/last name:/i);
    expect(output3).toBeInTheDocument();

    const output4 = screen.queryByText(/email:/i);
    expect(output4).toBeInTheDocument();

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const FirstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(FirstName, 'lorenzo');

    const LastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(LastName, 'gallo');
    
    const Email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(Email, 'lgallo2005@gmail.com');

    const Msg = screen.queryByLabelText(/message/i);
    userEvent.type(Msg, 'lasdgtfregtdafsgasdrf');

    const button = screen.queryByText(/submit/i)
    userEvent.click(button)

    const output1 = screen.queryByText(/you submitted:/i);
    expect(output1).toBeInTheDocument();

    const output2 = screen.queryByText(/first name:/i);
    expect(output2).toBeInTheDocument();
    
    const output3 = screen.queryByText(/last name:/i);
    expect(output3).toBeInTheDocument();

    const output4 = screen.queryByText(/email:/i);
    expect(output4).toBeInTheDocument();

    const output5 = screen.queryByText(/message:/i);
    expect(output5).toBeInTheDocument();
});