import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

// The tests for your code. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.
class CouponTest {
    private static Order maya() { return new Order("Maya", Catalog.HIKING_BOOTS, Catalog.TRAIL_SOCKS); }
    private static Order sam() { return new Order("Sam", Catalog.RAIN_JACKET); }
    private static Order leo() { return new Order("Leo", Catalog.WATER_BOTTLE, Catalog.TRAIL_SOCKS); }

    // What the store does today. These pass before you change anything: keep them passing.

    @Test
    void trail10NeedsOverFiftyDollarsAndAShoeOrAJacket() {
        assertTrue(Coupons.check("TRAIL10", maya()), "Keep this working: TRAIL10 applies to Maya's $132 order with hiking boots.");
        assertTrue(Coupons.check("TRAIL10", sam()), "Keep this working: TRAIL10 applies to Sam's $80 order with a rain jacket.");
        assertFalse(Coupons.check("TRAIL10", leo()), "Keep this working: TRAIL10 doesn't apply to Leo's $27 order, with no shoe or jacket.");
    }

    @Test
    void bottleNeedsAJacketAndNoBottle() {
        assertTrue(Coupons.check("BOTTLE", sam()), "Keep this working: BOTTLE applies to Sam's order: a jacket and no bottle.");
        assertFalse(Coupons.check("BOTTLE", maya()), "Keep this working: BOTTLE doesn't apply to Maya's order: no jacket.");
        assertFalse(Coupons.check("BOTTLE", new Order("Dana", Catalog.RAIN_JACKET, Catalog.WATER_BOTTLE)), "Keep this working: BOTTLE doesn't apply to an order that already has a bottle.");
    }

    @Test
    void boots20NeedsAShoeAndOverOneHundredDollars() {
        assertTrue(Coupons.check("BOOTS20", maya()), "Keep this working: BOOTS20 applies to Maya's $132 order with hiking boots.");
        assertFalse(Coupons.check("BOOTS20", sam()), "Keep this working: BOOTS20 doesn't apply to Sam's order: no shoe.");
    }

    @Test
    void aCodeNobodyKnowsAppliesToNoOne() {
        assertFalse(Coupons.check("HALFOFF", maya()), "Keep this working: a code the store doesn't have applies to nobody.");
    }

    // The ticket's new requirements. These fail until the work is done.

    @Test
    void aRuleFromTheAdminScreenIsChecked() {
        Rule rule = new And(new Has("bottle"), new TotalOver(20));
        assertTrue(Coupons.qualifies(rule, leo()), "Not yet: \"has a bottle and total over $20\" applies to Leo's $27 order with a water bottle.");
        assertFalse(Coupons.qualifies(rule, sam()), "Not yet: \"has a bottle and total over $20\" doesn't apply to Sam's order: no bottle.");
    }

    @Test
    void piecesCombineInShapesNobodyPlanned() {
        Rule rule = new And(new Not(new Has("shoe")), new Not(new Has("jacket")));
        assertTrue(Coupons.qualifies(rule, leo()), "Not yet: \"not has a shoe and not has a jacket\" applies to Leo's order.");
        assertFalse(Coupons.qualifies(rule, maya()), "Not yet: \"not has a shoe and not has a jacket\" doesn't apply to Maya's order, which has boots.");
        assertFalse(Coupons.qualifies(rule, sam()), "Not yet: \"not has a shoe and not has a jacket\" doesn't apply to Sam's order, which has a jacket.");
    }

    @Test
    void theScreenShowsARuleInWords() {
        Rule trail10 = new And(new TotalOver(50), new Or(new Has("shoe"), new Has("jacket")));
        assertEquals("total over $50 and (has a shoe or has a jacket)", Coupons.describe(trail10), "Not yet: TRAIL10 reads \"total over $50 and (has a shoe or has a jacket)\".");
    }

    @Test
    void aNotIsDescribedToo() {
        assertEquals("has a jacket and not has a bottle", Coupons.describe(new And(new Has("jacket"), new Not(new Has("bottle")))), "Not yet: BOTTLE reads \"has a jacket and not has a bottle\".");
        assertEquals("not (has a shoe or has a jacket)", Coupons.describe(new Not(new Or(new Has("shoe"), new Has("jacket")))), "Not yet: a \"not\" around an \"or\" reads \"not (has a shoe or has a jacket)\".");
    }
}
