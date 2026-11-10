# Exercise: The Coupon Rules

Exercise code for the lesson **Exercise: The Coupon Rules** in the course *Design Patterns, Demystified* on [ask-codey.com](https://www.ask-codey.com).

## The ticket

> **From:** the marketing team, Trailhead Outfitters
>
> 1. **We want to build our own coupon rules.** The new admin screen lets us snap a rule together from pieces: "total over" an amount, "has a" kind of product (`shoe`, `jacket`, `bottle`, `socks`), and "and", "or" and "not" to join them, in any shape we like. The screen's team builds each rule from the classes `TotalOver`, `Has`, `And`, `Or` and `Not`, and calls `qualifies(rule, order)` to ask whether an order gets the coupon. It has to work for rules nobody has written yet.
> 2. **The screen shows every rule in words**, so we can read what we built: it calls `describe(rule)` and expects text such as `total over $50 and (has a shoe or has a jacket)`, with brackets around an "and" or an "or" inside another piece.
>
> This week's three coupons, TRAIL10, BOTTLE and BOOTS20, are checked at checkout with `check(code, order)`, and they have to keep working exactly as they do.

`qualifies`, `describe` and the five piece classes are already there, because the admin screen's code calls them, but the pieces only hold what marketing picked, and the two functions don't do anything yet.

## Pick your language

The same exercise is here in five languages. Work in the folder for the language you set up; you only need one.

| Folder | The store's code | The tests |
|---|---|---|
| `csharp/` | `CouponRules/Coupons.cs` | `CouponRules.Tests/CouponTests.cs` |
| `java/` | `src/main/java/` (`Coupons.java`, `Rule.java`, the five pieces and the rest) | `src/test/java/CouponTest.java` |
| `python/` | `coupons.py` | `test_coupons.py` |
| `javascript/` | `coupons.js` | `coupons.test.js` |
| `typescript/` | `coupons.ts` | `coupons.test.ts` |

The names follow each language's style: `Coupons.Check`, `Coupons.Qualifies` and `Coupons.Describe` in C#, `Coupons.check`, `Coupons.qualifies` and `Coupons.describe` in Java, and `check`, `qualifies` and `describe` in Python, JavaScript and TypeScript.

Every folder also has a small demo program that checks three customers' orders and one rule marketing built on the screen. You don't need to change the tests or the demo.

## Run it and check your work

Open your language's folder in VS Code (**File > Open Folder**), then open its terminal (**Terminal > New Terminal**) and run these commands there.

**C#**

```bash
dotnet run --project CouponRules
dotnet test
```

**Java** (the Maven Wrapper downloads Maven the first time, so the first run takes a minute)

```bash
java src/main/java/Demo.java
./mvnw test
```

On Windows in PowerShell, write `.\mvnw test` instead of `./mvnw test`.

**Python** (once: make a virtual environment and install pytest into it)

```bash
python -m venv .venv
```

Then turn it on: `.venv\Scripts\Activate.ps1` in PowerShell on Windows, or `source .venv/bin/activate` on macOS (where the command is `python3`, not `python`). Then:

```bash
pip install -r requirements.txt
python demo.py
python -m pytest
```

**JavaScript**

```bash
node demo.js
npm test
```

**TypeScript** (once: `npm install`, which installs TypeScript)

```bash
node demo.ts
npm test
```

At first, 4 tests pass and 4 fail. The 4 that pass are what the store does today: keep them green the whole time, and run the tests after every small change. The 4 that fail are the ticket. A failing test's message starts with **Not yet:** (or **Keep this working:** if you broke something that worked) and says what it expected.

## When you're done

All 8 tests are green, and the demo prints:

```text
Maya: TRAIL10, BOOTS20
Sam: TRAIL10, BOTTLE
Leo: none
New rule: has a bottle and total over $20
Leo qualifies: yes
```

<details>
<summary>Stuck?</summary>

- **For the rules marketing builds:** `check` has one `if` per coupon code, so a rule it has never seen can't work. Give each piece the job of answering "does this order qualify?" itself: a check (`TotalOver`, `Has`) looks at the order, and a join (`And`, `Or`, `Not`) asks the pieces it holds. A rule is then a tree of pieces, and `qualifies` asks the top one (the **Interpreter** pattern). Then this week's three coupons can be trees too, kept in a dictionary from code to rule, so `check` looks one up and asks it. (*Interpreter: A Little Language for Rules*.)
- **For the rule in words:** describing is a second job for every piece. Either give each piece a `describe` method, or put the whole job in one object with a method for each kind of piece, and give each piece an `accept` method that hands itself to it (the **Visitor** pattern). A `switch` on the kind of piece does the same job. (*Visitor: New Jobs Without Touching Every Class*.)

</details>

## Hand it in

When it works, push your solution to a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. The lesson page shows the Git commands, step by step.
