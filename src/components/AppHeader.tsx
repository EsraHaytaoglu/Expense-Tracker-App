import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppState } from '../store';
import { isLoggedIn } from '../store/actions/userActions';

function AppHeader() {
  const { data, loading, error}=useSelector((state: AppState)=> state.user)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn())
  }, [])

  const { pathname } = useLocation();

    return (
        <Header style={{ position: "fixed", zIndex:1, width: "100%"}}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]} >
          {data.username ? 
          <React.Fragment>
               
            <Menu.Item key="/records"><Link to="/records" > Records </Link></Menu.Item>
            <Menu.Item key="/categories" > <Link to="/categories"></Link>Categories </Menu.Item>
         
            
            <Menu.Item key="/logout" ><Link to="/logout"> Log Out </Link> </Menu.Item>   
          </React.Fragment> : (
             loading ? null : (
              <Menu.Item key="/login" ><Link to="/login"> Log in</Link> </Menu.Item>
             )
          )}
        </Menu>
      </Header>
    )
}

export default AppHeader;
