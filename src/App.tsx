
import { Layout, Menu } from "antd";
import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";

function App() {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          {new Array(3).fill(null).map((_, index) => {
            const key = index + 1;
            return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
          })}
        </Menu>
      </Header>
      <Content style={{ padding: "50px 50px" }}>
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/categories" component={Categories} />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Harcama Takip ©2021 Esra Çebi
      </Footer>
    </Layout>
  );
}

export default App;
