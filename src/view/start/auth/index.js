import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Button, NavBar, AuthTextInput} from '../index';
import * as Progress from 'react-native-progress';
import styles from '../../../styles/auth/auth'

export class Authentication extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: {email: "", password: "", general: ""},
        };

        this.submit = this.submit.bind(this);
    }

    submit() {
        var error = this.state.error;
        var errCount = 0;

        if (this.state.email.length <= 0) errCount++; //check email first
        this.state.error["email"] = (this.state.email.length <= 0) ? "Your email is required!" : "";

        if (!this.props.recover) {
            if (this.state.password.length <= 0 || this.state.password.length < 6) {
                error["password"] = "Password should be Min 6 characters";
                errCount++;
            } else {
                error["password"] = "";
            }
        }

        this.setState({ error: error });

        if (errCount <= 0) {
            var data = {
                email: this.state.email,
                password: this.state.password,
            }

            this.props.onPress(data, this.errorCB.bind(this));
        }
    }

    errorCB(err) {
        var error = this.state.error;

        if (err.email) error["email"] = err.email;
        else error["general"] = err;

        this.setState({error: error});
    }

    render() {
        var title = "Register";
        if (this.props.login) title = "Login";
        else if (this.props.recover) title = "Recover Password";

        return (
            <View style={styles.wrapper}>
                <NavBar/>
                <Image source={require('../../../images/login_background.png')}
                       style={styles.backgroundImageContainer}/>
                <View style={styles.loginContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../../images/logoimage.png')} style={styles.logoImage}/>
                    </View>
                    <View style={styles.mainLoginContainer}>
                        <View style={styles.loginForm}>
                            <View style={styles.container}>
                                <Text style={[styles.errorText]}>{this.state.error['general']}</Text>
                                <Text>{this.props.errorAlertMessage}</Text>
                                <Text style={styles.emailInputLabel}>Player Username</Text>
                                <AuthTextInput
                                    onChangeText={(text) => this.setState({email: text})}
                                    // placeholder={"Player Username"}
                                    autoFocus={false}
                                    value={this.state.email}
                                    error={this.state.error['email']}
                                    secureTextEntry={false}
                                />

                                {//if the container type is not Recover Password, show the password input
                                    (!this.props.recover) &&
                                    <Text style={styles.passwordInputLabel}>Password</Text>
                                }
                                {//if the container type is not Recover Password, show the password input
                                    (!this.props.recover) &&
                                    <AuthTextInput
                                        onChangeText={(text) => this.setState({password: text})}
                                        // placeholder={"Password"}
                                        autoFocus={false}
                                        value={this.state.password}
                                        error={this.state.error['password']}
                                        secureTextEntry={true}
                                    />
                                }

                                {//if the container type is Login, show the forgot password text
                                    (this.props.login) &&
                                    <Text style={[styles.forgotText]}
                                          onPress={Actions.password}>{"Forgot Password"}</Text>
                                }

                                {// TEMPORARY: Link to Registration page
                                    (this.props.login) &&
                                    <Text style={[styles.forgotText]}
                                          onPress={Actions.register}>{"Register"}</Text>
                                }

                                <Button onPress={this.submit}
                                        btnText={(this.props.recover && this.props.isloginFetching === false) ? "Submit" : title}/>
                                <View/>
                            </View>
                        </View>
                        <View style={styles.requestMessage}>
                            <Text style={styles.requestText}>Don't you have a card? Request one now.</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

};