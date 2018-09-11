import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default class index extends Component {

    render() {
        return (
            <div>

                <div>
                    <img alt="star wars" src="https://vignette.wikia.nocookie.net/disney/images/2/21/Star_Wars_logo.png/revision/latest?cb=20170909202326" style={{ height: 60, marginLeft: '1.5em', marginTop: '1em' }} />
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    style={{ marginTop: '10px' }}>

                    <Menu.Item key="1">
                        <Link to="/" style={{ color: 'white' }}>
                            <Icon type="team" />
                            <span>
                                Our Honest People
                            </span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="2">
                        <Link to="/films" style={{ color: 'white' }}>
                            <Icon type="profile" />
                            <span>
                                Our Hits Films
                            </span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="3">
                        <Link to="/planets" style={{ color: 'white' }}>
                            <Icon type="global" />
                            <span>
                                Our far far away Planets
                            </span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="4">
                        <Link to="/species" style={{ color: 'white' }}>
                            <Icon type="smile" />
                            <span>
                                Our Diversity Species
                            </span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="5">
                        <Link to="/starships" style={{ color: 'white' }}>
                            <Icon type="rocket" />
                            <span>
                                Our Cool Starships
                            </span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="6">
                        <Link to="/vehicles" style={{ color: 'white' }}>
                            <Icon type="car" />
                            <span>
                                Our Retro Vehicles
                            </span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}