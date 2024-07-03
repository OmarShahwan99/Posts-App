import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AuthRoutes from "./routes/auth.routes";
import PrivateRoutes from "./routes/private.routes";
import useSession from "./utils/use-session";
import Layout from "./components/Layout/Layout";

const App: React.FC = () => {
  const { isAuth } = useSession();
  return (
    <Router>
      {!isAuth && <AuthRoutes />}
      {isAuth && (
        <Layout>
          <PrivateRoutes />
        </Layout>
      )}
    </Router>
  );
};

export default App;
