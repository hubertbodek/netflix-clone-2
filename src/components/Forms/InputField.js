import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";

function InputField({
	label,
	autocomplete = "off",
	type,
	className,
	...props
}) {
	const [field, meta] = useField(props);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (meta.touched && meta.error) {
			setError(true);
		} else {
			setError(false);
		}
	}, [meta.touched, meta.error]);

	return (
		<TextField
			{...field}
			type={type}
			autoComplete={autocomplete}
			className={className}
			error={error}
			helperText={meta.error}
			// id="filled-basic"
			label={label}
			variant="filled"
		/>
	);
}

export default InputField;
