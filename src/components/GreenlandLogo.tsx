import { Link } from "react-router-dom";

const GreenlandLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      {/* Logo Icon - Buildings with golden leaves in green circle */}
      <div className="relative w-11 h-11">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {/* Background circle */}
          <circle cx="30" cy="30" r="28" fill="hsl(150, 35%, 30%)" />
          
          {/* House/Building silhouette - golden */}
          <path
            d="M18 40 L18 28 L24 22 L30 28 L30 40 Z"
            fill="hsl(45, 80%, 50%)"
          />
          
          {/* Taller building */}
          <rect x="28" y="20" width="10" height="20" fill="hsl(45, 70%, 55%)" rx="1" />
          
          {/* Windows on tall building */}
          <rect x="30" y="23" width="2.5" height="2.5" fill="hsl(150, 35%, 30%)" rx="0.3" />
          <rect x="34" y="23" width="2.5" height="2.5" fill="hsl(150, 35%, 30%)" rx="0.3" />
          <rect x="30" y="28" width="2.5" height="2.5" fill="hsl(150, 35%, 30%)" rx="0.3" />
          <rect x="34" y="28" width="2.5" height="2.5" fill="hsl(150, 35%, 30%)" rx="0.3" />
          <rect x="30" y="33" width="2.5" height="2.5" fill="hsl(150, 35%, 30%)" rx="0.3" />
          <rect x="34" y="33" width="2.5" height="2.5" fill="hsl(150, 35%, 30%)" rx="0.3" />
          
          {/* Right building outline */}
          <rect x="40" y="26" width="6" height="14" fill="hsl(45, 80%, 50%)" rx="1" />
          
          {/* Windows on right building */}
          <rect x="41.5" y="28" width="3" height="2" fill="hsl(150, 35%, 30%)" rx="0.3" />
          <rect x="41.5" y="32" width="3" height="2" fill="hsl(150, 35%, 30%)" rx="0.3" />
          <rect x="41.5" y="36" width="3" height="2" fill="hsl(150, 35%, 30%)" rx="0.3" />
          
          {/* Decorative leaf curve on left */}
          <path
            d="M10 38 Q14 30 20 32 Q16 35 14 40 Q12 42 10 38"
            fill="hsl(45, 80%, 50%)"
          />
          
          {/* Decorative leaf curve on right */}
          <path
            d="M50 38 Q46 30 40 32 Q44 35 46 40 Q48 42 50 38"
            fill="hsl(45, 80%, 50%)"
          />
          
          {/* Bottom decorative wave */}
          <path
            d="M10 44 Q20 40 30 42 Q40 44 50 40"
            stroke="hsl(45, 80%, 50%)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className="text-xl font-display font-bold tracking-wider text-primary group-hover:text-greenland-green-dark transition-colors">
          GREENLAND
        </span>
        <span className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          Luxury Living
        </span>
      </div>
    </Link>
  );
};

export default GreenlandLogo;
