import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    // height: 40,
    textAlign: "center",
    padding: theme.spacing.unit * 2
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class MacroVisualizer extends Component {
  render() {
    const {
      classes,
      kcalPerKg,
      weight,
      proteinPerKg,
      fatsPercent
    } = this.props;

    const gramToKcal = {
      fat: 9,
      protein: 4,
      carbohydrate: 4
    };

    const totalKcal = kcalPerKg * weight;

    const totalProteins = proteinPerKg * weight;
    const totalFats = ((fatsPercent / 100) * totalKcal) / gramToKcal.fat;
    const totalCarbohydrates =
      (totalKcal -
        totalFats * gramToKcal.fat -
        totalProteins * gramToKcal.protein) /
      gramToKcal.carbohydrate;

    const macro = [
      {
        name: "Weglowoadny",
        grams: Math.ceil(totalCarbohydrates),
        kcal: Math.ceil(totalCarbohydrates) * gramToKcal.carbohydrate
      },
      {
        name: "Tłuszcze",
        grams: Math.ceil(totalFats),
        kcal: Math.ceil(totalFats) * gramToKcal.fat
      },
      {
        name: "Białko",
        grams: Math.ceil(totalProteins),
        kcal: Math.ceil(totalProteins * gramToKcal.protein)
      }
    ];

    return (
      <div>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Typography align="center">
              Całkowite kcal: {macro.reduce((acc, c) => acc + c.kcal, 0)} kcal
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={"16"}
            >
              {macro.map(value => (
                <Grid key={value.name} item>
                  <Paper className={classes.paper} elevation={1}>
                    <Typography variant="title">{value.grams}g</Typography>
                    <Typography variant="caption">
                      ({value.kcal}kcal)
                    </Typography>
                    <Typography color="textSecondary">{value.name}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* <div>{JSON.stringify(this.props)}</div> */}
      </div>
    );
  }
}

export default withStyles(styles)(MacroVisualizer);
