import React, { Component } from 'react';
import { Layout } from 'antd';
const { Header } = Layout;

export default class index extends Component {

    render() {
        return (
            <div>
                <Header style={{ background: '#001529', padding: 2 }} >
                    <Layout style={{ background: '#001529' }}>
                    </Layout>
                </Header>
            </div>
        )
    }
}