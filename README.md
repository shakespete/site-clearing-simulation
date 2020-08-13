## Developer Notes

1) This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using TypeScript boiler plate.
2) The development of the application was initially started in: https://github.com/shakespete/react/tree/dev/TS/site-clearing-simulation. You may check this for a more complete history of commits.
3) Sample input files can be found in the directory inside the root of the project: input_files
4) Canvas map site is generated on file upload. The generation of the canvas size is not dynamic, the best fit is a data set that is 22 blocks wide and 11 blocks high (use `input_fit_to_canvas.txt` sample input). Any data set higher than given bounds will still generate the correct total but not shown by the limited canvas space.

## Assumptions Made Regarding Requirements

1) The blocks marked as 'T' (Protected Trees) are treated as normal trees 't' with regards to fuel consumption and paint damage. The simulation is then terminated after the advance command that travels across said 'T' blocks.
2) The cost of legal fees for traversing across Protected Trees is not indicated in requirements doc, the application uses the cost 10. (i.e. If the bulldozer travels across 2 adjacent T's the simulation ends and the computation for the cost of destruction of protected trees is: 2 X 10 = 20)

## Running the Application

1) Clone the repo into your local machine.
2) run `npm i` in project root.
3) run `npm start`
4) run `npm test -- --coverage --watchAll=false` to generate unit test coverage

## Design and Approach

The application uses a Redux like state management system centered around the `useContext` and `useReducer` hooks. Redux was a possible alternative but given the simplicity of the application, the hooks were fit for the purpose. The whole `<App>` is wrapped by the `<MapProvider>` thus allowing access to all the child components. All business logic is placed within the action creators under the actions folder and the reducer functions is relegated to a simple update of the store. All unit tests can be found in the `App.spec.tsx` file.

In terms of user interface, the application shows all 3 main features at the same time. On file upload a site map is plotted on a canvas showing the layout of the data. On traversal the map is updated indicated by green blocks. The cost report and command list is also shown and updated on user update. The total cost is computed when the application is terminated with the option to reset. Invalid input data is also not accepted.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
