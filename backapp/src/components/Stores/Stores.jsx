import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


export default function Stores(props) {

  const renderStore = store => {
      return (
        <Grid 
          key={ `store-${ store.id }` } 
          item xs={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="picture.svg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  { store.name }
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <IconButton aria-label="Add to favorites">
                <Edit />
              </IconButton>
              <IconButton aria-label="Share">
                <Delete onClick={() => { props.deleteStoreHandler(store.id) }} />
              </IconButton>              
            </CardActions>
          </Card>
        </Grid>
      )
  }

  return (
    <div className="stores__inner">
      <Grid container spacing={24}>
        { props.collection && props.collection.map(renderStore) }
      </Grid>
    </div>
  )
}
