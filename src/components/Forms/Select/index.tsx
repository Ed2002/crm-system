import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectProps } from "@mui/material/Select";
import { useField } from "@unform/core";
import { ReactElement, useEffect, useRef } from "react";

interface Props {
    name: string
    label: string
    children: Array<ReactElement>
}

type InputSelectProps = SelectProps & Props;

export const SelectInput = ({name,label,children,...rest}:InputSelectProps) => {
    const InputRef = useRef<HTMLInputElement>(null);
    const { fieldName, defaultValue, registerField, error, clearError } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: InputRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, value) => {
                console.log(value);
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField])


    return(
        <FormControl fullWidth>
            <InputLabel color="success" id={`idLabel-${name}`}>{label}</InputLabel>
            <Select style={{backgroundColor: 'white'}} color="success" name={name} label={label} labelId={`idLabel-${name}`} {...rest} inputRef={InputRef} fullWidth defaultValue={defaultValue}>
                {children}
            </Select>
        </FormControl>
    );
}