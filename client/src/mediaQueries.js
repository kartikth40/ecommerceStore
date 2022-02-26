const size = {
  mobile: 500,
  tablet: 900,
  laptopS: 1250,
}

const device = {
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(max-width: ${size.tablet}px)`,
  laptopS: `(max-width: ${size.laptopS}px)`,
}

export default device
export { size }
