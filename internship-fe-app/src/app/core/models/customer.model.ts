export class Customer {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phoneNumber: string,
    public country: string,
    public city: string,
    public postalCode: string,
    public street: string,
    public number: string,
    public status: boolean,
    public billingType: string,
    public tva: number,
    public addition: string,
    public date: Date
  ) {}
}

export class LoadCustomers {
  constructor(
    public pageNumber: number,
    public pageSize: number,
    public searchInput?: string,
    public sortDirection?: string,
    public sortCriteria?: string,
    public filter?: boolean
  ) {}
}

export class UpdateCustomer {
  constructor(
    public Name: string,
    public Email: string,
    public PhoneNumber: string,
    public Country: string,
    public City: string,
    public PostalCode: string,
    public Street: string,
    public Number: string,
    public BillingType: string,
    public Tva: number,
    public Addition: string,
  ) {}
}
