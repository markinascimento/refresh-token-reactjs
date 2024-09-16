import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Router } from "./router";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}
