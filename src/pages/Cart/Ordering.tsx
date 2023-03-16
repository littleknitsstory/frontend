import { Container, Col, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../app/hooks"
import { PICTURE_BASE_URL } from "../../components/features/api/apiSlice"
import { convertToCurrency } from "../../utils/convertPrice"
import { Formik, Form as FormikForm, FormikState } from "formik";
import * as Yup from "yup";
import { FormValues } from "../../app/types"
import { FormsInput } from "../../components/utils/Forms";

const Ordering = () => {
  const { i18n, t } = useTranslation()
  const cart = useAppSelector(state => state.cart)

  const totalAmount = cart.products.reduce((acc, current) => acc + current.amount, 0)

  const productImages = cart.products.map(product => 
    <img
      key={product.id} 
      src={PICTURE_BASE_URL + product.image_preview} 
      alt={product.image_alt}
      className="product-card__cart-img"
    />  
  )

  const initialFormDataState: FormValues = {
    fullName: "",
    email: "",
    message: "",
    phone_number: "",
    address: ""
  };

  const handleFormSubmit = (
    values: FormValues,
    resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void,
  ): void => {
    resetForm();
  };

  return (
    <Container className="cart__ordering">
      {productImages}
      <h4 className="cart__total-price">
        Итого: {totalAmount} шт. — {convertToCurrency(cart.totalPrice, i18n.language)}
      </h4>

      <div className="cart__delivery">
        <h4 className="cart__title">Доставка</h4>

        <div className="cart__radio-wrapper">
          <div className="cart__radio-item">
            <input 
              className="cart__radio-input" 
              type="radio" 
              name="delivery" 
              id="courier" 
              value="courier" 
            />
            <label htmlFor="courier">Курьером</label>
          </div>
          <div className="cart__radio-item">
            <input 
              className="cart__radio-input"
              type="radio" 
              name="delivery" 
              id="pickup" 
              value="pickup" 
            />
            <label htmlFor="pickup">Самовывоз</label>
          </div>
        </div>

        <Col lg={10} xl={9} xxl={8}>
          <p className="cart__text">Стоимость доставки по Москве составляет 300 руб. Если сумма заказа превышает 3 000 руб., то доставка бесплатная. Включая районы: Митино, Новокосино, Бутово, Коммунарка, г.Зеленоград, Люберцы.</p>
          <p className="cart__text">Стоимость доставки заказов за пределами МКАД:</p>
          <ul>
            <li>при сумме заказа до 3 000 руб - 300 руб + за каждый километр (до 20 км от МКАД - 50 руб/км, от 20 км от МКАД - 60 руб/км)</li>
            <li>при сумме заказа от 3 000 руб - за каждый километр (до 20 км от МКАД - 50 руб/км, от 20 км от МКАД - 60 руб/км)</li>
          </ul>
        </Col>

        <h4 className="cart__title">Данные получателя</h4>
        <Formik
          initialValues={initialFormDataState}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .min(2, t("Forms.lengthRequired"))
              .max(30, t("Forms.lengthMax30"))
              .required(t("Forms.required")),
            email: Yup.string()
              .email(t("Forms.incorrectEmail"))
              .required(t("Forms.required")),
            phone_number: Yup.string()
              .phone("ME", t("Forms.incorrectPhone"))
              .required(t("Forms.required")),
            company: Yup.string().max(30, t("Forms.lengthMax30")),
            message: Yup.string().max(100, t("Forms.lengthMax100")),
          })}
          onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
        >
          <FormikForm className="contacts__form">
            <Col md={7} lg={6} xxl={5}>
              <FormsInput
                col={12}
                controlId={"fullName"}
                type="text"
                placeholder="Full Name"
                name="fullName"
              />
              <Row>
                <FormsInput
                  col={6}
                  controlId={"phone"}
                  type="text"
                  placeholder="Phone"
                  name="phone_number"
                />

                <FormsInput
                  col={6}
                  controlId={"email"}
                  type="email"
                  placeholder="Email"
                  name="email"
                  />
              </Row>

              <FormsInput
                as="textarea"
                col={12}
                controlId={"message"}
                placeholder="Comments"
                name="message"
              />
              <h4 className="cart__title cart__title--small-margin">Адрес доставки</h4>
              <FormsInput
                  col={12}
                  controlId={"address"}
                  type="text"
                  placeholder="Address"
                  name="address"
                />

              <button className="btn btn_vinous btn__text_center mt-5" type="submit">
                Оформить заказ
              </button>
            </Col>
          </FormikForm>
        </Formik>
      </div>
    </Container>
  )
}
export default Ordering