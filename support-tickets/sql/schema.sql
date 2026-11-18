
-- 1. Agents Table
create table agents (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null,
    role text not null
);

-- 2. Tickets Table
create table tickets (
    id uuid primary key default gen_random_uuid(),
    customer_name text not null,
    customer_email text not null,
    subject text not null,
    description text not null,
    category text not null,
    priority text not null,
    status text not null,
    assigned_to uuid references agents(id),
    created_at timestamp not null default now()
);

-- 3. Ticket Comments Table
create table ticket_comments (
    id uuid primary key default gen_random_uuid(),
    ticket_id uuid not null references tickets(id),
    agent_id uuid references agents(id),
    comment text not null,
    created_at timestamp not null default now()
);

-- 4. AI Logs Table
create table ai_logs (
    id uuid primary key default gen_random_uuid(),
    ticket_id uuid not null references tickets(id),
    ai_category text not null,
    ai_priority text not null,
    ai_reasoning text not null,
    created_at timestamp not null default now()
);
