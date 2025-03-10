---
description: Commit Message Guidelines
---
# Commit Message Guidelines

These guidelines provide a clear, structured approach that's easy to follow while maintaining consistency across all commit messages.

## Format

```md
<type>(<scope>): <subject>

[optional body]
```
___

## Types
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `style`: Changes that do not affect the meaning of the code (formatting, etc)
- `docs`: Documentation only changes
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

## Scope
- Optional but recommended
- Should be a brief descriptor of the affected area (e.g., db, auth, ui)

## Subject
- Use imperative, present tense ("add" not "added" or "adds")
- Don't capitalize first letter
- No period (.) at the end
- Keep it under 50 characters
- Be clear and descriptive

## Body (Optional)
- Use bullet points for multiple changes
- Each point should start with a hyphen (-)
- Keep points concise and clear
- Separate from subject with a blank line

___

## Examples

```md
feat(auth): add JWT authentication
```

```md
fix(db): database reset script and add MainMenu mock data
- Fix global data clearing in reset-db script
- Add mock data for seeding MainMenu global
```

```md
refactor(ui): improve user interface
- Refactor login form to use new design system
- Add validation for email and password fields
```

```md
refactor(api): simplify error handling in user routes
```
