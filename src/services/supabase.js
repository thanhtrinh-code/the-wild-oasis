
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://lvnldnrdcckrkxfbibjo.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2bmxkbnJkY2Nrcmt4ZmJpYmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4ODUyMjUsImV4cCI6MjAzNzQ2MTIyNX0.AkuXXRrE5B9ZAtHaoDErWGI0jNv5g04KiiF7q1DDBbU"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;