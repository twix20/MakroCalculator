import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { Form, Field, FormSpy } from "react-final-form";
import { TextField } from "final-form-material-ui";
import TextFieldMaterial from "@material-ui/core/TextField";
import { Input } from "final-form-material-ui";

import Grid from "@material-ui/core/Grid";

import MacroVisualizer from "./MacroVisualizer";

const TextFieldAdapterWeight = props => {
  let {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;

  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TextFieldMaterial
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={{ ...restInput, min: 1, max: 250 }}
      onChange={onChange}
      value={value}
    />
  );
};
const TextFieldAdapterKcalPerKg = props => {
  let {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;

  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TextFieldMaterial
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : "31 - 35"}
      error={showError}
      inputProps={{ ...restInput, min: 31, max: 35 }}
      onChange={onChange}
      value={value}
    />
  );
};
const TextFieldAdapterProtein = props => {
  let {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;

  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TextFieldMaterial
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : "1.6 - 2.5"}
      error={showError}
      inputProps={{ ...restInput, step: 0.1, min: 1.6, max: 2.5 }}
      onChange={onChange}
      value={value}
    />
  );
};
const TextFieldAdapterFats = props => {
  let {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;

  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TextFieldMaterial
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : "20 - 40"}
      error={showError}
      inputProps={{ ...restInput, min: 20, max: 40 }}
      onChange={onChange}
      value={value}
    />
  );
};

const styles = theme => ({
  form: {
    padding: theme.spacing.unit * 2
  },
  filedContainer: {
    marginRight: theme.spacing.unit * 2
  },
  field: {
    width: "120px"
  }
});

class DietCalculator extends Component {
  state = {
    values: null
  };

  handleFormChange = formState => {
    this.setState({ values: formState.values });
  };

  onSubmit = values => {
    console.log(values);
  };

  render() {
    const { classes } = this.props;
    const { values } = this.state;

    return (
      <Card>
        <CardContent>
          <Typography variant="headline">Makro Calculator</Typography>

          <Form
            onSubmit={this.onSubmit}
            initialValues={{
              kcalPerKg: 33,
              weight: 80,
              proteinPerKg: 2,
              fatsPercent: 25
            }}
            // validate={validate}
            render={({ handleSubmit, pristine, invalid, values }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <FormSpy
                  onChange={this.handleFormChange}
                  subscription={{ values: true }}
                />

                <Grid container>
                  <Grid item className={classes.filedContainer}>
                    <Field
                      className={classes.field}
                      name="weight"
                      component={TextFieldAdapterWeight}
                      label="Waga (kg)"
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                  <Grid item className={classes.filedContainer}>
                    <Field
                      className={classes.field}
                      name="kcalPerKg"
                      component={TextFieldAdapterKcalPerKg}
                      label="1 kcal per 1 kg"
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                  <Grid item className={classes.filedContainer}>
                    <Field
                      className={classes.field}
                      name="proteinPerKg"
                      component={TextFieldAdapterProtein}
                      label="1 białko per 1 kg"
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                  <Grid item className={classes.filedContainer}>
                    <Field
                      className={classes.field}
                      name="fatsPercent"
                      component={TextFieldAdapterFats}
                      label="% tłuszczy"
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                </Grid>
              </form>
            )}
          />

          {values && <MacroVisualizer {...values} />}
        </CardContent>
        <CardActions>
          {/* <Button color="primary" variant="contained" onClick={props.increment}>
          Increment
        </Button>
        <Button color="secondary" variant="contained" onClick={props.decrement}>
          Decrement
        </Button> */}
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(DietCalculator);
