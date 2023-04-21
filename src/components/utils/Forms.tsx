import { ClassAttributes, InputHTMLAttributes } from "react";
import { FieldHookConfig, useField, Field } from "formik";
import * as Yup from "yup";
import { Form, Col } from "react-bootstrap";

Yup.addMethod(Yup.string, "email", function validateEmail(message) {
  return this.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, {
    message,
    name: "email",
    excludeEmptyString: true,
  });
});

interface IFormsInputProps {
  col?: number;
  controlId: string;
}

export const FormsInput = ({
  col,
  controlId,
  ...props
}: IFormsInputProps &
  InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Form.Group as={Col} md={col} controlId={controlId} className="form-group">
        <Field
          {...field}
          {...props}
          className={
            meta.touched && meta.error ? "form-control form-control_error" : "form-control"
          }
        />
        {meta.touched && meta.error ? <p className="form-error">{meta.error}</p> : null}
      </Form.Group>
    </>
  );
};
