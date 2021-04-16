import React from 'react';
import renderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ApiService from '../services/ApiService'; 
import CourseList from '../pages/CourseList'; 
import PostView from '../components/PostView/index'; 
import App from '../App';
import  JoinCourseButton  from '../components/forms/JoinCourseForm';


// let container = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null; 
// });
 

test('dummy test', () => {
  jest.mock('../services/ApiService'); 
  // const tree = renderer.create(<PostView></PostView>).toJSON(); 
  // expect(tree).toMatchInlineSnapshot();
  expect(1).toEqual(1);
});
