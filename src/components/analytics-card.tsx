// src/components/analytics-card.tsx

import { cn } from "@/lib/utils";
import { 
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
} from "./ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AnalyticsCardProps {
    title: string;
    value: number;
    variant: "up" | "down";
    increaseValue: number;
  }
  
export function AnalyticsCard({ title, value, variant, increaseValue }: AnalyticsCardProps) {
    const iconColor = variant === "up" ? "text-emerald-500" : "text-red-500";
    const increaseValueColor = variant === "up" ? "text-emerald-500" : "text-red-500";
    const Icon = variant === "up" ? ChevronUp : ChevronDown;
  
    return (
        <Card className="shadow-none border-none w-full">
            <CardHeader>
                <div className="flex items-center gap-x-2.5">
                    <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
                        <span className="truncate text-base">{title}</span>
                    </CardDescription>
                    <div className="flex items-center gap-x-1">
                        <Icon className={cn("size-4", iconColor)}/>
                        <span className={cn("truncate font-medium text-base", increaseValueColor)}>
                            {increaseValue}
                        </span>
                    </div>
                </div>

                <CardTitle className="text-3xl font-semibold">{value}</CardTitle>
            </CardHeader>
        </Card>
    )
}
  
