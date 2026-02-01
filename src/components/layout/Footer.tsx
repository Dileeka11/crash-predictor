import { Heart, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-destructive fill-destructive" />
            <span>for road safety</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <a
              href="#"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>Source</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>API Docs</span>
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CrashPredict. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
