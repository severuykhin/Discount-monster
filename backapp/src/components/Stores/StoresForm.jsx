import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { main } from '../../utils/config/main';

const validating = {
    name : {
        isRequired : true,
        message : 'Обязательное поле'
    }
}

class StoresForm extends Component {

    state = {
        values : {
            name: '',
            status: 'disabled',
        },
        errors : {}
    };
    
    handleChange = name => event => {
        let newValues = {
            [name] : event.target.value
        }
        this.setState({
            values : {...this.state.values, ...newValues}
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let errors = {};

        for (let value in this.state.values) {

            if (!validating[value]) continue;

            let rule = validating[value];
            if (rule.isRequired && this.state.values[value].trim() === '') {
                errors[value] = rule.message;
            } else {
                delete errors[value];
            }
        }

        let hasNoErrors = Object.keys(errors).length <= 0;

        this.setState({ errors });

        if (hasNoErrors) {
            let formData = new FormData(e.target);
            this.props.formSubmitHandler(formData);
        }

    }

    render() {
        return (
            <div className="stores__form">
                <Paper className="stores__form-inner" elevation={1}>
                    <Typography variant="h5" component="h3">
                        Добавление нового магазина
                    </Typography>
                    
                    <form
                        onSubmit={this.handleSubmit} 
                        noValidate 
                        autoComplete="off">
                        <div className="stores__form-item">  
                            <TextField
                                fullWidth
                                error={this.state.errors.name ? true : false}
                                id="standard-name"
                                label="Название"
                                name="Store[name]"
                                value={this.state.values.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </div>

                        <div className="stores__form-item">  
                            <FormControl fullWidth>
                                <Select
                                    value={this.state.values.age}
                                    onChange={this.handleChange('status')}
                                    inputProps={{
                                        name: 'Store[status]',
                                        id: 'status',
                                        value: this.state.values.status
                                    }}>
                                    {main.statuses.map( item => {
                                        return <MenuItem
                                                    key={item.name} 
                                                    value={item.value}>
                                                {item.name}
                                               </MenuItem> 
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <br/>
                        <div className="stores__form-item">
                            <Button
                                type="submit" 
                                variant="contained" 
                                color="primary">
                                    Сохранить
                            </Button>
                        </div>
                    </form>

                </Paper>
            </div>
        )
    }
}

export default StoresForm;
