import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-charcoal-200 p-5",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-charcoal-500">{title}</p>
          <p className="text-2xl font-heading font-bold text-charcoal-950 mt-1">
            {value}
          </p>
          {description && (
            <p className="text-xs text-charcoal-400 mt-1">{description}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-xs font-medium mt-1",
                trend.positive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.positive ? "+" : ""}{trend.value}
            </p>
          )}
        </div>
        <div className="p-2.5 bg-forest-50 rounded-lg">
          <Icon className="h-5 w-5 text-forest-700" />
        </div>
      </div>
    </div>
  );
}
