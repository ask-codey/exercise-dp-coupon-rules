namespace CouponRules;

public record Product(string Name, int Price, string Kind);

// What Trailhead Outfitters sells.
public static class Catalog
{
    public static readonly Product HikingBoots = new Product("Hiking boots", 120, "shoe");
    public static readonly Product RainJacket = new Product("Rain jacket", 80, "jacket");
    public static readonly Product WaterBottle = new Product("Water bottle", 15, "bottle");
    public static readonly Product TrailSocks = new Product("Trail socks", 12, "socks");
}

public class Order
{
    public Order(string customer, params Product[] products)
    {
        Customer = customer;
        Products = products.ToList();
    }

    public string Customer { get; }
    public List<Product> Products { get; }
}

public static class Coupons
{
    // The checkout page calls this with the code a customer typed.
    public static bool Check(string code, Order order)
    {
        if (code == "TRAIL10")
        {
            int total = 0;
            foreach (Product product in order.Products)
            {
                total += product.Price;
            }
            bool shoe = false;
            bool jacket = false;
            foreach (Product product in order.Products)
            {
                if (product.Kind == "shoe") { shoe = true; }
                if (product.Kind == "jacket") { jacket = true; }
            }
            return total > 50 && (shoe || jacket);
        }
        if (code == "BOTTLE")
        {
            bool jacket = false;
            bool bottle = false;
            foreach (Product product in order.Products)
            {
                if (product.Kind == "jacket") { jacket = true; }
                if (product.Kind == "bottle") { bottle = true; }
            }
            return jacket && !bottle;
        }
        if (code == "BOOTS20")
        {
            int total = 0;
            bool shoe = false;
            foreach (Product product in order.Products)
            {
                total += product.Price;
                if (product.Kind == "shoe") { shoe = true; }
            }
            return shoe && total > 100;
        }
        return false;
    }

    // The admin screen's team already calls these two. They don't work yet.

    // Does this order qualify for a rule marketing built on the admin screen?
    public static bool Qualifies(Rule rule, Order order)
    {
        return false;
    }

    // The rule in words, for the admin screen, such as "total over $50 and (has a shoe or has a jacket)".
    public static string Describe(Rule rule)
    {
        return "";
    }
}

// The pieces the admin screen builds rules from. They hold what marketing picked, and nothing else yet.
public abstract class Rule
{
}

public class TotalOver : Rule
{
    public TotalOver(int amount) { Amount = amount; }
    public int Amount { get; }
}

public class Has : Rule
{
    public Has(string kind) { Kind = kind; }
    public string Kind { get; }
}

public class And : Rule
{
    public And(Rule left, Rule right) { Left = left; Right = right; }
    public Rule Left { get; }
    public Rule Right { get; }
}

public class Or : Rule
{
    public Or(Rule left, Rule right) { Left = left; Right = right; }
    public Rule Left { get; }
    public Rule Right { get; }
}

public class Not : Rule
{
    public Not(Rule rule) { Rule = rule; }
    public Rule Rule { get; }
}
