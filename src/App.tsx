import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";

function App() {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          {new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
          })}
        </Menu>
      </Header>
      <Content style={{ padding: "50px 50px" }}>
        <Route path="/register" component={SignUp} />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Harcama Takip ©2021 Esra Çebi
      </Footer>
    </Layout>
  );
}

export default App;
