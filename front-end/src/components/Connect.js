import React, { Component } from 'react';
import ws from '../utils/Websocket';

export default class Connect extends Component {
    constructor() {
        super();
        this.state = {
            showCall: false
        };
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        ws.onmessage = (event) => {
            console.warn("14 event data", typeof event.data);
            console.warn("15 event data", event.data);
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'call') {
                    this.setState({ showCall: true });
                }
            } catch (error) {
                console.error("Failed to parse event data", error);
            }
        };
    }

    send(action) {
        console.log(action); // Define your send logic here
    }

    render() {
        return (
            <div>
                {this.state.showCall && (
                    <div>
                        you are getting a call
                        <button onClick={() => this.send('accept')}>Accept</button>
                        <button onClick={() => this.send('reject')}>Reject</button>
                    </div>
                )}
            </div>
        );
    }
}
