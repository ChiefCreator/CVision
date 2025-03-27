import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Register from "../pages/Register/Register";
import LogIn from "../pages/LogIn/LogIn";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateResume from "../pages/CreateResume/CreateResume";
import EditCoverLetter from "../pages/EditCoverLetter/EditCoverLetter";

import { AuthProvider } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext";
import { CoverLettersProvider } from "../context/CoverLettersContext";
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
    <AuthProvider>
      <UserProvider>
        <ResumeProvider>
          <CoverLettersProvider>
            <HeaderProvider>
              <AsideProvider>
    
                <BrowserRouter>
                  <Routes future={{ v7_relativeSplatPath: true }}>
    
                    <Route path="auth" element={<AuthLayout />}> 
                      <Route index element={<Navigate to="login" />} />
    
                      <Route path="login" element={<LogIn />} />
                      <Route path="register" element={<Register />} />
                    </Route>
    
                    <Route path="/" element={<HomeLayout />}>
                      <Route element={<ProtectedRoute />}>
                        <Route index element={<Dashboard />} />

                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="settings" element={<div>Настройки</div>} />
                      </Route>
                    </Route>
    
                    <Route path="resumes/:resumeId/edit" element={<CreateResume />} />
                    <Route path="cover-letters/:coverLetterId/edit" element={<EditCoverLetter />} />
    
                  </Routes>
                </BrowserRouter>
    
              </AsideProvider>
            </HeaderProvider>
          </CoverLettersProvider>
        </ResumeProvider>
      </UserProvider>
    </AuthProvider>
  )
}