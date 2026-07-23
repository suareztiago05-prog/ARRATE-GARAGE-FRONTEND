const gallery = (folder, extension) =>
  ["01", "02", "03", "04"].map(
    (file) => `/images/zontes/${folder}/${file}.${extension}`,
  );

const ZONTES_IMAGES_BY_MODEL = {
  "703 RR": gallery("703-rr", "webp"),
  "703 F c/defensas, faros y base top case": gallery("703-f", "webp"),
  "U3-200": gallery("u3-200", "jpg"),
  "V 350": gallery("v350", "jpg"),
  "R 350": gallery("r350", "jpg"),
  "X 350": gallery("x350", "jpg"),
  "GK 350": gallery("gk350", "jpg"),
  "T 350 STD (común)": gallery("t350", "webp"),
  "T 350 c/maletas": gallery("t350", "webp"),
  "G 368": gallery("g368", "webp"),
  "E 368 - PRÓXIMAMENTE": gallery("e368", "jpg"),
  "M 368 - PRÓXIMAMENTE": gallery("m368", "jpg"),
  "D 368 - PRÓXIMAMENTE": gallery("d368", "jpg"),
};

const isZontes = (moto) =>
  moto?.marca?.nombre?.trim().toLowerCase() === "zontes";

export const withOfficialZontesImages = (moto) => {
  if (!isZontes(moto)) {
    return moto;
  }

  const imagenes = ZONTES_IMAGES_BY_MODEL[moto.nombre];

  return imagenes ? { ...moto, imagenes: [...imagenes] } : moto;
};

export const withOfficialZontesImagesList = (motos = []) =>
  motos.map(withOfficialZontesImages);
