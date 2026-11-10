"""The tests for your code. You don't need to change this file.
Each message says what was expected, so a failing test tells you what to look at."""
from coupons import HIKING_BOOTS, RAIN_JACKET, TRAIL_SOCKS, WATER_BOTTLE, And, Has, Not, Or, Order, TotalOver, check, describe, qualifies


def maya():
    return Order("Maya", HIKING_BOOTS, TRAIL_SOCKS)


def sam():
    return Order("Sam", RAIN_JACKET)


def leo():
    return Order("Leo", WATER_BOTTLE, TRAIL_SOCKS)


# What the store does today. These pass before you change anything: keep them passing.

def test_trail10_needs_over_fifty_dollars_and_a_shoe_or_a_jacket():
    assert check("TRAIL10", maya()), "Keep this working: TRAIL10 applies to Maya's $132 order with hiking boots."
    assert check("TRAIL10", sam()), "Keep this working: TRAIL10 applies to Sam's $80 order with a rain jacket."
    assert not check("TRAIL10", leo()), "Keep this working: TRAIL10 doesn't apply to Leo's $27 order, with no shoe or jacket."


def test_bottle_needs_a_jacket_and_no_bottle():
    assert check("BOTTLE", sam()), "Keep this working: BOTTLE applies to Sam's order: a jacket and no bottle."
    assert not check("BOTTLE", maya()), "Keep this working: BOTTLE doesn't apply to Maya's order: no jacket."
    assert not check("BOTTLE", Order("Dana", RAIN_JACKET, WATER_BOTTLE)), \
        "Keep this working: BOTTLE doesn't apply to an order that already has a bottle."


def test_boots20_needs_a_shoe_and_over_one_hundred_dollars():
    assert check("BOOTS20", maya()), "Keep this working: BOOTS20 applies to Maya's $132 order with hiking boots."
    assert not check("BOOTS20", sam()), "Keep this working: BOOTS20 doesn't apply to Sam's order: no shoe."


def test_a_code_nobody_knows_applies_to_no_one():
    assert not check("HALFOFF", maya()), "Keep this working: a code the store doesn't have applies to nobody."


# The ticket's new requirements. These fail until the work is done.

def test_a_rule_from_the_admin_screen_is_checked():
    rule = And(Has("bottle"), TotalOver(20))
    assert qualifies(rule, leo()), 'Not yet: "has a bottle and total over $20" applies to Leo\'s $27 order with a water bottle.'
    assert not qualifies(rule, sam()), 'Not yet: "has a bottle and total over $20" doesn\'t apply to Sam\'s order: no bottle.'


def test_pieces_combine_in_shapes_nobody_planned():
    rule = And(Not(Has("shoe")), Not(Has("jacket")))
    assert qualifies(rule, leo()), 'Not yet: "not has a shoe and not has a jacket" applies to Leo\'s order.'
    assert not qualifies(rule, maya()), 'Not yet: "not has a shoe and not has a jacket" doesn\'t apply to Maya\'s order, which has boots.'
    assert not qualifies(rule, sam()), 'Not yet: "not has a shoe and not has a jacket" doesn\'t apply to Sam\'s order, which has a jacket.'


def test_the_screen_shows_a_rule_in_words():
    trail10 = And(TotalOver(50), Or(Has("shoe"), Has("jacket")))
    assert describe(trail10) == "total over $50 and (has a shoe or has a jacket)", \
        'Not yet: TRAIL10 reads "total over $50 and (has a shoe or has a jacket)".'


def test_a_not_is_described_too():
    assert describe(And(Has("jacket"), Not(Has("bottle")))) == "has a jacket and not has a bottle", \
        'Not yet: BOTTLE reads "has a jacket and not has a bottle".'
    assert describe(Not(Or(Has("shoe"), Has("jacket")))) == "not (has a shoe or has a jacket)", \
        'Not yet: a "not" around an "or" reads "not (has a shoe or has a jacket)".'
