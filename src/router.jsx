import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import Playground from './views/playground/Playground.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        path: '/playground',
        element: <Playground></Playground>
      }
    ]
  },
])


export default router