import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Index";
import Ligue from "./pages/Ligue";
import Troc from "./pages/Troc";
import Dons from "./pages/Dons";
import Profil from "./pages/Profil";
import Forfaits from "./pages/Forfaits";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ligue" element={<Ligue />} />
            <Route path="/troc" element={<Troc />} />
            <Route path="/dons" element={<Dons />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/forfaits" element={<Forfaits />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
