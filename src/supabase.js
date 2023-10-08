import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ajqgsxepjvzuqdilghza.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqcWdzeGVwanZ6dXFkaWxnaHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0NzI5MTMsImV4cCI6MjAxMTA0ODkxM30.vAR3CekgR5fpqs2oPNCH-W0JGNZtE55mSno464TDoOE'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
