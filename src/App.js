import React, { Component } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Content from './components/content'
import './App.css';

const { Sider, Footer } = Layout;

class App extends Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Router>
        <div>
          <Layout
            style={{ minHeight: '120vh' }}>
            <Sider>
              <Sidebar />
            </Sider>
            <Layout>
              <Header />
              <Content />
              <Footer style={{ textAlign: 'center' }}>
                Star Wars Web ©2018 Created by Obi-Luthfir Kenobi
              </Footer>
            </Layout>
            
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
