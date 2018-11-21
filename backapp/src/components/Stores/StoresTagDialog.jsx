import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';

const options = [];

class StoresTagDialog extends Component {

  constructor(props) {
    super();
    this.state = {
      values: [],
      storeid: null
    };
  }

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.storeid !== this.props.storeid) {
      
      let values = [],
          storeId = Number(nextProps.storeid);

      this.props.tags.forEach(tag => {
          if (!tag.storesshort || tag.storesshort.length <= 0) return;
          tag.storesshort.forEach(item => {
            let bindedStoreId = Number(item.id);
            if (bindedStoreId === storeId) values.push(Number(tag.id));
          });
      });

      this.setState({ 
        values,
        storeid: nextProps.storeid
      });
    }
  }

  handleEntering = () => {

  };

  handleOk = () => {
    this.props.onClose({
      storeId: this.state.storeid, 
      values:this.state.values
    });
  };

  handleChange = (event, value) => {

    let isChecked = event.target.checked;
    let values = [...this.state.values];

    if (isChecked) {
      values.push(value);  
    } else {
      values = values.filter(item => Number(item) !== value);
    }

    this.setState({ values });
  };

  render() {

    const { value, ...other } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="md"
        fullWidth
        // fullScreen
        open={true}
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other} >
        <DialogTitle id="confirmation-dialog-title">Теги фильтрации для магазина</DialogTitle>
        <DialogContent>
            {this.props.tags.map(tag => (
              <FormControlLabel
                key={tag.id}
                control={
                  <Checkbox
                    key={tag.id}
                    value={String(tag.id)}
                    checked={ this.state.values.indexOf(Number(tag.id)) > -1 }
                    onChange={(e) => { this.handleChange(e, Number(tag.id)) }} />
                }
                label={tag.name} />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  tags: state.tags.collection
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(StoresTagDialog);
