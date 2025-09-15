export class Transaction {
  private _avatar: string;
  private _name: string;
  private _category: string;
  private _date: string;
  private _amount: number;
  private _recurring: boolean;

  constructor(data: TransactionAPI) {
    this._avatar = data.avatar;
    this._name = data.name;
    this._category = data.category;
    this._date = data.date;
    this._amount = data.amount;
    this._recurring = data.recurring;
  }

  public get avatar() {
    return "@" + this._avatar.slice(1);
  }

  public get name() {
    return this._name;
  }

  public get category() {
    return this._category;
  }

  public get date() {
    const mydate = new Date(this._date);
    return mydate.toLocaleString("en-US", { dateStyle: "medium" });
  }

  public get amount() {
    let formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(this._amount);
  }

  public get recurring() {
    return this._recurring;
  }
}

export interface TransactionAPI {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}
