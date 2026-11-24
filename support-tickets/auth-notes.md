
# Authentication Notes

## 1. Two-Layer User Model

Our application uses two layers to manage users.

### Supabase Auth (auth.users)

Supabase manages the auth.users table. It stores authentication information such as the user's email, password credentials and unique user ID.

We do not directly manage this table.

### Agents Table (agents)

The agents table belongs to our application. It stores additional information about support agents, such as:

- Agent ID
- Name
- Email
- Role

The important thing is that the ID in the agents table must be the same as the ID of the user created in Supabase Auth.

This connects the authenticated user with their application profile.

## 2. Relationship With Other Tables

Other tables use the agents table to identify users.

- tickets.assigned_to references agents.id.
- ticket_comments.agent_id references agents.id.

This helps us identify which agent is assigned to a ticket and which agent created a comment.

## 3. Email Authentication Settings

The Supabase Email provider is enabled.

The Confirm email setting is turned OFF for development.

This allows a newly registered user to receive a working session immediately without clicking an email confirmation link.

IMPORTANT: Re-enable email confirmation for production.

## 4. Authentication Functions

We will use three main Supabase authentication functions.

### signUp

Creates a new user account using an email address and password.

Example:

supabase.auth.signUp({
  email,
  password,
});

### signInWithPassword

Allows an existing user to log in using their email address and password.

Example:

supabase.auth.signInWithPassword({
  email,
  password,
});

### signOut

Logs out the currently signed-in user.

Example:

supabase.auth.signOut();

## 5. Session

After a successful login, Supabase provides a session containing authentication information.

The Supabase client manages the session and refreshes it when required.

We can check the current session using:

supabase.auth.getSession();

If the session is null, it means nobody is currently signed in.
