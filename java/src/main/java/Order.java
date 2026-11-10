import java.util.List;

class Order {
    final String customer;
    final List<Product> products;

    Order(String customer, Product... products) {
        this.customer = customer;
        this.products = List.of(products);
    }
}
