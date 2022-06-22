import { render, screen } from '@testing-library/react';
import App from './App';
import renderer from "react-test-renderer";

test('renders learn react link', () => {
  render(<App />);
  const headerElement = screen.getByText(/Post App/i);
  const dashboardElement = screen.getByTestId('post-dashboard')
  expect(headerElement).toBeInTheDocument();
  expect(dashboardElement).toBeInTheDocument();
});

test("match snapshot",()=>{
  const element = renderer.create(<App/>).toJSON();
  expect(element).toMatchSnapshot();
})