// The tests for your code. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.
import assert from "node:assert/strict";
import { test } from "node:test";
import { And, HIKING_BOOTS, Has, Not, Or, Order, RAIN_JACKET, TRAIL_SOCKS, TotalOver, WATER_BOTTLE, check, describe, qualifies, type Rule } from "./coupons.ts";

const maya = (): Order => new Order("Maya", HIKING_BOOTS, TRAIL_SOCKS);
const sam = (): Order => new Order("Sam", RAIN_JACKET);
const leo = (): Order => new Order("Leo", WATER_BOTTLE, TRAIL_SOCKS);

// What the store does today. These pass before you change anything: keep them passing.

test("TRAIL10 needs over $50 and a shoe or a jacket", () => {
  assert.equal(check("TRAIL10", maya()), true, "Keep this working: TRAIL10 applies to Maya's $132 order with hiking boots.");
  assert.equal(check("TRAIL10", sam()), true, "Keep this working: TRAIL10 applies to Sam's $80 order with a rain jacket.");
  assert.equal(check("TRAIL10", leo()), false, "Keep this working: TRAIL10 doesn't apply to Leo's $27 order, with no shoe or jacket.");
});

test("BOTTLE needs a jacket and no bottle", () => {
  assert.equal(check("BOTTLE", sam()), true, "Keep this working: BOTTLE applies to Sam's order: a jacket and no bottle.");
  assert.equal(check("BOTTLE", maya()), false, "Keep this working: BOTTLE doesn't apply to Maya's order: no jacket.");
  assert.equal(check("BOTTLE", new Order("Dana", RAIN_JACKET, WATER_BOTTLE)), false, "Keep this working: BOTTLE doesn't apply to an order that already has a bottle.");
});

test("BOOTS20 needs a shoe and over $100", () => {
  assert.equal(check("BOOTS20", maya()), true, "Keep this working: BOOTS20 applies to Maya's $132 order with hiking boots.");
  assert.equal(check("BOOTS20", sam()), false, "Keep this working: BOOTS20 doesn't apply to Sam's order: no shoe.");
});

test("a code nobody knows applies to no one", () => {
  assert.equal(check("HALFOFF", maya()), false, "Keep this working: a code the store doesn't have applies to nobody.");
});

// The ticket's new requirements. These fail until the work is done.

test("a rule from the admin screen is checked", () => {
  const rule: Rule = new And(new Has("bottle"), new TotalOver(20));
  assert.equal(qualifies(rule, leo()), true, 'Not yet: "has a bottle and total over $20" applies to Leo\'s $27 order with a water bottle.');
  assert.equal(qualifies(rule, sam()), false, 'Not yet: "has a bottle and total over $20" doesn\'t apply to Sam\'s order: no bottle.');
});

test("pieces combine in shapes nobody planned", () => {
  const rule: Rule = new And(new Not(new Has("shoe")), new Not(new Has("jacket")));
  assert.equal(qualifies(rule, leo()), true, 'Not yet: "not has a shoe and not has a jacket" applies to Leo\'s order.');
  assert.equal(qualifies(rule, maya()), false, 'Not yet: "not has a shoe and not has a jacket" doesn\'t apply to Maya\'s order, which has boots.');
  assert.equal(qualifies(rule, sam()), false, 'Not yet: "not has a shoe and not has a jacket" doesn\'t apply to Sam\'s order, which has a jacket.');
});

test("the screen shows a rule in words", () => {
  const trail10: Rule = new And(new TotalOver(50), new Or(new Has("shoe"), new Has("jacket")));
  assert.equal(describe(trail10), "total over $50 and (has a shoe or has a jacket)", 'Not yet: TRAIL10 reads "total over $50 and (has a shoe or has a jacket)".');
});

test("a not is described too", () => {
  assert.equal(describe(new And(new Has("jacket"), new Not(new Has("bottle")))), "has a jacket and not has a bottle", 'Not yet: BOTTLE reads "has a jacket and not has a bottle".');
  assert.equal(describe(new Not(new Or(new Has("shoe"), new Has("jacket")))), "not (has a shoe or has a jacket)", 'Not yet: a "not" around an "or" reads "not (has a shoe or has a jacket)".');
});
