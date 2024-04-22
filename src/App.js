import "../src/main.scss";
// import { FileUpload } from "./FileUpload";
// import { Table1 } from "./Table1";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
function App() {
  return (
    <div className="App">
      <RouterProvider
        router={routes}
        fallbackElement={<p>Initial Load...</p>}
      />
      {/* <FileUpload /> */}
      {/* <Table1 /> */}
    </div>
  );
}

export default App;
