"""A demo: tries your code on three orders and one new rule. You don't need to change it."""
from coupons import HIKING_BOOTS, RAIN_JACKET, TRAIL_SOCKS, WATER_BOTTLE, And, Has, Order, TotalOver, check, describe, qualifies

orders = [Order("Maya", HIKING_BOOTS, TRAIL_SOCKS), Order("Sam", RAIN_JACKET), Order("Leo", WATER_BOTTLE, TRAIL_SOCKS)]
for order in orders:
    codes = [code for code in ["TRAIL10", "BOTTLE", "BOOTS20"] if check(code, order)]
    print(f"{order.customer}: {', '.join(codes) or 'none'}")

# A rule marketing built on the admin screen this morning.
camp = And(Has("bottle"), TotalOver(20))
print(f"New rule: {describe(camp)}")
print(f"Leo qualifies: {'yes' if qualifies(camp, orders[2]) else 'no'}")
