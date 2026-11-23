# OpenChamber worktree demo

A small Node.js and PostgreSQL project for checking independent Git worktree
environments. Each worktree has its own database volume and Compose network.

```sh
sh .openchamber/dev start
sh .openchamber/dev runtime
sh .openchamber/dev build
sh .openchamber/dev test
sh .openchamber/dev stop
```

The test writes the worktree identifier to PostgreSQL and to a local file.
Run it in two worktrees to check that each sees its own data. The stop
command keeps the worktree database volume for a later start.
