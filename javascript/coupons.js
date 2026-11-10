// Trailhead Outfitters' coupons.

// Anything the store sells: a name, a price in whole dollars, and a kind ("shoe", "jacket", "bottle", "socks").
export class Product {
  constructor(name, price, kind) {
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
  constructor(customer, ...products) {
    this.customer = customer;
    this.products = products;
  }
}

// The checkout page calls this with the code a customer typed.
export function check(code, order) {
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
export function qualifies(rule, order) {
  return false;
}

// The rule in words, for the admin screen, such as "total over $50 and (has a shoe or has a jacket)".
export function describe(rule) {
  return "";
}

// The pieces the admin screen builds rules from. They hold what marketing picked, and nothing else yet.

export class TotalOver {
  constructor(amount) { this.amount = amount; }
}

export class Has {
  constructor(kind) { this.kind = kind; }
}

export class And {
  constructor(left, right) { this.left = left; this.right = right; }
}

export class Or {
  constructor(left, right) { this.left = left; this.right = right; }
}

export class Not {
  constructor(rule) { this.rule = rule; }
}
