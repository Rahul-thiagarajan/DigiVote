import { Navbar, Welcome, Footer, Services } from "./components";
import { useEffect } from "react";



const App = () => (
  
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      
      <Navbar />
      <Welcome />
    </div>
    <Services />
    
    <Footer />
  </div>
);

export default App;
