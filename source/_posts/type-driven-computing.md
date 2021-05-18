---
title: type-driven computing
description: towards a more cohesive computing experience
draft: true
---

# Type-Driven Computing

I really like command line user interfaces. I think they live up to a sort of
*conversationality* that computing often lacks. In the [desktop
metaphor][desktop-metaphor], stacked GUI windows often feel like a clutter of
unorganized papers, whereas the command line --- at its best --- presents an
ordered ledger of queries and responses.

But the command line hasn't really grown with us. Instead, it's been left to
linger, forever emulating [the VT100][vt100] --- state of the art, for 1978.
I'm pretty frustrated with that, and though I'm hardly the first (Gary
Bernhardt explores some similar ideas in his 2012 talk ["A Whole New
World][a-whole-new-world]), I often feel like the people I talk to,
technically-inclined or not, don't really understand what I'm thinking about
when I talk about the ways computers fail me.

Therefore, here are some ideas I have for a better command line. Let's
establish some scope and basic points first:

- Backwards compatibility isn't a concern here. I'm not presenting a business
  plan, I'm presenting a vision. I'm not interested in the implementation, how
  to build an ecosystem around this concept, the way capitalism would hinder my
  concepts, or anything else. I *know* why these systems don't exist. Let
  yourself imagine, just for a bit, that we could truly build something new.

- The vision is inspired by command lines and type systems, but stretches
  beyond a single terminal program. Ultimately, I'm talking about a different
  way to *use* and *interact with* computers. As with all things in
  computation, this idea works better the more tightly it's integrated with its
  surroundings.

- I am uninterested in the grid-of-characters model for terminals. I don't
  believe the properties it offers are worth the drawbacks.

## Programs as types

When we run a command line program, we're usually constructing an instance of a
*type* representing the invocation we want.

To make this concrete, let's think of a program as a sum type, where each
subcommand corresponds to a variant. With `git`, for example, we can run the
`status` or `commit` subcommands, but we can only choose one at a time:

```bash
git status
git commit
```

These correspond to variants of a sum type (tagged union). These sum types can
be nested, even, for sub-subcommands and more:

```bash
git remote add ...
git remote set-url ...
```

For product types (records/structs), we have options/flags, which have a long
form (like `--long`, or `--untracked-files`) and sometimes a short form (like
`-u`), along with a variety of conventions for boolean switches, reading
options from files, and so on.

Writing the type out explicitly in Rust syntax looks kinda like this:

```rust
// Git is run by specifying an (optional) command and other configuration:
struct Git {
    command: Option<Command>,
    configuration: Configuration,
}

// We have some common options for any `git` command:
struct Configuration {
    exec_path: Directory,
    paginate: bool,
    work_tree: Directory,
    // ...
}

// Then, individual commands have their own options and subcommands:
enum Command {
    Add {
        verbose: bool,
        dry_run: bool,
        interactive: bool,
        // ...
    },
    Remote {
        Add { /* More configuration options... */ },
        Rename { /* ... */ },
        // ...
    }
    // ...
}
```

And we have ways of setting up this sort of type system, either by writing a
type directly (like Rust's [structopt][structopt]) or by setting the
subcommands and constraints directly (like Python's [argparse][argparse]).

And then... we throw all that information away and write completely separate
tab-completion scripts for various shells, which are usually pretty bad.

Although we have a pretty consistent system for understanding command line
arguments as types, both as users and as programmers, the actual user
interface, the shell, has *no knowledge* of this system whatsoever --- which is
a shame because it keeps us from applying the tools we've built for creating
and filling out forms and other sorts of records to the problem of running
programs.

## Building usability and documentation into the system

What could a shell with a canonical view of this type information do?

When you're thinking about it, don't imagine an extra step of processing, like
the [fish shell][fish-shell] parsing man pages to find command line arguments
for programs that bother to distribute a man page. That's a bolted-on solution.
A hack. It works decently in an environment filled with legacy programs, but
we're not worrying about that right now. Instead, imagine if the command line
interface and the longer-form man page documentation came from the same source
of truth in the program, guaranteeing that they never fall out of sync, because
adding an option to the program and adding it to the documentation are the
*same* action.

[desktop-metaphor]: https://en.wikipedia.org/wiki/Desktop_metaphor
[vt100]: https://en.wikipedia.org/wiki/VT100
[a-whole-new-world]: https://www.destroyallsoftware.com/talks/a-whole-new-world
[structopt]: https://docs.rs/structopt/
[argparse]: https://docs.python.org/3/library/argparse.html
[fish-shell]: https://fishshell.com/
