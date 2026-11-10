import java.util.ArrayList;
import java.util.List;

// A demo: tries your code on three orders and one new rule. You don't need to change it.
// Run it with: java src/main/java/Demo.java
public class Demo {
    public static void main(String[] args) {
        List<Order> orders = List.of(
            new Order("Maya", Catalog.HIKING_BOOTS, Catalog.TRAIL_SOCKS),
            new Order("Sam", Catalog.RAIN_JACKET),
            new Order("Leo", Catalog.WATER_BOTTLE, Catalog.TRAIL_SOCKS));
        for (Order order : orders) {
            List<String> codes = new ArrayList<>();
            for (String code : List.of("TRAIL10", "BOTTLE", "BOOTS20")) {
                if (Coupons.check(code, order)) { codes.add(code); }
            }
            System.out.println(order.customer + ": " + (codes.isEmpty() ? "none" : String.join(", ", codes)));
        }

        // A rule marketing built on the admin screen this morning.
        Rule camp = new And(new Has("bottle"), new TotalOver(20));
        System.out.println("New rule: " + Coupons.describe(camp));
        System.out.println("Leo qualifies: " + (Coupons.qualifies(camp, orders.get(2)) ? "yes" : "no"));
    }
}
