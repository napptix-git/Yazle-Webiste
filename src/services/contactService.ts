
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type ContactSubmission = Database['public']['Tables']['contact_submissions']['Insert'];

export const submitContactForm = async (data: ContactSubmission) => {
  console.log('Attempting to submit contact form with data:', data);
  
  try {
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([data])
      .select();

    if (error) {
      console.error('Contact form submission error:', error);
      throw new Error(`Failed to submit contact form: ${error.message}`);
    }

    console.log('Contact form submitted successfully:', result);
    return result;
  } catch (error) {
    console.error('Unexpected error during form submission:', error);
    throw error;
  }
};
