using CouponRules;

namespace CouponRules.Tests;

// The tests for your code. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.

[TestClass]
public class CouponTests
{
    private static Order Maya() => new Order("Maya", Catalog.HikingBoots, Catalog.TrailSocks);
    private static Order Sam() => new Order("Sam", Catalog.RainJacket);
    private static Order Leo() => new Order("Leo", Catalog.WaterBottle, Catalog.TrailSocks);

    // What the store does today. These pass before you change anything: keep them passing.

    [TestMethod]
    public void Trail10NeedsOverFiftyDollarsAndAShoeOrAJacket()
    {
        Assert.IsTrue(Coupons.Check("TRAIL10", Maya()), "Keep this working: TRAIL10 applies to Maya's $132 order with hiking boots.");
        Assert.IsTrue(Coupons.Check("TRAIL10", Sam()), "Keep this working: TRAIL10 applies to Sam's $80 order with a rain jacket.");
        Assert.IsFalse(Coupons.Check("TRAIL10", Leo()), "Keep this working: TRAIL10 doesn't apply to Leo's $27 order, with no shoe or jacket.");
    }

    [TestMethod]
    public void BottleNeedsAJacketAndNoBottle()
    {
        Assert.IsTrue(Coupons.Check("BOTTLE", Sam()), "Keep this working: BOTTLE applies to Sam's order: a jacket and no bottle.");
        Assert.IsFalse(Coupons.Check("BOTTLE", Maya()), "Keep this working: BOTTLE doesn't apply to Maya's order: no jacket.");
        Assert.IsFalse(Coupons.Check("BOTTLE", new Order("Dana", Catalog.RainJacket, Catalog.WaterBottle)), "Keep this working: BOTTLE doesn't apply to an order that already has a bottle.");
    }

    [TestMethod]
    public void Boots20NeedsAShoeAndOverOneHundredDollars()
    {
        Assert.IsTrue(Coupons.Check("BOOTS20", Maya()), "Keep this working: BOOTS20 applies to Maya's $132 order with hiking boots.");
        Assert.IsFalse(Coupons.Check("BOOTS20", Sam()), "Keep this working: BOOTS20 doesn't apply to Sam's order: no shoe.");
    }

    [TestMethod]
    public void ACodeNobodyKnowsAppliesToNoOne()
    {
        Assert.IsFalse(Coupons.Check("HALFOFF", Maya()), "Keep this working: a code the store doesn't have applies to nobody.");
    }

    // The ticket's new requirements. These fail until the work is done.

    [TestMethod]
    public void ARuleFromTheAdminScreenIsChecked()
    {
        Rule rule = new And(new Has("bottle"), new TotalOver(20));
        Assert.IsTrue(Coupons.Qualifies(rule, Leo()), "Not yet: \"has a bottle and total over $20\" applies to Leo's $27 order with a water bottle.");
        Assert.IsFalse(Coupons.Qualifies(rule, Sam()), "Not yet: \"has a bottle and total over $20\" doesn't apply to Sam's order: no bottle.");
    }

    [TestMethod]
    public void PiecesCombineInShapesNobodyPlanned()
    {
        Rule rule = new And(new Not(new Has("shoe")), new Not(new Has("jacket")));
        Assert.IsTrue(Coupons.Qualifies(rule, Leo()), "Not yet: \"not has a shoe and not has a jacket\" applies to Leo's order.");
        Assert.IsFalse(Coupons.Qualifies(rule, Maya()), "Not yet: \"not has a shoe and not has a jacket\" doesn't apply to Maya's order, which has boots.");
        Assert.IsFalse(Coupons.Qualifies(rule, Sam()), "Not yet: \"not has a shoe and not has a jacket\" doesn't apply to Sam's order, which has a jacket.");
    }

    [TestMethod]
    public void TheScreenShowsARuleInWords()
    {
        Rule trail10 = new And(new TotalOver(50), new Or(new Has("shoe"), new Has("jacket")));
        Assert.AreEqual("total over $50 and (has a shoe or has a jacket)", Coupons.Describe(trail10), "Not yet: TRAIL10 reads \"total over $50 and (has a shoe or has a jacket)\".");
    }

    [TestMethod]
    public void ANotIsDescribedToo()
    {
        Assert.AreEqual("has a jacket and not has a bottle", Coupons.Describe(new And(new Has("jacket"), new Not(new Has("bottle")))), "Not yet: BOTTLE reads \"has a jacket and not has a bottle\".");
        Assert.AreEqual("not (has a shoe or has a jacket)", Coupons.Describe(new Not(new Or(new Has("shoe"), new Has("jacket")))), "Not yet: a \"not\" around an \"or\" reads \"not (has a shoe or has a jacket)\".");
    }
}
