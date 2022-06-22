import React from "react";
import { render, screen } from '@testing-library/react';
import Posts from "../Posts";
import renderer from "react-test-renderer";

let postDetails ={
    userId: 1,
    id: 2,
    user:"Leanne Graham",
    color:"rgb(225, 174, 177)",
    title: "Title Content",
    body: "Body Content"
  }

test("render post card without crashing",()=>{
    render(<Posts postDetails={postDetails} />);
    const cardElement = screen.getByTestId('post-card');
    expect(cardElement).toBeInTheDocument();
})

test("render post card data with crashing",()=>{
    render(<Posts postDetails={postDetails} />);
    const titleElement = screen.getByText('Title Content');
    const bodyElement = screen.getByText('Body Content');
    expect(titleElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
})

test("match snapshot",()=>{
    const element = renderer.create(<Posts postDetails={postDetails} />).toJSON();
    expect(element).toMatchSnapshot();
})

