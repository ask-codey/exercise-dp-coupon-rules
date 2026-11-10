class Coupons {
    // The checkout page calls this with the code a customer typed.
    static boolean check(String code, Order order) {
        if (code.equals("TRAIL10")) {
            int total = 0;
            for (Product product : order.products) {
                total += product.price();
            }
            boolean shoe = false;
            boolean jacket = false;
            for (Product product : order.products) {
                if (product.kind().equals("shoe")) { shoe = true; }
                if (product.kind().equals("jacket")) { jacket = true; }
            }
            return total > 50 && (shoe || jacket);
        }
        if (code.equals("BOTTLE")) {
            boolean jacket = false;
            boolean bottle = false;
            for (Product product : order.products) {
                if (product.kind().equals("jacket")) { jacket = true; }
                if (product.kind().equals("bottle")) { bottle = true; }
            }
            return jacket && !bottle;
        }
        if (code.equals("BOOTS20")) {
            int total = 0;
            boolean shoe = false;
            for (Product product : order.products) {
                total += product.price();
                if (product.kind().equals("shoe")) { shoe = true; }
            }
            return shoe && total > 100;
        }
        return false;
    }

    // The admin screen's team already calls these two. They don't work yet.

    // Does this order qualify for a rule marketing built on the admin screen?
    static boolean qualifies(Rule rule, Order order) {
        return false;
    }

    // The rule in words, for the admin screen, such as "total over $50 and (has a shoe or has a jacket)".
    static String describe(Rule rule) {
        return "";
    }
}
