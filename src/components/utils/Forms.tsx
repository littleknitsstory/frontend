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
  controlId: string;
}

export const FormsInput = ({
  controlId,
  ...props
}: IFormsInputProps &
  InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Form.Group controlId={controlId} className="form-group">
        <Field
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? "form-control form-control_error"
              : "form-control"
          }
        />
        {meta.touched && meta.error ? (
          <span className="form-error">{meta.error}</span>
        ) : null}
      </Form.Group>
    </>
  );
};
