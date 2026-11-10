// Trailhead Outfitters' coupons.

// Anything the store sells: a name, a price in whole dollars, and a kind ("shoe", "jacket", "bottle", "socks").
export class Product {
  name: string;
  price: number;
  kind: string;

  constructor(name: string, price: number, kind: string) {
    this.name = name;
    this.price = price;
    this.kind = kind;
  }
}

// What Trailhead Outfitters sells.
export const HIKING_BOOTS = new Product("Hiking boots", 120, "shoe");
export const RAIN_JACKET = new Product("Rain jacket", 80, "jacket");
export const WATER_BOTTLE = new Product("Water bottle", 15, "bottle");
export const TRAIL_SOCKS = new Product("Trail socks", 12, "socks");

export class Order {
  customer: string;
  products: Product[];

  constructor(customer: string, ...products: Product[]) {
    this.customer = customer;
    this.products = products;
  }
}

// The checkout page calls this with the code a customer typed.
export function check(code: string, order: Order): boolean {
  if (code === "TRAIL10") {
    let total = 0;
    for (const product of order.products) {
      total += product.price;
    }
    let shoe = false;
    let jacket = false;
    for (const product of order.products) {
      if (product.kind === "shoe") { shoe = true; }
      if (product.kind === "jacket") { jacket = true; }
    }
    return total > 50 && (shoe || jacket);
  }
  if (code === "BOTTLE") {
    let jacket = false;
    let bottle = false;
    for (const product of order.products) {
      if (product.kind === "jacket") { jacket = true; }
      if (product.kind === "bottle") { bottle = true; }
    }
    return jacket && !bottle;
  }
  if (code === "BOOTS20") {
    let total = 0;
    let shoe = false;
    for (const product of order.products) {
      total += product.price;
      if (product.kind === "shoe") { shoe = true; }
    }
    return shoe && total > 100;
  }
  return false;
}

// The admin screen's team already calls these two. They don't work yet.

// Does this order qualify for a rule marketing built on the admin screen?
export function qualifies(rule: Rule, order: Order): boolean {
  return false;
}

// The rule in words, for the admin screen, such as "total over $50 and (has a shoe or has a jacket)".
export function describe(rule: Rule): string {
  return "";
}

// The pieces the admin screen builds rules from. They hold what marketing picked, and nothing else yet.
export interface Rule {}

export class TotalOver implements Rule {
  amount: number;
  constructor(amount: number) { this.amount = amount; }
}

export class Has implements Rule {
  kind: string;
  constructor(kind: string) { this.kind = kind; }
}

export class And implements Rule {
  left: Rule;
  right: Rule;
  constructor(left: Rule, right: Rule) { this.left = left; this.right = right; }
}

export class Or implements Rule {
  left: Rule;
  right: Rule;
  constructor(left: Rule, right: Rule) { this.left = left; this.right = right; }
}

export class Not implements Rule {
  rule: Rule;
  constructor(rule: Rule) { this.rule = rule; }
}
