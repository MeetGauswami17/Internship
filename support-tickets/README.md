# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```


## Screen 2: Agent Authentication

TicketDesk includes an authentication system for support agents.

### Login Screenshots

**Sign In Mode**

Add your sign-in screenshot here:

![Agent Sign In](./screenshots/agent-signin.png)

**Sign Up Mode**

Add your sign-up screenshot here:

![Agent Sign Up](./screenshots/agent-signup.png)

**Signed-In Navbar**

Add your signed-in navbar screenshot here:

![Signed-In Navbar](./screenshots/navbar-signed-in.png)

### How Authentication Works

- When an agent signs up, Supabase Auth creates the user account and the application inserts the agent's name, email, role, and user ID into the `agents` table.
- The `AuthContext` shares the current session and agent profile across the application and listens for authentication changes.
- `AuthedRoute` checks the session before displaying protected pages such as the dashboard and ticket details.
- If a signed-out user tries to open a protected page, they are redirected to the login page. After signing in, they return to the page they originally requested.
- Signing out through Supabase clears the session, updates the shared authentication state, and protects the private routes again.

### Email Confirmation During Development

Email confirmation can be disabled in the Supabase development project to make testing easier. This allows a newly registered agent to receive an active session immediately without first confirming an email address.

For production, enable email confirmation and configure the appropriate email provider and confirmation flow.
