
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ikwytehkerkeavqfdilc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlrd3l0ZWhrZXJrZWF2cWZkaWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NTk4ODYsImV4cCI6MjA4NjMzNTg4Nn0.heRpgfAO0cTbA1209pHt9nJyrGWS8jGiQJcxyUTCbFs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log("Testing connection...");
    // Try to fetch one project
    const { data, error } = await supabase.from('projects').select('*').limit(1);

    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Success! Data:", data);
    }
}

test();
