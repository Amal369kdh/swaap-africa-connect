import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Flame, Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import swaapLogo from "@/assets/swaap-logo.jpeg";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: displayName },
          },
        });
        if (error) throw error;
        toast({
          title: "Compte créé !",
          description: "Vérifie ton email pour confirmer ton inscription, ou connecte-toi directement.",
        });
        setIsLogin(true);
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background african-pattern-bg flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex h-14 items-center gap-3 px-4">
          <Link to="/" className="rounded-full bg-muted p-2 hover:bg-muted/80 transition-colors">
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </Link>
          <div className="flex items-center gap-2">
            <img src={swaapLogo} alt="Swaap" className="h-8 w-8 rounded-full object-cover" />
            <span className="font-display text-sm font-bold text-gradient-swaap">SWAAP</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <Flame className="h-10 w-10 text-primary mx-auto animate-pulse-glow" />
            <h1 className="font-display text-lg font-bold text-gradient-swaap">
              {isLogin ? "Connexion" : "Inscription"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Content de te revoir !" : "Rejoins la communauté Swaap"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Nom d'affichage</label>
                <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Samba Diallo"
                    className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground/60"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground/60"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Mot de passe</label>
              <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground/60"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 glow-orange"
            >
              {loading ? "Chargement..." : isLogin ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-semibold hover:underline"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Auth;
