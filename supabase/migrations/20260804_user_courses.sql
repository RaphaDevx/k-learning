-- Allow users to create their own courses in k_courses
-- created_by = NULL → admin/global course (visible to all)
-- created_by = user_id → personal course (only visible to creator)

ALTER TABLE k_courses ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users DEFAULT NULL;

-- Drop old permissive select policy and replace with one that hides other users' private courses
DROP POLICY IF EXISTS "k_courses_select" ON k_courses;
DROP POLICY IF EXISTS "Allow read access to all" ON k_courses;

CREATE POLICY "k_courses_select" ON k_courses
  FOR SELECT USING (created_by IS NULL OR created_by = auth.uid());

-- Allow authenticated users to insert their own courses
DROP POLICY IF EXISTS "k_courses_insert" ON k_courses;
CREATE POLICY "k_courses_insert" ON k_courses
  FOR INSERT WITH CHECK (created_by = auth.uid());

-- Allow users to update their own courses
DROP POLICY IF EXISTS "k_courses_update" ON k_courses;
CREATE POLICY "k_courses_update" ON k_courses
  FOR UPDATE USING (created_by = auth.uid());

-- Allow users to delete their own courses
DROP POLICY IF EXISTS "k_courses_delete" ON k_courses;
CREATE POLICY "k_courses_delete" ON k_courses
  FOR DELETE USING (created_by = auth.uid());
