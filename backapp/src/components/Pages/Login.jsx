import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Request from '../../utils/classes/Request';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/User';

import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error : false
        };

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        const request = new Request();
        request.send('POST', '/backend/site/login', data)
            .then( response => {

                try {
                    response = JSON.parse(response);
                } catch (e) {
                    throw new Error(`Error JSON parse. Data : ${response}`);
                }

                if (response.result === 'ok') {
                    this.props.setUser(response.data);
                } else {
                    this.setState({
                        error : response.error
                    });
                }

            })
            .catch(error => {
                console.log(error);
                alert('Ошибка при авторизации. Попробуйте позднее.');
            }) ;

    }

    render() {

        let error = this.state.error ? true : false;

        return (
        <div className="login">
                <div className="login__inner">
                    <div className="login-form">
                        <form
                            onSubmit={this.handleSubmit} 
                            noValidate 
                            autoComplete="off">
                            <div className="login-form-item">  
                                <TextField
                                    fullWidth
                                    id="user-login"
                                    error={error}
                                    label="Логин"
                                    name="Login[username]"
                                    margin="normal"
                                />
                            </div>
                            <div className="login-form-item">  
                                <TextField
                                    fullWidth
                                    id="user-password"
                                    label="Пароль"
                                    error={error}
                                    type="password"
                                    name="Login[password]"
                                    margin="normal"
                                />
                            </div>

                            
                            <br/>
                            <div className="login-form-item">
                                <Button
                                    type="submit" 
                                    variant="contained" 
                                    size="large"
                                    color="primary">
                                        Войти
                                </Button>
                            </div>
                            <FormHelperText error={error} children={ this.state.error } />
                        </form>
                    </div>            
                </div>
        </div>
        )
  }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    setUser: (data) => dispatch(setUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
