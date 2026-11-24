
# Authentication Notes

## Redirect Memory Pattern

The protected route uses `useLocation()` to remember the URL the user tried to access.

When a user is not signed in, `AuthedRoute` redirects them to `/login` and passes the attempted location through navigation state:

```tsx
<Navigate
  to="/login"
  replace
  state={{ from: location }}
/>
```

The Login page reads the saved pathname using `useLocation()`.

After successful sign-in or sign-up, the user is redirected to the saved destination. If there is no saved destination, the default route is `/dashboard`.

```tsx
const from =
  location.state?.from?.pathname ?? "/dashboard";

navigate(from, { replace: true });
```

## Authentication Failure Test Log

Run each test and record the actual result.

| Test | Expected result | Actual result |
|---|---|---|
| Wrong password on sign in | Error appears and entered values remain | Not tested |
| Signup with existing email | Supabase error appears | Not tested |
| Sign out, then press browser Back | Protected route redirects to login | Not tested |
| Refresh while signed in | Session remains active without showing login first | Not tested |
| Sign out in another tab, then refresh | Other tab is signed out | Not tested |
| Visit `/dashboard` while signed out | Redirects to `/login` | Not tested |
| Sign in after requesting `/dashboard` | Returns to `/dashboard` | Not tested |

## Notes

- Supabase manages the authentication session.
- `onAuthStateChange` updates the shared AuthContext.
- Components using `useAuth()` receive updated authentication state.
- Protected routes prevent access without a valid session.
