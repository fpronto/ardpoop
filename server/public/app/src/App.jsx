import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { get } from './helpers/xhrequests';
import { Header, Indicator, Table } from './components/index';

import * as config from './config';

class App extends Component {
    constructor() {
        super();
        this.state = {
            status: false,
            top: []
        };
    }

    componentDidMount() {
        const initialInfo = get(`${config.dns}:${config.port}/api/open`);

        setTimeout(() => {
            this.setState({ status: true });
        }, 5000);

        initialInfo.then((data) => {
            console.log(data);
        }).catch(() => {
            console.log('error');
        });
    }

    render() {
        const { status, top} = this.state;
        console.log(status);
        
        return (
            <div className="App">
                <Header title="ARDpoop" />
                <Indicator status={status} />
                <Table top={top}/>
            </div>
        );
    }
}

export default App;
