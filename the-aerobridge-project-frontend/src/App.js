import "./App.css";
import React from "react";
import "jquery/dist/jquery.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";

import Bootnav from "./Components/Bootnav/Bootnav";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Inventory from "./Pages/Inventory/Inventory";
import MasterComponent from "./Pages/MasterComponent/MasterComponent";
import CreateMasterComponent from "./Pages/MasterComponent/CreateMasterComponent";
import EditMasterComponent from "./Pages/MasterComponent/EditMasterComponent";
import AddStock from "./Pages/MasterComponent/AddStock";
import EditStock from "./Pages/MasterComponent/EditStock";
import Models from "./Pages/Models/Models";
import Series from "./Pages/Series/Series";
import { CreateModel } from "./Pages/Model/CreateModel";
import { EditModel } from "./Pages/Model/EditModel";
import Aircrafts from "./Pages/Aircrafts/Aircrafts";
import Aircraft from "./Pages/Aircrafts/Aircraft";
import Builds from "./Pages/Build/Builds";
import ScrollToTop from "./Components/ScrollToTop";
import Serie from "./Pages/Serie/Serie";
import { CreateSerie } from "./Pages/Serie/CreateSerie";
import { EditSerie } from "./Pages/Serie/EditSerie";
import AddMasterComponent from "./Pages/Serie/AddMasterComponent";
import EditMasterComponents from "./Pages/Serie/EditMasterComponents";
import BuildInfo from "./Pages/Build/BuildInfo";
import ErrorPage from "./Pages/Error/ErrorPage";
import PrivatePage from "./Pages/AerobridgeId/PrivatePage";
import EditAircraft from "./Pages/Aircrafts/EditAircraft";

function App() {
  return (
    <Router>
      <Bootnav />
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/:modelId" element={<Series />} />
          <Route path="/models/create" element={<CreateModel />} />
          <Route path="/models/:modelId/edit" element={<EditModel />} />
          <Route path="/models/:modelId/serie/:serieId" element={<Serie />} />
          <Route
            path="/models/:modelId/serie/create"
            element={<CreateSerie />}
          />
          <Route
            path="/models/:modelId/serie/:serieId/edit"
            element={<EditSerie />}
          />
          <Route
            path="/models/:modelId/serie/:serieId/add-master-components"
            element={<AddMasterComponent />}
          />
          <Route
            path="/models/:modelId/serie/:serieId/edit-master-components"
            element={<EditMasterComponents />}
          />

          <Route path="/inventory" element={<Inventory />} />

          <Route path="/master-component/:id" element={<MasterComponent />} />
          <Route
            path="/master-component/create"
            element={<CreateMasterComponent />}
          />
          <Route
            path="/master-component/edit/:id"
            element={<EditMasterComponent />}
          />
          <Route
            path="/master-component/:id/add-stock"
            element={<AddStock />}
          />
          <Route
            path="/master-component/:id/edit-stock/:stockId"
            element={<EditStock />}
          />

          <Route path="/builds" element={<Builds />} />
          <Route
            path="/buildInfo/:modelId/serie/:serieId"
            element={<BuildInfo />}
          />
          <Route path="/aircraft/edit/:aircraftId" element={<EditAircraft />} />

          <Route path="/aircrafts" element={<Aircrafts />} />
          <Route path="/aircraft/:aircraftId" element={<Aircraft />} />

          <Route path="/search/:aerobridgeId" element={<PrivatePage />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
