import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import ErrorPage from "./pages/ErrorPage";
import Error404 from "./pages/Error404";
import GamePage from "./pages/GamePage";
import MenuPage from "./pages/MenuPage";

const browserRouter = createBrowserRouter(
    [
        {
            path: "/game",
            Component: GamePage,
            ErrorBoundary: ErrorPage,
        },
        {
            path: "/",
            Component: MenuPage,
            ErrorBoundary: ErrorPage,
        },
        {
            path: "*",
            Component: Error404,
        },
    ],
    {
        basename: import.meta.env.VITE_BASE_URL,
    }
);

const Router = () => <RouterProvider router={browserRouter} />;

export default Router;
