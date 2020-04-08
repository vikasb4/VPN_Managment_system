import React, { PureComponent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import usersData from './usersData';
import Toggle from './Toggle';

let number = 0;

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamList: props.teamList,
            currentlyConnected: props.currentlyConnected,
            timeUsed: props.timeUsed,
        };

        this.getTimerValue = this.getTimerValue.bind(this);
    }

    static getDerivedStateFromProps(nextProps) {
        // console.log('***');
        // console.log(nextProps);
        return {
            teamList: nextProps.teamList,
            currentlyConnected: nextProps.currentlyConnected,
            timeUsed: nextProps.timeUsed,
        };
    }

    getTimerValue(userId) {
        let currentTimeUsed = this.state.timeUsed.find(
            (_) => _.name === usersData[userId].name
        );
        if (currentTimeUsed) {
            return currentTimeUsed.time;
        } else {
            return 0;
        }
    }

    Handler = (Userid, value) => {
        // console.log(`the handler funciotn invoked with ${value}`);
        number = `${value}`;
        this.props.using(
            number,
            usersData[Userid].name,
            usersData[Userid].email
        );
    };

    render() {
        //  const teamMemebers = this.props.team.map(function (value ,i){
        //      return (
        //         <p>value</p>
        //      );
        //  });
        return (
            <div className="Team ">
                <Card border="dark" style={{ width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>
                            <b>
                                <h2>{this.props.name}</h2>
                            </b>
                        </Card.Title>
                        <Card.Title>
                            <b>
                                <h3>
                                    Connected Users:
                                    {this.state.teamList
                                        .map((userId) => {
                                            return this.state.currentlyConnected.find(
                                                (_) =>
                                                    _.name ===
                                                        usersData[userId]
                                                            .name &&
                                                    (this.props.selectedTeam ===
                                                        'All Teams' ||
                                                        usersData[userId]
                                                            .team ===
                                                            this.props
                                                                .selectedTeam)
                                            ) != null
                                                ? 1
                                                : 0;
                                        })
                                        .reduce((a, b) => {
                                            return a + b;
                                        })}
                                </h3>
                            </b>
                        </Card.Title>

                        <div>
                            <ListGroup>
                                {this.state.teamList
                                    .sort((a, b) => {
                                        if (
                                            usersData[a].name <
                                            usersData[b].name
                                        ) {
                                            return -1;
                                        } else {
                                            return 1;
                                        }
                                    })
                                    .map((userId) => {
                                        if (
                                            this.props.selectedTeam ===
                                                'All Teams' ||
                                            usersData[userId].team ===
                                                this.props.selectedTeam
                                        ) {
                                            return (
                                                <ListGroup.Item
                                                    style={{
                                                        height: '5rem',
                                                        padding: '0px',
                                                    }}
                                                >
                                                    <label
                                                        style={{
                                                            fontSize: '2rem',
                                                            marginBottom: '0px',
                                                        }}
                                                    >
                                                        {usersData[userId].name}
                                                    </label>{' '}
                                                    <Toggle
                                                        toggled={
                                                            this.state.currentlyConnected.find(
                                                                (_) =>
                                                                    _.name ===
                                                                    usersData[
                                                                        userId
                                                                    ].name
                                                            ) != null
                                                        }
                                                        time={this.getTimerValue(
                                                            userId
                                                        )}
                                                        start={
                                                            this.state.currentlyConnected.find(
                                                                (_) =>
                                                                    _.name ===
                                                                    usersData[
                                                                        userId
                                                                    ].name
                                                            ) != null
                                                                ? this.state.currentlyConnected.find(
                                                                      (_) =>
                                                                          _.name ===
                                                                          usersData[
                                                                              userId
                                                                          ].name
                                                                  )
                                                                      .connectedSince
                                                                : 0
                                                        }
                                                        Handler={this.Handler.bind(
                                                            this,
                                                            userId
                                                        )}
                                                    />
                                                </ListGroup.Item>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                {/* <ListGroup.Item > {usersData[0]}<Toggle/> </ListGroup.Item> */}
                            </ListGroup>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Team;
