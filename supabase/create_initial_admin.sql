-- ==============================================================================
-- INSTRUCTION TO CREATE THE INITIAL AUTHORIZED ADMINISTRATOR
-- ==============================================================================
-- 1. Sign up a user in Supabase Auth via your Supabase Studio Dashboard (Authentication -> Users -> Add User)
--    or using the /admin/login page if email signup is permitted in your Supabase project.
-- 2. Copy the UUID of that created user.
-- 3. Run the following SQL statement in the Supabase SQL Editor:

-- Replace 'YOUR_USER_UUID_HERE' with the actual user UUID from auth.users:
/*
INSERT INTO public.administrators (user_id, role)
VALUES ('YOUR_USER_UUID_HERE', 'admin')
ON CONFLICT (user_id) DO NOTHING;
*/
