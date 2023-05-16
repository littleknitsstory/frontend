"use client";

import { Formik, Form as FormikForm, FormikState } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import { FormValues } from "@/app/types";

import "react-toastify/dist/ReactToastify.css";
import { FormsInput } from "../utils/Forms";

interface Props {
  dictionary: {
    title: string;
    text: string;
    email: string;
    buttonText: string;
    required: string;
    incorrectEmail: string;
  };
}

export default function SubscribeForm({ dictionary }: Props) {
  const initialValue: FormValues = { email: "" };

  const submitHandler = async (
    values: FormValues,

    resetForm: (
      nextState?: Partial<FormikState<FormValues>> | undefined
    ) => void
  ): Promise<void> => {
    try {
      toast.info("Adding your email to subscription", {
        hideProgressBar: true,
      });
      const response = await fetch(
        "http://dev.backend.littleknitsstory.com:26363/api/v1/subscribe/",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.dismiss();
      if (!response.ok) {
        const error = await response.json();
        error.email.forEach((value: string) => toast.error(value));
      } else {
        toast.success("Subscribed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    } finally {
      resetForm();
    }
  };

  return (
    <>
      <div className="footer__subscribe">
        <h2 className="footer__title">{dictionary.title}</h2>
        <p className="footer__text">{dictionary.text}</p>

        <Formik
          initialValues={initialValue}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email(dictionary.incorrectEmail)
              .required(dictionary.required),
          })}
          onSubmit={(values, { resetForm }) => submitHandler(values, resetForm)}
        >
          <FormikForm className="footer__form" noValidate>
            <FormsInput
              className="footer__input"
              name="email"
              type="email"
              placeholder="e-mail"
              controlId={"formGroupEmail"}
            />
            <button className="btn btn--primary" type="submit">
              {dictionary.buttonText}
            </button>
          </FormikForm>
        </Formik>
      </div>
      <ToastContainer theme="colored" autoClose={3000} />
    </>
  );
}
