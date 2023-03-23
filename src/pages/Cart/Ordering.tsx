import { Container, Col, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../app/hooks"
import { PICTURE_BASE_URL } from "../../components/features/api/apiSlice"
import { convertToCurrency } from "../../utils/convertPrice"
import { Formik, Form as FormikForm, FormikState } from "formik";
import * as Yup from "yup";
import { FormValues } from "../../app/types"
import { FormsInput } from "../../components/utils/Forms";
import { useAddOrderMutation } from "../../components/features/api/apiSlice"

const Ordering = () => {
  const { i18n, t } = useTranslation()
  const [ addOrder ] = useAddOrderMutation()
  const { products: cartProducts, totalPrice} = useAppSelector(state => state.cart)

  const totalAmount = cartProducts.reduce((acc, current) => acc + current.amount, 0)
  const productImages = cartProducts.map(product => 
    <img
      key={product.id} 
      src={PICTURE_BASE_URL + product.image_preview} 
      alt={product.image_alt}
      className="product-card__cart-img"
    />  
  )

  const initialFormDataState: FormValues = {
    name: "",
    email: "",
    comments: "",
    phone: "",
    address: ""
  };

  const handleFormSubmit = (
    values: FormValues,
    resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void,
  ): void => {
    const products = cartProducts.map(product => {
      
      return {
        product: product.id,
        amount: product.amount,
        code: product.code
      }
    })
    console.log(values)
    addOrder({products, ...values})
    resetForm();
  };

  return (
    <Container className="cart__ordering">
      {productImages}
      <h4 className="cart__total-price">
        {t("Cart.total")} {totalAmount} {t("Cart.amount")} — {convertToCurrency(totalPrice, i18n.language)}
      </h4>

      <div className="cart__delivery">
        <h4 className="cart__title">{t("Cart.delivery")}</h4>

        <div className="cart__radio-wrapper">
          <div className="cart__radio-item">
            <input 
              className="cart__radio-input" 
              type="radio" 
              name="delivery" 
              id="courier" 
              value="courier" 
            />
            <label htmlFor="courier">{t("Cart.courier")}</label>
          </div>
          <div className="cart__radio-item">
            <input 
              className="cart__radio-input"
              type="radio" 
              name="delivery" 
              id="pickup" 
              value="pickup" 
            />
            <label htmlFor="pickup">{t("Cart.pickUp")}</label>
          </div>
        </div>

        <Col lg={10} xl={9} xxl={8}>
          <>
            <p className="cart__text">{t("Cart.deliveryDescription")}</p>
            <p className="cart__text">{t("Cart.deliveryDescription2")}</p>
            <ul>
              <li>{t("Cart.deliveryDescription3")}</li>
              <li>{t("Cart.deliveryDescription4")}</li>
            </ul>
          </>
        </Col>

        <h4 className="cart__title">{t("Cart.contactInfo")}</h4>
        <Formik
          initialValues={initialFormDataState}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email(t("Forms.incorrectEmail"))
              .required(t("Forms.required")),
            // phone: Yup.string()
            //   .phone("ME", t("Forms.incorrectPhone"))
            //   .required(t("Forms.required")),
            comments: Yup.string().max(100, t("Forms.lengthMax100")),
          })}
          onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
        >
          <FormikForm className="contacts__form">
            <Col md={7} lg={6} xxl={5}>
              <FormsInput
                col={12}
                controlId={"name"}
                type="text"
                placeholder={t("fullName")}
                name="name"
              />
              <Row>
                <FormsInput
                  col={6}
                  controlId={"phone"}
                  type="text"
                  placeholder={t("Contacts.phone")}
                  name="phone"
                />

                <FormsInput
                  col={6}
                  controlId={"email"}
                  type="email"
                  placeholder="E-mail"
                  name="email"
                  />
              </Row>

              <FormsInput
                as="textarea"
                col={12}
                controlId={"comments"}
                placeholder={t("comments")}
                name="comments"
              />
              <h4 className="cart__title cart__title--small-margin">
                {t("Cart.address")}
              </h4>
              <FormsInput
                  col={12}
                  controlId={"address"}
                  type="text"
                  placeholder={t("address")}
                  name="address"
                />
              <button className="btn btn--primary mt-5" type="submit">
                {t("Cart.order")}
              </button>
            </Col>
          </FormikForm>
        </Formik>
      </div>
    </Container>
  )
}
export default Ordering