import React, { Component } from 'react';
import { Table, message, Spin, Pagination, Input } from 'antd';
import * as moment from 'moment';
import filmsService from '../services/filmsService';

const Search = Input.Search;

export default class Films extends Component {
    constructor(props) {
        super(props);
        this.state = {
            films: [],
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
        this.getFilms(this.state.page, this.state.searchKey);
    }

    onChangePage = (page, pageSize) => {
        const sk = this.state.searchKey;
        let searchKey = sk;
        const curPage = page;
        this.setState({loading: true, currentPage: curPage });
        this.getFilms(curPage, searchKey);
    }

    getFilms(page, search) {
        const params = {
            page
        };
        params['search'] = search
        filmsService.list(params)
            .then((res) => {
                const Films = res.data.results.map((film) => {
                    return {
                        producer: film.producer,
                        release_date: film.release_date,
                        title: film.title,
                        director: film.director
                    };
                })
                this.setState({
                    films: Films,
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
        this.getFilms(
            this.state.page,
            value
        );
    }
    render(){
        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                sorter: false
            },
            {
                title: 'Release Date',
                sorter: false,
                render:(text, record)=>(
                    <span>
                        {moment(record.release_date).format('D MMMM YYYY')}
                    </span>
                )
            },
            {
                title: 'Producer',
                dataIndex: 'producer',
                sorter: false
            },
            {
                title: 'Director',
                dataIndex: 'director',
                sorter: false
            }
        ];
        return(
            <div>
                <h1>
                    Great Films in this Planets
                </h1>
                <Search
                    placeholder="Search by Title"
                    defaultValue={this.state.searchKey}
                    onSearch={this.handleSearch}
                    style={{ width: 200 }}
                />
                {!this.state.loading
                    ?
                    <div>
                        <Table
                            columns={columns}
                            dataSource={this.state.films}
                            pagination={false}
                            style={{ marginTop: '20px' }}
                        />
                    </div>
                    : <center><Spin /></center>
                }
                <div style={{ float: 'right', marginTop: 20 }}>
                    <Pagination
                        style={{ marginBottom: '20px' }}
                        size="small"
                        total={this.state.size}
                        showTotal={(total, range) => `Total ${total} Films`}
                        onChange={this.onChangePage}
                        current={this.state.currentPage}
                    />
                </div>
            </div>
        )
    }
}