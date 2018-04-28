import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchLogin, fetchOffer} from '../../../redux/actions/OfferActions';
import {View} from 'native-base';
import {Authentication} from './index';
import {Text} from 'native-base';
import {Col, Row, Grid} from "react-native-easy-grid";
import * as Progress from 'react-native-progress';
import {Actions} from 'react-native-router-flux';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetching: false
        }

        this.go_home = this.go_home.bind(this);
    }

    componentWillMount() {
        // this.go_home;
    }

    go_home() {
        if (!this.props.isloginFetching) {
            Actions.offerlist();
            // this.props.fetchOffer();
            // setTimeout(Actions.offerlist(),5000)
        }
    }

    login(data, errorCB) {
        this.setState({fetching: true}, function () {
            this.props.fetchLogin(data);
        });
    }

    render() {
        let content = <View/>;
        if (this.props.isloginFetching) {
            content = <Progress.Circle size={30} indeterminate={true}/>;
        }

        return (
            <Grid>
                <View style={{flex: 1}}>
                    <Authentication login onPress={this.login.bind(this)}/>
                    {content}
                </View>
            </Grid>
        );
    }

}

function mapStateToProps(state, props) {
    return {
        loggedIn: state.OfferReducer.loggedIn,
        isloginFetching: state.OfferReducer.isloginFetching
    }
}

export default connect(mapStateToProps, {fetchLogin})(Login);