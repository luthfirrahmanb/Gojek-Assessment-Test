import React, { Component } from 'react';
import { Table, message, Spin, Pagination, Input } from 'antd';
import peopleService from '../services/peopleService';

const Search = Input.Search;

export default class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peoples: [],
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
        this.getPeople(this.state.page, this.state.searchKey);
    }

    onChangePage = (page, pageSize) => {
        const sk = this.state.searchKey;
        let searchKey = sk;
        const curPage = page;
        this.setState({loading: true, currentPage: curPage });
        this.getPeople(curPage, searchKey);
    }

    getPeople(page, search) {
        const params = {
            page
        };
        params['search'] = search
        peopleService.list(params)
            .then((res) => {
                const Peoples = res.data.results.map((people) => {
                    return {
                        birth_year: people.birth_year,
                        eye_color: people.eye_color,
                        gender: people.gender,
                        hair_color: people.hair_color,
                        height: people.height,
                        name: people.name,
                        mass: people.mass,
                        skin_color: people.skin_color
                    };
                })
                this.setState({
                    peoples: Peoples,
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
        this.getPeople(
            this.state.page,
            value
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
                title: 'Gender',
                dataIndex: 'gender',
                sorter: false,
                fixed: 'left',
                width: 100
            },
            {
                title: 'Eye Color',
                dataIndex: 'eye_color',
                sorter: false
            },
            {
                title: 'Hair Color',
                dataIndex: 'hair_color',
                sorter: false
            },
            {
                title: 'Skin Color',
                dataIndex: 'skin_color',
                sorter: false
            },
            {
                title: 'Birth',
                dataIndex: 'birth_year',
                sorter: false
            },
            {
                title: 'Mass',
                dataIndex: 'mass',
                sorter: false
            },
            {
                title: 'Height',
                dataIndex: 'height',
                sorter: false
            },
        ];
        return (
            <div>
                <h1>
                    Meet Our People
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
                            dataSource={this.state.peoples}
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
                        showTotal={(total, range) => `Total ${total} Peoples`}
                        onChange={this.onChangePage}
                        current={this.state.currentPage}
                    />
                </div>
            </div>
        )
    }
}