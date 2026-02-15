import Header from "@/components/Header";
import AnimatedLogo from "@/components/AnimatedLogo";
import NotificationBanner from "@/components/NotificationBanner";
import LigueDesNations from "@/components/LigueDesNations";
import RadarProximite from "@/components/RadarProximite";
import DonsSolidarite from "@/components/DonsSolidarite";
import ProgressionUser from "@/components/ProgressionUser";
import PassMatchBoost from "@/components/PassMatchBoost";

const Index = () => {
  return (
    <div className="min-h-screen bg-background african-pattern-bg">
      <Header />

      <main className="container px-4 py-6 space-y-6">
        {/* Animated central logo */}
        <section className="animate-fade-in">
          <AnimatedLogo />
        </section>

        {/* Notification banner */}
        <section className="animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <NotificationBanner />
        </section>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
            <LigueDesNations />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
            <RadarProximite />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
            <DonsSolidarite />
          </div>
          <div className="animate-fade-in md:col-span-1" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <ProgressionUser />
          </div>
          <div className="animate-fade-in md:col-span-1 lg:col-span-2" style={{ animationDelay: "0.7s", opacity: 0 }}>
            <PassMatchBoost />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
