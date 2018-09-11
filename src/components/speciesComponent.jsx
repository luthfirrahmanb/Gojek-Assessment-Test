import React, { Component } from 'react';
import { Table, message, Spin, Pagination, Input } from 'antd';
import speciesService from '../services/speciesService';

const Search = Input.Search;

export default class Species extends Component {
    constructor(props) {
        super(props);
        this.state = {
            species: [],
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
        this.getSpecies(this.state.page, this.state.searchKey);
    }

    onChangePage = (page, pageSize) => {
        const sk = this.state.searchKey;
        let searchKey = sk;
        const curPage = page;
        this.setState({ loading: true, currentPage: curPage });
        this.getSpecies(curPage, searchKey);
    }

    getSpecies(page, search) {
        const params = {
            page
        };
        params['search'] = search
        speciesService.list(params)
            .then((res) => {
                const Species = res.data.results.map((species) => {
                    return {
                        average_height: species.average_height,
                        average_lifespan: species.average_lifespan,
                        classification: species.classification,
                        designation: species.designation,
                        eye_colors: species.eye_colors,
                        hair_colors: species.hair_colors,
                        language: species.language,
                        name: species.name,
                        skin_colors: species.skin_colors
                    };
                })
                this.setState({
                    species: Species,
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
        this.getSpecies(
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
                width: 100
            },
            {
                title: 'Classification',
                dataIndex: 'classification',
                fixed: 'left',
                sorter: false,
                width: 130
            },
            {
                title: 'Language',
                dataIndex: 'language',
                sorter: false
            },
            {
                title: 'Designation',
                sorter: false,
                dataIndex: 'designation'
            },
            {
                title: 'Average Height (cm)',
                sorter: false,
                dataIndex: 'average_height'
            },
            {
                title: 'Average Lifespan (years)',
                dataIndex: 'average_lifespan',
                sorter: false
            },
            {
                title: 'Eye Color(s)',
                dataIndex: 'eye_colors',
                sorter: false
            },
            {
                title: 'Hair Color(s)',
                dataIndex: 'hair_colors',
                sorter: false
            },
            {
                title: 'Skin Color(s)',
                sorter: false,
                dataIndex: 'skin_colors'
            }
        ];
        return(
            <div>
                <h1>
                    The Lovely Species
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
                            dataSource={this.state.species}
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
                        showTotal={(total, range) => `Total ${total} Species`}
                        onChange={this.onChangePage}
                        current={this.state.currentPage}
                    />
                </div>
            </div>
        )
    }
}