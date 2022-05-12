// Objeto de información del bitcoin
export class Price {
  constructor(
    public amount: number,
    public base: String,
    public currency: String,
    public day: String,
    public monthName: String
  ) {}
}
