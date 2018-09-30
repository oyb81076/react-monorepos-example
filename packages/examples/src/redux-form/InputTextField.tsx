import * as React from "react"
import { Field, WrappedFieldProps } from "redux-form"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import FormHelpText from "@material-ui/core/FormHelperText"
import Input from "@material-ui/core/Input"
interface IProps {
    id?: string
    name: string
    defaultValue?: string
    label?: React.ReactNode
    helpText?: React.ReactNode
    required?: boolean
    placeholder?: string
}
export default class InputTextField extends React.Component<IProps> {
    public render() {
        return <Field name={this.props.name} component={this.component} />
    }
    private component = ({ input, meta: { error, touched } }: WrappedFieldProps) => {
        const { required, placeholder, label, id, helpText } = this.props
        const isError = touched && Boolean(error)
        return (
            <FormControl error={isError} required={required}>
                {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
                <Input {...input} placeholder={placeholder} />
                {(isError || helpText) && (
                    <FormHelpText>
                        {isError ? error : helpText}
                    </FormHelpText>
                )}
            </FormControl>
        )
    }
}
