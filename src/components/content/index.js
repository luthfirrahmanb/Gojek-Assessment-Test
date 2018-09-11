import React, { Component } from 'react';
import { Layout } from 'antd';
import Routes from '../../routes'
const { Content } = Layout;

export default class index extends Component {
    render() {
        return (
            <div>
                <Content style={{ margin: '20px 16px' }}>
                    <div style={{ padding: 24, background: '272b30', minHeight: 360 }}>
                        <Routes />
                    </div>
                </Content>
            </div>
        )
    }
}