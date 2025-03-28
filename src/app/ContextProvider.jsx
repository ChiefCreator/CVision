import { AuthProvider } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext";
import { CoverLettersProvider } from "../context/CoverLettersContext";
import { ResumeProvider } from "../context/ResumeContext";
import { AsideProvider } from "../context/AsideContext";
import { HeaderProvider } from "../context/HeaderContext";

export default function ContextProvider({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <ResumeProvider>
          <CoverLettersProvider>
            <HeaderProvider>
              <AsideProvider>
                {children}
              </AsideProvider>
            </HeaderProvider>
          </CoverLettersProvider>
        </ResumeProvider>
      </UserProvider>
    </AuthProvider>
  );
}