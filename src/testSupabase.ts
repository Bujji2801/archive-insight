
import { supabase } from './lib/supabaseClient';

async function testFetch() {
    console.log("Testing Supabase connection...");
    const { data, error } = await supabase.from('projects').select('*');
    if (error) {
        console.error("❌ Error fetching projects:", error);
    } else {
        console.log(`✅ Success! Found ${data.length} projects.`);
        if (data.length > 0) {
            console.log("Sample project:", data[0]);
        }
    }
}

testFetch();
