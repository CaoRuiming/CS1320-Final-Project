import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import CourseList from '../pages/CourseList'; 
import App from '../App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders the course list without courses', () => { 
  act(() => { 
    render(<CourseList/>, container); 
  }); 
  expect(container.querySelector('enrolled-courses').textContent).toBe("Enrolled Courses"); 
}); 

test('dummy test', () => {
  expect(1).toEqual(1);
});
