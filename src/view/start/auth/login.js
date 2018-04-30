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

        this.go_home = this.go_home.bind(this);
        this.login = this.login.bind(this);
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
        this.props.fetchLogin(data);
    }

    render() {
        let content = <View/>;
        if (this.props.isloginFetching) {
            content = <View style={{ position: 'absolute', bottom: 208, left: '46%', right: 0 }}><Progress.Circle size={30} indeterminate={true}/></View>;
        }

        return (
            <Grid>
                <View style={{flex: 1}}>
                    <Authentication login onPress={this.login} errorAlertMessage={this.props.errorAlertMessage} isloginFetching={this.props.isloginFetching} />
                    {content}
                </View>
            </Grid>
        );
    }

}

function mapStateToProps(state, props) {
    return {
        loggedIn: state.OfferReducer.loggedIn,
        isloginFetching: state.OfferReducer.isloginFetching,
        errorAlertMessage: state.OfferReducer.errorAlertMessage
    }
}

export default connect(mapStateToProps, {fetchLogin})(Login);