import { Container } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../app/hooks"
import { PICTURE_BASE_URL } from "../../components/features/api/apiSlice"
import { convertToCurrency } from "../../utils/convertPrice"

const Ordering = () => {
  const { i18n } = useTranslation()
  const cart = useAppSelector(state => state.cart)

  const totalAmount = cart.products.reduce((acc, current) => acc + current.amount, 0)

  const productImages = cart.products.map(product => 
    <img 
      src={PICTURE_BASE_URL + product.image_preview} 
      alt={product.image_alt}
      className="product-card__cart-img"
    />  
  )

  return (
    <Container className="ordering-container">
      {productImages}

      <h4 className="cart__total-price">Итого: {totalAmount} шт. — {convertToCurrency(cart.totalPrice, i18n.language)  }</h4>
    </Container>
  )
}
export default Ordering