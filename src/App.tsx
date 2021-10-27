
import { Layout, Menu } from "antd";
import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";
import Records from "./components/Records";

function App() {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout className="layout">
      <AppHeader />
      <Content style={{ padding: "50px 50px" }}>
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/categories" component={Categories} />
        <PrivateRoute path="/records" component={Records} />
        <Route path="/logout" component={Logout}
         />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Harcama Takip ©2021 Esra Çebi
      </Footer>
    </Layout>
  );
}

export default App;
