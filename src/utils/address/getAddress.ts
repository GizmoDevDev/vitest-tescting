export const getAddress = (address: string) => {
  const splitedAddress = address.split(', ')
  return {
    city: splitedAddress[0],
    street: splitedAddress[1],
    homeNumber: Number.parseInt(splitedAddress[2]),
    plateNumber: Number.parseInt(splitedAddress[3]),
  }
}