// A demo: tries your code on three orders and one new rule. You don't need to change it.
import { And, HIKING_BOOTS, Has, Order, RAIN_JACKET, TRAIL_SOCKS, TotalOver, WATER_BOTTLE, check, describe, qualifies, type Rule } from "./coupons.ts";

const orders = [new Order("Maya", HIKING_BOOTS, TRAIL_SOCKS), new Order("Sam", RAIN_JACKET), new Order("Leo", WATER_BOTTLE, TRAIL_SOCKS)];
for (const order of orders) {
  const codes = ["TRAIL10", "BOTTLE", "BOOTS20"].filter((code) => check(code, order));
  console.log(`${order.customer}: ${codes.join(", ") || "none"}`);
}

// A rule marketing built on the admin screen this morning.
const camp: Rule = new And(new Has("bottle"), new TotalOver(20));
console.log(`New rule: ${describe(camp)}`);
console.log(`Leo qualifies: ${qualifies(camp, orders[2]) ? "yes" : "no"}`);
