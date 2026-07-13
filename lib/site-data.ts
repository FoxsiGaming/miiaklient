export interface ProductItem {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  heatingCapacity: string;
  scop: number;
  imageUrl: string;
  isVisible: boolean;
}

export const siteContentDefaults = {
  heroHeading: "Pidämme Suomen kodit lämpiminä ja energiatehokkaina.",
  heroBody: "Kokeneet asentajat ja huolellisesti valitut tuotteet tekevät kotistasi miellyttävän ja tehokkaan.",
  companyName: "Lämpökamu",
  companyEmail: "info@lampokamu.fi",
  companyPhone: "+358 40 123 4567",
  companyAddress: "Katu 12, 00100 Helsinki",
};

export const products: ProductItem[] = [
  {
    id: 1,
    name: "Air 12",
    type: "Ilmalämpöpumppu",
    description: "Luotettava ja hiljainen ratkaisu kodin pienempään tai keskisuureen lämmitystarpeeseen.",
    price: 3200,
    heatingCapacity: "4,5 kW",
    scop: 4.2,
    imageUrl: "",
    isVisible: true,
  },
  {
    id: 2,
    name: "Aqua 18",
    type: "Ilmavesilämpöpumppu",
    description: "Tehokas vaihtoehto, kun haluat yhdistää lattialämmityksen ja käyttöveden lämmityksen.",
    price: 6800,
    heatingCapacity: "7,0 kW",
    scop: 4.7,
    imageUrl: "",
    isVisible: true,
  },
  {
    id: 3,
    name: "Hybrid Pro",
    type: "Hybridilämpöpumppu",
    description: "Korkean tehokkuuden ratkaisu, jossa yhdistyvät uusiutuva energia ja luotettava takuu.",
    price: 5400,
    heatingCapacity: "6,0 kW",
    scop: 4.4,
    imageUrl: "",
    isVisible: true,
  },
];

export function getSiteContent() {
  return { ...siteContentDefaults };
}

export function getProducts() {
  return products.filter((product) => product.isVisible);
}
