export type Address = {
  city?: string;
  street?: string;
  postCode?: string;
}

export type Person = {
  firstName?: string;
  lastName?: string;
  age?: number;
  address: Address;
}
