import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useField } from "@unform/core";
import { useEffect, useRef } from "react";

interface Props {
    name: string,
}

type InputProps = TextFieldProps & Props;

export const Input = ({ name, ...rest }: InputProps)=>{
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
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField])


    return (
        <TextField
            name="name"
            color="success"
            style={{backgroundColor: 'white'}}
            error={!!error}
            helperText={error || ''}
            defaultValue={defaultValue}
            onFocus={clearError}
            inputRef={InputRef}
            {...rest}
        />
    );
};