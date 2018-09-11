import React, { Component } from 'react';
import { Table, message, Spin, Pagination, Input } from 'antd';
import planetsService from '../services/planetsService';

const Search = Input.Search;

export default class Planets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: [],
            page: 1,
            searchKey: '',
            size: 0,
            loading: false,
            currentPage: null
        };
    }
    componentWillMount() {
        this.setState({ loading: true, currentPage: this.state.page });
    }

    componentDidMount() {
        this.getPlanets(this.state.page, this.state.searchKey);
    }

    onChangePage = (page, pageSize) => {
        const sk = this.state.searchKey;
        let searchKey = sk;
        const curPage = page;
        this.setState({ loading: true, currentPage: curPage });
        this.getPlanets(curPage, searchKey);
    }

    getPlanets(page, search) {
        const params = {
            page
        };
        params['search'] = search
        planetsService.list(params)
            .then((res) => {
                console.log(res);
                const Planets = res.data.results.map((planet) => {
                    return {
                        climate: planet.climate,
                        diameter: planet.diameter,
                        gravity: planet.gravity,
                        name: planet.name,
                        orbital_period: planet.orbital_period,
                        population: planet.population,
                        rotation_period: planet.rotation_period,
                        terrain: planet.terrain,
                        surface_water: planet.surface_water
                    };
                })
                this.setState({
                    planets: Planets,
                    size: res.data.count,
                    loading: false
                })
            }).catch((err) => {
                message.error("Oops! Something wrong when getting data :(")
                this.setState({
                    loading: false
                });
                console.log(err);
            })
    }

    handleSearch = (value) => {
        this.setState({ loading: true });
        this.getPlanets(
            this.state.page,
            value
        );
    }

    handleGravityStatus(status) {
        this.stats = status;
        if (this.stats === "1") {
            return (
                'Normal'
            );
        } else if (this.stats === "2") {
            return (
                'Twice'
            );
        }
        return (
            'Half'
        );
    }
    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: false,
                fixed: 'left',
                width: 100
            },
            {
                title: 'Population',
                dataIndex: 'population',
                fixed: 'left',
                sorter: false,
                width: 100,
            },
            {
                title: 'Diameter',
                sorter: false,
                render: (text, record) => (
                    <span>
                        {record.diameter} Km
                    </span>
                )
            },
            {
                title: 'Climate',
                dataIndex: 'climate',
                sorter: false
            },
            {
                title: 'Terrain',
                dataIndex: 'terrain',
                sorter: false
            },
            {
                title: 'Gravity',
                sorter: false,
                render: (text, record) => (
                    <span>
                        {this.handleGravityStatus(record.gravity)}
                    </span>
                )
            },
            {
                title: 'Orbital Period (days)',
                dataIndex: 'orbital_period',
                sorter: false
            },
            {
                title: 'Rotation Period (hours)',
                dataIndex: 'rotation_period',
                sorter: false
            },
            {
                title: 'Surface Water',
                sorter: false,
                render: (text, record) => (
                    <span>
                        {record.surface_water === 'unknown' ? `${record.surface_water}` : `${record.surface_water}%`}
                    </span>
                )
            }
        ];
        return (
            <div>
                <h1>
                    The Planets
                </h1>
                <Search
                    placeholder="Search by Name"
                    defaultValue={this.state.searchKey}
                    onSearch={this.handleSearch}
                    style={{ width: 200 }}
                />
                {!this.state.loading
                    ?
                    <div>
                        <Table
                            columns={columns}
                            dataSource={this.state.planets}
                            pagination={false}
                            style={{ marginTop: '20px' }}
                            scroll={{ x: 1500}}
                        />
                    </div>
                    : <center><Spin /></center>
                }
                <div style={{ float: 'right', marginTop: 20 }}>
                    <Pagination
                        style={{ marginBottom: '20px' }}
                        size="small"
                        total={this.state.size}
                        showTotal={(total, range) => `Total ${total} Planets`}
                        onChange={this.onChangePage}
                        current={this.state.currentPage}
                    />
                </div>
            </div>
        )
    }
}