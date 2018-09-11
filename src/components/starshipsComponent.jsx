import React, { Component } from 'react';
import { Table, message, Spin, Pagination, Input } from 'antd';
import starshipsService from '../services/starshipsService';

const Search = Input.Search;

export default class Starships extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starships: [],
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
        this.getStarships(this.state.page, this.state.searchKey);
    }

    onChangePage = (page, pageSize) => {
        const sk = this.state.searchKey;
        let searchKey = sk;
        const curPage = page;
        this.setState({ loading: true, currentPage: curPage });
        this.getStarships(curPage, searchKey);
    }

    getStarships(page, search) {
        const params = {
            page
        };
        params['search'] = search
        starshipsService.list(params)
            .then((res) => {
                const Starships = res.data.results.map((starship) => {
                    return {
                        MGLT: starship.MGLT,
                        cargo_capacity: starship.cargo_capacity,
                        consumables: starship.consumables,
                        cost_in_credits: starship.cost_in_credits,
                        crew: starship.crew,
                        hyperdrive_rating: starship.hyperdrive_rating,
                        length: starship.length,
                        name: starship.name,
                        manufacturer: starship.manufacturer,
                        max_atmosphering_speed: starship.max_atmosphering_speed,
                        model: starship.model,
                        passengers: starship.passengers,
                        starship_class: starship.starship_class
                    };
                })
                this.setState({
                    starships: Starships,
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
        this.getStarships(
            this.state.page,
            value
        );
    }
    render(){
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: false,
                fixed: 'left',
                width: 170
            },
            {
                title: 'Length (m)',
                dataIndex: 'length',
                fixed: 'left',
                sorter: false,
                width: 130
            },
            {
                title: 'Cost in Credits (Galactic Credits)',
                dataIndex: 'cost_in_credits',
                sorter: false,
                width: 120
            },
            {
                title: 'Starship Class',
                sorter: false,
                dataIndex: 'starship_class',
                width: 120
            },
            {
                title: 'Manufacturer',
                sorter: false,
                dataIndex: 'manufacturer',
                width: 120
            },
            {
                title: 'Model',
                dataIndex: 'model',
                sorter: false,
                width: 120
            },
            {
                title: 'Cargo Capacity (Kg)',
                dataIndex: 'cargo_capacity',
                sorter: false,
                width: 120
            },
            {
                title: 'Passangers',
                dataIndex: 'passengers',
                sorter: false,
                width: 120
            },
            {
                title: 'Crew',
                sorter: false,
                dataIndex: 'crew',
                width: 120
            },
            {
                title: 'Consumables',
                sorter: false,
                dataIndex: 'consumables',
                width: 120
            },
            {
                title: 'Hyperdrive Rating',
                sorter: false,
                dataIndex: 'hyperdrive_rating',
                width: 120
            },
            {
                title: 'MGLT',
                sorter: false,
                dataIndex: 'MGLT',
                width: 120
            },
            {
                title: 'Max Atmosphering Speed',
                sorter: false,
                dataIndex: 'max_atmosphering_speed',
                width: 120
            }
        ];
        return(
            <div>
                <h1>
                    Sophisticated Starships
                </h1>
                <Search
                    placeholder="Search by Name and Model"
                    defaultValue={this.state.searchKey}
                    onSearch={this.handleSearch}
                    style={{ width: 250 }}
                />
                {!this.state.loading
                    ?
                    <div>
                        <Table
                            columns={columns}
                            dataSource={this.state.starships}
                            pagination={false}
                            style={{ marginTop: '20px' }}
                            scroll={{ x: 2000}}
                        />
                    </div>
                    : <center><Spin /></center>
                }
                <div style={{ float: 'right', marginTop: 20 }}>
                    <Pagination
                        style={{ marginBottom: '20px' }}
                        size="small"
                        total={this.state.size}
                        showTotal={(total, range) => `Total ${total} Starships`}
                        onChange={this.onChangePage}
                        current={this.state.currentPage}
                    />
                </div>
            </div>
        )
    }
}