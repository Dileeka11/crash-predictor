import { Car } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Car className="h-4 w-4 text-primary" />
            <span>for road safety</span>
          </div>



          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CrashPredict.  Made with Dileeka Supun.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
