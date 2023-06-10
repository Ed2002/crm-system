import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useField } from "@unform/core";
import { useEffect, useRef } from "react";

interface Props {
    name: string
    label: string
}

type InputCheckBoxProps = CheckboxProps & Props;

export const InputCheckBox = (Props:InputCheckBoxProps) => {
    const InputRef = useRef<HTMLInputElement>(null);
    const { fieldName, defaultValue, registerField, error, clearError } = useField(Props.name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: InputRef,
            getValue: ref => {
                return ref.current.checked
            },
            setValue: (ref, value) => {
                ref.current.checked = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField])

    return(
        <FormControlLabel label={Props.label} control={
        <Checkbox color="success" name={Props.name} defaultChecked={defaultValue}  inputRef={InputRef}/>
        }/> 
    );
}