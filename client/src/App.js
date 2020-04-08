import React from 'react';
import logo from './logo.svg';
import font from './App.css';
import Team from './Component/teams_list';
import Countdown from 'react-countdown-now';
import Toggle from './Component/Toggle';
import io from 'socket.io-client';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import usersData from './Component/usersData';
import availableVPNTeams from './Component/availableVPNTeams';

let count = 0;
var socket;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            currentConnections: [],
            timeUsed: [],
            selectedTeam: 'IT Solution Delivery',
        };
    }

    componentDidMount() {
        socket = io();
        socket.on('init', (data) => {
            // console.log('init');
            // console.log(data);
            const connectedUsers = [];
            for (let user in data.users) {
                connectedUsers.push({
                    name: user,
                    connectedSince: data.users[user],
                });
            }
            const timeUsed = [];
            for (let user in data.timeUsed) {
                timeUsed.push({
                    name: user,
                    time: data.timeUsed[user],
                });
            }
            this.setState({
                currentConnections: connectedUsers,
                timeUsed: timeUsed,
            });
            // console.log(this.state);
        });
        socket.on('vpnConnect', (data) => {
            // console.log('Connected');
            // console.log(data);
            const connections = this.state.currentConnections.concat([
                {
                    name: data.user,
                    connectedSince: data.start,
                },
            ]);
            const timeUsed =
                this.state.timeUsed.find((_) => _.name === data.user) != null
                    ? this.state.timeUsed.map((tu) => {
                          if (tu.name === data.user) {
                              return {
                                  name: data.user,
                                  time: data.timeUsed,
                              };
                          } else {
                              return tu;
                          }
                      })
                    : this.state.timeUsed.concat([
                          {
                              name: data.user,
                              time: data.timeUsed,
                          },
                      ]);
            this.setState({
                currentConnections: connections,
                timeUsed: timeUsed,
            });
            // console.log(this.state);
        });
        socket.on('vpnDisconnect', (data) => {
            // console.log('Diconnected');
            // console.log(data);
            const connections = this.state.currentConnections.filter(
                (_) => _.name != data.user
            );
            const timeUsed =
                this.state.timeUsed.find((_) => _.name === data.user) != null
                    ? this.state.timeUsed.map((tu) => {
                          if (tu.name === data.user) {
                              return {
                                  name: data.user,
                                  time: data.timeUsed,
                              };
                          } else {
                              return tu;
                          }
                      })
                    : this.state.timeUsed.concat([
                          {
                              name: data.user,
                              time: data.timeUsed,
                          },
                      ]);
            this.setState({
                currentConnections: connections,
                timeUsed: timeUsed,
            });
            // console.log(this.state);
        });
    }

    using = (number, name, email) => {
        // console.log(`the number ${number}`);
        if (socket) {
            socket.emit('request', { user: name, email: email });
        }
        count = `${number}`;
        this.setState({
            count: count,
        });
    };
    handleKeyPress(event) {
        event.preventDefault();
    }

    selectTeam = (teamName, event) => {
        this.setState({ selectedTeam: teamName });
    };
    showAvailableVPNs = (allTeams, teamCurrentConnections) =>
        allTeams ? (
            ' '
        ) : (
            <h2 style={{ marginLeft: 'auto' }}>
                Available VPNs:
                <label style={{ color: 'red' }}>
                    {availableVPNTeams[this.state.selectedTeam] -
                        teamCurrentConnections}
                </label>
            </h2>
        );
    showVPNInfo = () => {
        const allTeams = this.state.selectedTeam === 'All Teams';
        const teamCurrentConnections = allTeams
            ? this.state.currentConnections.length
            : this.state.currentConnections.filter(
                  (curUser) =>
                      Object.values(usersData).find(
                          (_) => curUser.name === _.name
                      ).team === this.state.selectedTeam
              ).length;
        return (
            <div className="column">
                <div
                    className="row"
                    style={{ marginRight: '5px', marginLeft: '20px' }}
                >
                    <h2>
                        Total no. of VPNs in use:{' '}
                        <label style={{ color: 'blue' }}>
                            {teamCurrentConnections}
                        </label>
                    </h2>
                    {this.showAvailableVPNs(allTeams, teamCurrentConnections)}
                </div>
            </div>
        );
    };
    render() {
        return (
            <div className="App">
                <div>
                    <h1 style={{ display: 'inline-block' }}>
                        VPN MANAGEMENT TOOL
                    </h1>
                    <div
                        style={{
                            display: 'inline-block',
                            position: 'absolute',
                            right: '0',
                        }}
                    >
                        <DropdownButton
                            id="dropdown-menu-align-right"
                            title={this.state.selectedTeam}
                        >
                            <Dropdown.Item
                                eventKey="IT Solution Delivery"
                                onSelect={this.selectTeam}
                            >
                                IT Solution Delivery
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="BI Sovereign"
                                onSelect={this.selectTeam}
                            >
                                BI Sovereign
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="CBS"
                                onSelect={this.selectTeam}
                            >
                                CBS
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                {this.showVPNInfo()}
                <p style={{ color: 'red' }}>
                    <b>
                        **Users are to set their VPN setting when they connect
                        and disconnect to VPN. ** Priority 3 users must
                        disconnect when the available number of VPN connections
                        goes to or below 3. Those that have been on longest
                        should disconnect first.**
                    </b>
                </p>

                <div className="row" style={{ justifyContent: 'center' }}>
                    {/* <div className="column"><Team name="Priority 1" teamList={[0, 1]} currentlyConnected={this.state.currentConnections} timeUsed={this.state.timeUsed} using={this.using} /></div> */}

                    <div className="column">
                        <Team
                            name="High"
                            teamList={[
                                0,
                                1,
                                2,
                                3,
                                4,
                                5,
                                6,
                                7,
                                11,
                                13,
                                14,
                                15,
                                16,
                                17,
                                18,
                                19,
                                20,
                                21,
                                22,
                                23,
                                24,
                                25,
                                26,
                                27,
                                28,
                                29,
                                30,
                                31,
                                32,
                                300,
                                301,
                                302,
                                303,
                                500,
                                501,
                                502,
                                503,
                                504,
                                505,
                                506,
                                507,
                                508,
                                509,
                                510,
                                511,
                                512,
                                513,
                                514,
                                515,
                                516,
                                517,
                                518,
                                519,
                                520,
                                521,
                                522,
                                523,
                                524,
                            ]}
                            currentlyConnected={this.state.currentConnections}
                            timeUsed={this.state.timeUsed}
                            using={this.using}
                            selectedTeam={this.state.selectedTeam}
                        />
                    </div>

                    <div className="column">
                        {' '}
                        <Team
                            name="Medium"
                            teamList={[
                                100,
                                101,
                                102,
                                103,
                                104,
                                105,
                                106,
                                107,
                                108,
                                109,
                                110,
                                111,
                                112,
                                113,
                                114,
                                115,
                                116,
                                117,
                                118,
                                119,
                                120,
                                121,
                                122,
                                123,
                                124,
                                125,
                                126,
                                127,
                                128,
                                129,
                                130,
                                131,
                                132,
                                133,
                                134,
                                135,
                                136,
                                137,
                                138,
                                139,
                                140,
                                141,
                                142,
                                143,
                                144,
                                145,
                                146,
                                147,
                                148,
                                149,
                                150,
                                151,
                                152,
                                153,
                                600,
               601,602,603,604,605,606,607,608,609

                            ]}
                            currentlyConnected={this.state.currentConnections}
                            timeUsed={this.state.timeUsed}
                            using={this.using}
                            selectedTeam={this.state.selectedTeam}
                        />
                    </div>

                    <div className="column">
                        {' '}
                        <Team
                            name="Low"
                            teamList={[
                                200,
                                201,
                                202,
                                203,
                                204,
                                205,
                                206,
                                208,
                                209,
                                210,
                                211,
                                213,
                                214,
                                215,
                                216,
                                217,
                                219,
                                220,
                                221,
                                224,
                                225,
                                226,
                                227,
                                228,
                                229,
                                230,
                                231,
                                232,
                                233,
                                234,
                                235,
                                236,
                                237,
                                238,
                                239,
                                240,
                                242,
                                241,
                                243,
                                244,
                                245,
                                246,
                                247,
                                248,
                                249,
                                250,
                                251,
                                252,
                                253,
                                254,
                                255,
                                256,
                                257,
                                258,
                                259,
                                260,
                                261,
                                262,
                                264,
                                265,
                                266,
                                267,
                                268,
                                269,
                                270,
                                400,
                                401,
                                402,
                                403,
                                404,
                                405,
                                406,
                                407,
                                408,
                                409,
                            ]}
                            currentlyConnected={this.state.currentConnections}
                            timeUsed={this.state.timeUsed}
                            using={this.using}
                            selectedTeam={this.state.selectedTeam}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
