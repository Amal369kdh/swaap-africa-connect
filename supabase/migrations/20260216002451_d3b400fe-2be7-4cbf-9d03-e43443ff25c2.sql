
-- Create annonces table for troc system
CREATE TABLE public.annonces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'autre',
  image_url TEXT DEFAULT NULL,
  exchange_for TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.annonces ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can view active annonces
CREATE POLICY "Authenticated users can view active annonces"
ON public.annonces FOR SELECT
USING (auth.role() = 'authenticated');

-- Users can create their own annonces
CREATE POLICY "Users can create their own annonces"
ON public.annonces FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own annonces
CREATE POLICY "Users can update their own annonces"
ON public.annonces FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own annonces
CREATE POLICY "Users can delete their own annonces"
ON public.annonces FOR DELETE
USING (auth.uid() = user_id);

-- Auto-update updated_at
CREATE TRIGGER update_annonces_updated_at
BEFORE UPDATE ON public.annonces
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
