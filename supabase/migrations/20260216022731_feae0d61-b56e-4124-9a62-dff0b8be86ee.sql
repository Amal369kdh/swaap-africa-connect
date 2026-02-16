
-- Table de configuration globale de la plateforme (phase, seuils KPI, alertes)
CREATE TABLE public.platform_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  current_phase integer NOT NULL DEFAULT 1 CHECK (current_phase IN (1, 2, 3)),
  alert_threshold_users integer NOT NULL DEFAULT 100,
  alert_threshold_credits integer NOT NULL DEFAULT 500,
  alert_threshold_annonces integer NOT NULL DEFAULT 50,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.platform_config ENABLE ROW LEVEL SECURITY;

-- Everyone authenticated can read platform config
CREATE POLICY "Authenticated users can read platform config"
ON public.platform_config
FOR SELECT
USING (auth.role() = 'authenticated');

-- Only admins can update
CREATE POLICY "Admins can update platform config"
ON public.platform_config
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can insert
CREATE POLICY "Admins can insert platform config"
ON public.platform_config
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert default config row
INSERT INTO public.platform_config (current_phase, alert_threshold_users, alert_threshold_credits, alert_threshold_annonces)
VALUES (1, 100, 500, 50);

-- Trigger for updated_at
CREATE TRIGGER update_platform_config_updated_at
BEFORE UPDATE ON public.platform_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
