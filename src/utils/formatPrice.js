export const formatPrice = (price, currency = "ARS") => {
  if (!price || Number(price) <= 0) return "Consultar precio";

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(price));
};
