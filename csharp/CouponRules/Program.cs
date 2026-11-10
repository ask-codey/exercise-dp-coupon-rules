using CouponRules;

// A demo: tries your code on three orders and one new rule. You don't need to change it.
List<Order> orders = new List<Order>
{
    new Order("Maya", Catalog.HikingBoots, Catalog.TrailSocks),
    new Order("Sam", Catalog.RainJacket),
    new Order("Leo", Catalog.WaterBottle, Catalog.TrailSocks),
};
foreach (Order order in orders)
{
    List<string> codes = new List<string> { "TRAIL10", "BOTTLE", "BOOTS20" }.Where(code => Coupons.Check(code, order)).ToList();
    Console.WriteLine($"{order.Customer}: {(codes.Count > 0 ? string.Join(", ", codes) : "none")}");
}

// A rule marketing built on the admin screen this morning.
Rule camp = new And(new Has("bottle"), new TotalOver(20));
Console.WriteLine($"New rule: {Coupons.Describe(camp)}");
Console.WriteLine($"Leo qualifies: {(Coupons.Qualifies(camp, orders[2]) ? "yes" : "no")}");
