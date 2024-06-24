export default function formatPrice (price) {
  price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  return price == null ? '0' : price
}