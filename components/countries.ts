export type CountryProps = {
  name: string;
  code: string;
}

export type ProvinceProps = {
  name: string;
  code: string;
}

export const countries: CountryProps[] = [
  {
    name: "South Africa",
    code: "ZA",
  },
]

export const provinces: ProvinceProps[] = [
  {
    name: "Eastern Cape",
    code: "EC",
  },
  {
    name: "Free State",
    code: "FS",
  },
  {
    name: "Gauteng",
    code: "GT",
  },
  {
    name: "KwaZulu-Natal",
    code: "KZN",
  },
  {
    name: "Limpopo",
    code: "LP",
  },
  {
    name: "Mpumalanga",
    code: "MP",
  },
  {
    name: "North West",
    code: "NW",
  },
  {
    name: "Northern Cape",
    code: "NC",
  },
  {
    name: "Western Cape",
    code: "WC",
  },
];
