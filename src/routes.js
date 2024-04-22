import React from "react";
import {
  //   Form,
  //   Link,
  //   Outlet,
  //   RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  //   redirect,
  //   useActionData,
  //   useFetcher,
  //   useLocation,
  //   useNavigation,
  //   useRouteLoaderData,
} from "react-router-dom";
import { FileUpload } from "./FileUpload";
import { Table1 } from "./Table1";
import ErrorPage from "./error-page";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Table1 />} errorElement={<ErrorPage />} />
      <Route path="/file-upload" element={<FileUpload />} />
      <Route
        path="dashboard"
        element={<Table1 />}
        // loader={({ request }) =>
        //   fetch("/api/dashboard.json", {
        //     signal: request.signal,
        //   })
        // }
      />
      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} loader={redirectIfUser} />
        <Route path="logout" action={logoutUser} />
      </Route> */}
    </>
  )
);

export default routes;

<Route
  path="/"
  // element={<Table1 />}
  // errorElement={<ErrorPage />}
></Route>;
