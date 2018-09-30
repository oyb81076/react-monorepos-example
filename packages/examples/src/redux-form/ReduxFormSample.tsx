import * as React from "react"
import { reduxForm, InjectedFormProps } from "redux-form"
import InputTextField from "./InputTextField"
import InputNumberField from "./InputNumberField"
import Button from "@material-ui/core/Button"
import InputMoneyField from "./InputMoneyField"
import FormGroup from "@material-ui/core/FormGroup"
interface IFormData {
  text: string,
  digit: number,
  money: number
}
const enhancer = reduxForm<IFormData>({
  form: "redux-form",
  initialValues: { text: "init text value", digit: 3, money: 9999 },
  onSubmit(values) {
    // tslint:disable-next-line:no-console
    console.log(values)
  },
})
class ReduxFormSample extends React.Component<InjectedFormProps<IFormData, {}>, {}> {
  public render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row={true}>
          <InputTextField label="text" name="text" />
          <InputTextField label="text" name="text" />
          <InputTextField label="text" name="text" />
        </FormGroup>
        <FormGroup row={true}>
          <InputNumberField label="digit" name="digit" />
          <InputMoneyField label="money" name="money" />
        </FormGroup>
        <div>
          <Button type="submit" variant="contained" >Submit</Button>
        </div>
      </form>
    )
  }
}
export default enhancer(ReduxFormSample)
