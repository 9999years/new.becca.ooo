---
title: Introduction to functional programming in Java
---

# Introduction to functional programming in Java

**Note:** This article was originally written for a course on Structure and
Interpretation of Computer Programs (SICP).

This is a new piece of documentation, written just for this course, so let me
know if parts of it are unclear to you — or if you like it! Expect to read it
fairly slowly (like any technical writing), and consult the [Java
documentation] if there's methods you don't recognize — though the most
important ones should be linked.

A significant portion of this course is about learning functional programming
techniques; functional programming solves problems very differently from
object-oriented programming (which is what we use when we're writing Java),
and the difference in tactics that functional programming requires combined
with the difference in syntax that Scheme in specific requires can be
challenging to Java programmers.

This reading is optional but recommended — if you find yourself thinking that
you know how to solve a problem in Java but unsure how to solve it in Scheme,
make sure to give it a read!

## Object-oriented programming

> Quick: off the top of your head, what is object-oriented programming about?
>
> Got an idea yet?
>
> If you thought any of the words “[encapsulation]”, “[inheritance]”,
> “[polymorphism]”, “[information hiding]”, “[abstraction]”, or “[vtables]”,
> you are *wrong.*
>
> If you thought any of the words “[class]”, “[prototype]”, or “[type]”, you
> are *still wrong.*
>
> **Object-oriented programming is about *objects*: bundles of state and
> behavior.** The rest is optional fluff. And object-oriented *languages* are
> defined only by having built-in support for bundling state and behavior,
> *not* by having built-in support for classes. You may notice we don’t call it
> “class-oriented programming”.
>
> — [“The controller pattern is awful (and other OO heresy)” by Eevee][eevee_oo]

Let's make this clear with some Java code. Here's a simple `Point` class, which
represents a point in 2-dimensional space with `double` coordinates.

```java
public class Point {
    public double x;
    public double y;
}
```

This [class] is a bundle of *state*; the state of an object is what the *is*;
here, the state is its coordinates. We can make `Point`s, modify them, and pass
them around, but they don't *do* anything.

```java
Point p = new Point();
p.x = 1;
p.y = 3;
System.out.println("p.x = " + p.x);
System.out.println("p.y = " + p.y);
```

Let's give our `Point` some behavior, with a `rotate` method, which will
calculate the new coordinates using the 2-dimensional [rotation matrix]:

```java
import java.lang.Math;

public class Point {
    public double x;
    public double y;

    Point(double x, double y) {
        this.x = x;
        this.y = y;
    }

    void rotate(double radians) {
        double newX = x * Math.cos(radians) - y * Math.sin(radians);
        double newY = x * Math.sin(radians) + y * Math.cos(radians);
        this.x = newX;
        this.y = newY;
    }

    @Override
    public String toString() {
        return "Point(" + x + ", " + y +")";
    }
}
```

Now we can make and modify `Point`s (just like before), but `Point`s also
inherently *know how to do something*: rotate!

```java
Point p = new Point(1, 3);
System.out.println("p = " + p);
p.rotate(Math.PI / 2); // 90° CCW
System.out.println("p = " + p);
```

Prints `p = Point(1.0, 3.0)`, and then `p = Point(-3.0, 1.0000000000000002)`
(because [`double`s round in strange ways][floating point rounding]). Now we
have an *object*, with *state* (what it is; the `x` and `y` coordinates) and
*behavior* (what it can *do*; rotate).

## Mutation

The `rotate` method we made is particularly interesting, because it returns
`void`, storing its result in its own data. We call it **mutation** when the
state of an object is changed.

This can either be problematic (now, if we pass a `Point` to some method, we
don't have any guarantee that the `Point` won’t be changed by the method, which
bites each new programmer *at least* once) or advantageous (we can easily give
other methods the power to change the objects we care about by mutating them).

One thing, however, is certain: when we add mutability to our objects, our
program becomes more complex. What if methods never mutated objects? Functional
programming advocates say that objects which *can't* be mutated (*immutable*
objects) are simpler to reason about and program with, because we never have to
account for data changing without us knowing about it.

Functions which don't mutate data or cause other side-effects (like modifying
files, printing data, or making network requests) are called *pure*. Let's
rewrite our `rotate` method to be pure:

