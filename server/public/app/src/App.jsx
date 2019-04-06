import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { get } from './helpers/xhrequests';
import { Header, Indicator, Table, SmellIndicator } from './components/index';

import * as config from './config';



class App extends Component {
    constructor() {
        super();
        this.state = {
            status: false,
            top: [],
            smellValue: 0
        };
    }

    componentDidMount() {
        const initialInfo = get(`${config.dns}:${config.port}/api/v1/open`);

        setTimeout(() => {
            this.setState({ status: true, top: [{ name: 'Pronto', top: '50', average: '20' }, { name: 'Pronto2', top: '80', average: '50' }, { name: 'Pronto3', top: '100', average: '30' }], smellValue: 80});
        }, 5000);
        setTimeout(() => {
            this.setState({ status: false, smellValue: 100 });
        }, 10000);

        initialInfo.then((data) => {
            console.log(data);
        }).catch(() => {
            console.log('error');
        });
    }

    render() {
        const { status, top, smellValue } = this.state;
        console.log(status);
        
        return (
            <div className="App">
                <Header title="ARDpoop" />
                <SmellIndicator smellValue={smellValue}/>
                <Indicator status={status} />
                <Table top={top}/>
            </div>
        );
    }
}

export default App;
