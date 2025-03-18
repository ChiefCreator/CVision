import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateResume from "../pages/CreateResume/CreateResume";

// import { ImageManagerProvider } from "../context/ImageManagerContext";
import { ResumeProvider } from "../context/ResumeContext";
import { AsideProvider } from "../context/AsideContext";
import { HeaderProvider } from "../context/HeaderContext";

import "./../assets/styles/_vars.scss";
import "./../assets/styles/_mixin.scss";
import "./../assets/styles/_utils.scss";
import "./../assets/styles/_reset.scss";
import "./../assets/styles/_base.scss";


export default function App() {

  return (
    <ResumeProvider>
      {/* <ImageManagerProvider> */}
        <HeaderProvider>
          <AsideProvider>
            <BrowserRouter>
              <Routes future={{ v7_relativeSplatPath: true }}>
                <Route path="/" element={<HomeLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="settings" element={<div>Настройки</div>} />
                </Route>
                <Route path="create-resume/:resumeId" element={<CreateResume />} />
              </Routes>
            </BrowserRouter>
          </AsideProvider>
        </HeaderProvider>
      {/* </ImageManagerProvider> */}
    </ResumeProvider>
  )
}