```java
Point rotate(double radians) {
    return new Point(
            x * Math.cos(radians) - y * Math.sin(radians),
            x * Math.sin(radians) + y * Math.cos(radians)
        );
}
```

The change is pretty minimal. Now, we can use it like this:

```java
Point p = new Point(1, 3);
System.out.println("p = " + p);
System.out.println("rotated = " + p.rotate(Math.PI / 2)); // 90° CCW
System.out.println("p = " + p);
```

which prints

```plain
p = Point(1.0, 3.0)
rotated = Point(-3.0, 1.0000000000000002)
p = Point(1.0, 3.0)
```

## Composing functions together

When a program is made up entirely of pure functions, it can be easier to read,
write, and understand the code.

Suppose we have a list of points represented as a string, like this:

<!-- Generated with this Mathematica code:
     4 {N[Sin[#]], N[Cos[#]]} & /@ Range[1, 8, Pi/8]
-->

```plain
3.36588,2.16121 3.93673,0.708629 3.90825,-0.851834 3.28476,-2.28261
2.16121,-3.36588 0.708629,-3.93673 -0.851834,-3.90825 -2.28261,-3.28476
-3.36588,-2.16121 -3.93673,-0.708629 -3.90825,0.851834 -3.28476,2.28261
-2.16121,3.36588 -0.708629,3.93673 0.851834,3.90825 2.28261,3.28476
3.36588,2.16121 3.93673,0.708629
```

That is, points are separated by space characters, and coordinates within a
point are separated by a comma.

Here’s how an introductory Java programmer might try to parse the string into a
list of `Point` objects:

```java
public static List<Point> parsePoints(String str) {
    try (Scanner scanner = new Scanner(str)) {
        ArrayList<String> pointStrings = new ArrayList<>();
        while (scanner.hasNext()) {
            pointStrings.add(scanner.next());
        }

        ArrayList<Point> points = new ArrayList<>();
        for (int i = 0; i < pointStrings.size(); i++) {
            String[] numbers = pointStrings.get(i).split(",");
            double x = Double.parseDouble(numbers[0]);
            double y = Double.parseDouble(numbers[1]);
            points.add(new Point(x, y));
        }

        return points;
    }
}
```

This implementation of `parsePoints` *works* fine, but it's got some problems.

1. We use too much data; first, we split `str` by whitespace with the `Scanner`
   and store it in `pointStrings`, which uses almost as much data as storing
   `str` originally did. Then, the very next thing we do is throw it all out
   after we make `points`.
2. The code isn't very clear; we build up `pointStrings` from the `Scanner`, we
   go through `pointStrings` again, then there's... indexes into the `numbers`
   array? It's weird, and if someone passed bad data to this method, they'd
   probably be confused to get an `ArrayIndexOutOfBoundsException`.

But, under the hood, we're only really *doing* a few things:

1. Splitting `str` by whitespace.
2. Splitting the resulting strings by commas.
3. Parsing all the elements as `double`s.
4. Turning the parsed `double`s into `Point`s.

Note that each operation here goes directly to the next operation. With that in
mind, let's split up our `parsePoints` method a bit:

```java
static String[] splitWhitespace(String str) {
    return str.split("\\s+");
}

static String[] splitCommas(String str) {
    return str.split(",");
}

static List<Double> parseDoubles(String[] strs) {
    ArrayList<Double> doubles = new ArrayList<>();
    for (String str : strs) {
        doubles.add(Double.parseDouble(str));
    }
    return doubles;
}

static Point toPoint(List<Double> doubles) {
    return new Point(doubles.get(0), doubles.get(1));
}

public static List<Point> parsePoints(String str) {
    String[] coords = splitWhitespace(str);

    ArrayList<String[]> splitByCommas = new ArrayList<>();
    for (String coord : coords) {
        splitByCommas.add(splitCommas(coord));
    }

    ArrayList<List<Double>> doubles = new ArrayList<>();
    for (String[] doubleStrings : splitByCommas) {
        doubles.add(parseDoubles(doubleStrings));
    }

    ArrayList<Point> points = new ArrayList<>();
    for (List<Double> rawPoint : doubles) {
        points.add(toPoint(rawPoint));
    }

    return points;
}
```

This code is a bit clearer, but it's much longer. Further, astute readers might
have noticed that this pattern is repeated several times:

```java
ArrayList<NewType> newList = new ArrayList<>();
for (OldType element : oldList) {
    newList.add(oldTypeToNewType(element));
}
```

That is, building up a list by calling a method on every element of another
list. Functional programmers have a name for this operation, and it's called
*mapping* a list, because it shows you a *map* from a list of one type to a
list of another type.

What do we know about the method `oldTypeToNewType`? It must look something
like this, because it has one parameter of type `OldType` and returns a value
of type `NewType`:

```java
NewType oldTypeToNewType(OldType o) {
    // ...
}
```

Java actually already includes this as an interface called [`Funtion<T,
R>`][function-class], where `T` is `OldType` (the function's input) and `R` is
`NewType` (the function's return-type). With that in mind, let's write a
`mapList` function that turns a list of `T` into a list of `R`:

```java
static <T, R> List<R> mapList(List<T> input, Function<T, R> mappingFunction) {
    ArrayList<R> ret = new ArrayList<>();
    for (T t : input) {
        ret.add(mappingFunction.apply(t));
    }
    return ret;
}
```

Then, we can create classes to call `mapList` with. For example, here's
`parseDoubles` using `mapList`:

```java
static List<Double> parseDoubles(String[] strs) {
    return mapList(Arrays.asList(strs), new Function<String, Double>() {
        @Override
        public Double apply(String s) {
            return Double.parseDouble(s);
        }
    });
}
```

The syntax [`new Function<...>() { ... }`][anonymous class] is just like
declaring `class MyClass<...> implements Function<...> { ... }` and then
constructing it exactly once. Fortunately, Java gives us shorter syntax for any
[functional interface], which represents the exact same thing:

```java
static List<Double> parseDoubles(String[] strs) {
    return mapList(Arrays.asList(strs), s -> Double.parseDouble(s));
}
```

This shortcut is called a *[lambda expression]*. Further, it turns out that the
pattern of writing lambdas of the form `var -> MyClass.method(var)` is so
common there's another special syntax for it, called *[method references]*,
which look like `MyClass::method` (in this case, `Double::parseDouble`):

```java
static List<Double> parseDoubles(String[] strs) {
    return mapList(Arrays.asList(strs), Double::parseDouble);
}
```

Now, we can rewrite our `Point` parser using `mapList`:

```java
public static List<Point> parsePoints(String str) {
    String[] coords = splitWhitespace(str);
    List<String[]> splitByCommas = mapList(Arrays.asList(coords), PointParser::splitCommas);
    List<List<Double>> doubles = mapList(splitByCommas, PointParser::parseDoubles);
    return mapList(doubles, PointParser::toPoint);
}
```

Much better! This code is very declarative: we write what we mean. First, we
split by whitespace. Then, we split by commas. Then, we parse as doubles. Then,
we map to points.

This is still fairly wasteful in terms of memory, though — we create not just
one but *three* intermediate lists, each of which gets discarded after being
used only once.

We can solve this problem with a [**stream**][stream] (sometimes called a *lazy
iterator*). Streams are specifically designed to be composable with functions,
so that we can generate a stream from some source (like reading from a file,
finding matches in a string, or more traditionally from some data structure
like an array or tree) and then specify that it be mapped over in various ways.

Unlike our `mapList` function, mapping over a stream doesn't read any data from
the underlying source; it just writes down a note saying the stream is also
being mapped over by a particular value. Therefore, we don't need to generate
any intermediate lists — we can just add our mapping functions one by one, and
the stream remembers how to transform its data before using it when we start
reading values from the stream.

And how do we read values from a stream? Unlike arrays or other simple data
structures, streams are designed to let us ask more questions than just “what
element is at index *i* in this structure?” Streams have methods that let us ask:

- Does this function return `true` when applied to every element in the stream?
- Does the stream have at least *n* items?
- Find the first element in the stream that this function returns `true` for.
- What's the maximum value in the stream?
- Collect the values in this stream (to an `ArrayList`, a `HashMap`, a
  `String`, etc.).

We can generate streams a few different ways in Java, but for the most part the
`Arrays.stream` method, the `Collection.stream` method, and the `Collectors`
methods are suitable for converting most data to and from streams.

Rewriting the point parser with `Stream`s, we get:

```java
public class PointParser {
    static final Pattern COMMA = Pattern.compile(",");
    static final Pattern WHITESPACE = Pattern.compile("\\s+");

    static Point toPoint(Iterator<Double> doubles) {
        return new Point(doubles.next(), doubles.next());
    }

    public static List<Point> parsePoints(String str) {
        return WHITESPACE.splitAsStream(str)  // (1)
            .map(s -> COMMA.splitAsStream(s)  // (2)
                    .map(Double::parseDouble)
                    .iterator())              // (3)
            .map(PointParser::toPoint)
            .collect(Collectors.toList());    // (4)
    }
}
```

Notes:

1. The [`Pattern.splitAsStream`][Pattern.splitAsStream] method is exactly like
   [`String.split`][String.split] except it returns a `Stream` instead of an
   array.

2. Inside one of our calls to `map`, we create *another* `Stream`; streams work
   best together!

   These calls to `map` don't actually get items out of the stream; they're
   *lazy*, and all they do is make the stream remember that it's mapping by
   that function.

3. The call to `iterator` turns a `Stream` into an `Iterator`; it's a
   *finalizing* operation, which means that it consumes the elements of the
   stream and returns a result. Once we have an `Iterator`, we can't `map` on
   it any more.

4. Finally, we *collect* the elements of the stream into a `List` with the
   `collect` method and the `Collectors.toList()` utility method.

This code is (I think) much clearer than our first attempt, and a bit shorter
as an extra bonus. I'll admit that code writtten with streams can look a bit
alien at first, and it takes some practice to get used to!

In this code, we don't use a single index or `for` loop — and why should we?
After all, none of the operations need to know anything about the elements
before or after them; the indexes were only to overcome limitations in the ways
we can refer to data structures.

Additionally, no intermediate lists are created; when the stream is being
collected, each element from the pattern-splitter is applied to all our mapping
functions in a row before being returned. The *processing* steps aren't
separated from each other, which saves memory, even though we were able to
*declare* the processing steps separately. In APIs focused on streams, it's
often easier to return (and take as parameters) streams themselves, rather than
frequently collecting data to structures like lists at method boundaries.

There's another advantage of this style of programming, in addition to saving
memory; because we never reassign values, the functions are immutable and pure.
In Java, we're not inherently motivated to write pure functions. But in other
languages (notably pure functional programming languages like Haskell, or other
functional programming languages like Scheme), we're *forced* to write pure
functions; learning to construct pure functions and immutable data structures
will help you reason about and solve problems in a functional programming style.

[eevee_oo]: https://eev.ee/blog/2013/03/03/the-controller-pattern-is-awful-and-other-oo-heresy/
[encapsulation]: https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)
[inheritance]: https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)
[polymorphism]: https://en.wikipedia.org/wiki/Polymorphism_(computer_science)
[information hiding]: https://en.wikipedia.org/wiki/Information_hiding
[abstraction]: https://en.wikipedia.org/wiki/Abstraction_(computer_science)
[vtables]: https://en.wikipedia.org/wiki/Virtual_method_table
[class]: https://en.wikipedia.org/wiki/Class_(computer_programming)
[prototype]: https://en.wikipedia.org/wiki/Prototype-based_programming
[type]: https://en.wikipedia.org/wiki/Data_type
[rotation matrix]: https://en.wikipedia.org/wiki/Rotation_matrix
[floating point rounding]: https://0.30000000000000004.com/
[function-class]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/function/Function.html
[functional interface]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/lang/FunctionalInterface.html
[anonymous class]: https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html
[lambda expression]: https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html
[method references]: https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html
[stream]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/stream/Stream.html
[iterator]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/Iterator.html
[Pattern.splitAsStream]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#splitAsStream(java.lang.CharSequence)
[String.split]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/lang/String.html#split(java.lang.String)
[Java documentation]: https://docs.oracle.com/en/java/javase/12/docs/api/
