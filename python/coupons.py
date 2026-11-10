"""Trailhead Outfitters' coupons."""


class Product:
    """Anything the store sells: a name, a price in whole dollars, and a kind ("shoe", "jacket", "bottle", "socks")."""

    def __init__(self, name, price, kind):
        self.name = name
        self.price = price
        self.kind = kind


# What Trailhead Outfitters sells.
HIKING_BOOTS = Product("Hiking boots", 120, "shoe")
RAIN_JACKET = Product("Rain jacket", 80, "jacket")
WATER_BOTTLE = Product("Water bottle", 15, "bottle")
TRAIL_SOCKS = Product("Trail socks", 12, "socks")


class Order:
    def __init__(self, customer, *products):
        self.customer = customer
        self.products = list(products)


def check(code, order):
    """The checkout page calls this with the code a customer typed."""
    if code == "TRAIL10":
        total = 0
        for product in order.products:
            total += product.price
        shoe = False
        jacket = False
        for product in order.products:
            if product.kind == "shoe":
                shoe = True
            if product.kind == "jacket":
                jacket = True
        return total > 50 and (shoe or jacket)
    if code == "BOTTLE":
        jacket = False
        bottle = False
        for product in order.products:
            if product.kind == "jacket":
                jacket = True
            if product.kind == "bottle":
                bottle = True
        return jacket and not bottle
    if code == "BOOTS20":
        total = 0
        shoe = False
        for product in order.products:
            total += product.price
            if product.kind == "shoe":
                shoe = True
        return shoe and total > 100
    return False


# The admin screen's team already calls these two. They don't work yet.

def qualifies(rule, order):
    """Does this order qualify for a rule marketing built on the admin screen?"""
    return False


def describe(rule):
    """The rule in words, for the admin screen, such as "total over $50 and (has a shoe or has a jacket)"."""
    return ""


# The pieces the admin screen builds rules from. They hold what marketing picked, and nothing else yet.

class TotalOver:
    def __init__(self, amount):
        self.amount = amount


class Has:
    def __init__(self, kind):
        self.kind = kind


class And:
    def __init__(self, left, right):
        self.left = left
        self.right = right


class Or:
    def __init__(self, left, right):
        self.left = left
        self.right = right


class Not:
    def __init__(self, rule):
        self.rule = rule
