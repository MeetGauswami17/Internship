
# Supabase Test Data

This file contains the SQL queries used to insert demo data
into the Supabase database.

## 1. Insert Agents

```sql
INSERT INTO agents (name, email, role)
VALUES
  ('Priya Sharma', 'priya@ticketdesk.dev', 'agent'),
  ('Arjun Mehta', 'arjun@ticketdesk.dev', 'admin');
```

## 2. Insert Tickets

```sql
INSERT INTO tickets (
  customer_name,
  customer_email,
  subject,
  description,
  category,
  priority,
  status
)
VALUES
  (
    'Ravi Kumar',
    'ravi@example.com',
    'Payment charged twice',
    'I was charged two times for the same subscription this month. Please refund one charge.',
    'billing',
    'high',
    'open'
  ),
  (
    'Sneha Patel',
    'sneha@example.com',
    'Cannot upload profile photo',
    'The upload button spins forever and nothing happens when I try to add a profile photo.',
    'technical',
    'medium',
    'open'
  ),
  (
    'Imran Ali',
    'imran@example.com',
    'How do I change my email address?',
    'I want to change the login email for my account but cannot find the setting.',
    'account',
    'low',
    'open'
  );
```

## 3. Expected Results

- Agents table: 2 records
- Tickets table: 3 records

## 4. Verification Queries

```sql
SELECT * FROM agents;

SELECT * FROM tickets;
```
