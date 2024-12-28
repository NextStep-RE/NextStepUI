export class Document {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public date: Date,
    public file: Uint8Array,
    public customerId: number
  ) {}
}
