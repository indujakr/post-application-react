import React from "react";
import { render, screen } from '@testing-library/react';
import AddPost from '../AddPost';

test("render post card without crashing",()=>{
    render(<AddPost add={true} />);
    const cardElement = screen.getByTestId('post-modal');
    expect(cardElement).toBeInTheDocument();
})

test("renders post body without crashing",()=>{
    render(<AddPost add={true} />);
    const bodyElement = screen.getByTestId('add-post-body');
    expect(bodyElement).toBeInTheDocument();
    const titleElement = screen.getByTestId('add-post-title');
    expect(titleElement).toBeInTheDocument();
})
