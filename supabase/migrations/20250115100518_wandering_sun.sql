/*
  # Enable Anonymous Authentication

  1. Changes
    - Enable anonymous authentication for the project
    - Add necessary security policies for anonymous users
*/

-- Enable anonymous authentication
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access to donations table for viewing
CREATE POLICY "Anonymous users can view donations"
  ON donations FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous access to resource_requests table for viewing
CREATE POLICY "Anonymous users can view resource requests"
  ON resource_requests FOR SELECT
  TO anon
  USING (true);