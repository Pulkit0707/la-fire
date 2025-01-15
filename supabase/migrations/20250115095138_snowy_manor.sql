/*
  # Initial Schema Setup for LA Fires Emergency App

  1. New Tables
    - donations
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - amount (numeric)
      - created_at (timestamp)
    - resource_requests
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - resource_type (text)
      - address (text)
      - status (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  amount numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS resource_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  resource_type text NOT NULL,
  address text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all donations"
  ON donations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own donations"
  ON donations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view all resource requests"
  ON resource_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own resource requests"
  ON resource_requests FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);