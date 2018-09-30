import InputNumberField, { IProps } from "./InputNumberField"
export default class InputMoneyField extends InputNumberField {
  public static defaultProps: Partial<IProps> = {
    prefix: "¥ ",
    decimalScale: 2,
    fixedDecimalScale: true,
    thousandSeparator: true,
  }
}
