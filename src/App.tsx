import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivacyPolicyPage from "./legal/PrivacyPolicyPage";
import TermsOfServicePage from "./legal/TermsOfServicePage";
import PrismaAgencyLanding from "./PrismaAgencyLanding";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-[#07070c]">
              <PrismaAgencyLanding />
            </div>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      </Routes>
    </BrowserRouter>
  );
}
