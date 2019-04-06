import React, { Component } from 'react';
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
        this.loadInfo = () => {
            const { status, toxicity } = this.state;
            const getStatus = get(`${config.dns}:${config.port}/api/v1/status`);

            getStatus.then((data) => {
                if (status !== data.json.data.status) {
                    this.setState({ status: data.json.data.status });
                }
            }).catch(() => {
                console.log('Error Getting bathroom Status');
            });

            const getToxicity = get(`${config.dns}:${config.port}/api/v1/toxicity`);

            getToxicity.then((data) => {
                const parsedInt = parseInt(data.json.data.toxicity, 10);
                if (toxicity !== parsedInt) {
                    this.setState({ smellValue: parsedInt });
                }
            }).catch(() => {
                console.log('Error Getting bathroom Status');
            });
        };
    }

    componentDidMount() {
        const getTop = get(`${config.dns}:${config.port}/api/v1/top`);
        const { top } = this.state;


        getTop.then((data) => {
            if (data.json.data.top) {
                if (top !== data.json.data.top) {
                    this.setState({ top: data.json.data.top });
                }
            }
        }).catch(() => {
            console.log('Error Getting bathroom Status');
        });
        this.loadInfo();
        setInterval(this.loadInfo, 1000);
    }

    render() {
        const { status, top, smellValue } = this.state;
        return (
            <div className="App">
                <Header/>
                <SmellIndicator smellValue={smellValue}/>
                <Indicator status={status} />
                <Table top={top}/>
            </div>
        );
    }
}

export default App;
