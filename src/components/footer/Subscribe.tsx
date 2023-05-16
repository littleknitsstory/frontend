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
      toast.info("Subscribing...", {
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
      <h2 className="text--md mb-4">{dictionary.title}</h2>
      <p className="text">{dictionary.text}</p>

      <Formik
        initialValues={initialValue}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(dictionary.incorrectEmail)
            .required(dictionary.required),
        })}
        onSubmit={(values, { resetForm }) => submitHandler(values, resetForm)}
      >
        <FormikForm
          className="d-md-flex align-items-start justify-content-between gap-2"
          noValidate
        >
          <FormsInput
            className="w-50"
            name="email"
            type="email"
            placeholder="e-mail"
            controlId={"formGroupEmail"}
          />
          <button
            className="btn btn-primary mt-4 mt-md-0 col-12 col-md-auto col-lg-5"
            type="submit"
          >
            {dictionary.buttonText}
          </button>
        </FormikForm>
      </Formik>
      <ToastContainer theme="colored" autoClose={3000} />
    </>
  );
}
