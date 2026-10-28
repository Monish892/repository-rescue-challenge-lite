# Team workflow

1. Update main with git pull --ff-only before creating a feature branch.
2. Work on a named feature branch; keep changes focused.
3. Review generated code for correctness, configuration, and secret exposure.
4. Run the automated checks and inspect git diff before committing.
5. Use meaningful commit messages and request review before merging.
6. Keep .env local and update .env.example and config/environment.md together.
7. Merge the tested branch into main; never force-push shared history.
