"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CompanyData } from "../lib/dummyApi";
import { ChevronDown, ChevronUp } from "lucide-react";

interface LatestActivitiesProps {
  activities: CompanyData["activities"];
}

export function LatestActivities({ activities }: LatestActivitiesProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedActivities = showAll ? activities : activities.slice(0, 3);

  return (
    <Card className="bg-white mt-5 mx-4 md:mx-6">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 space-y-2 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <CardTitle className="text-base font-semibold">
            Latest Activities
          </CardTitle>
          <span className="text-xs sm:text-sm text-muted-foreground">
            (Recent 12 Month)
          </span>
        </div>
        <Button
          variant="link"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 p-0"
        >
          {showAll ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              See Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              See More
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6">
        <div className="relative">
          <div className="absolute left-2 top-0 h-full w-px bg-border" />
          <div className="space-y-4 sm:space-y-6">
            {displayedActivities.map((activity) => (
              <div key={activity.date} className="relative flex gap-4">
                <div className="absolute left-0 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-background bg-white ring-2 ring-border" />
                <div className="flex-1 ml-6">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs sm:text-sm font-medium">
                      {activity.date}
                    </span>
                    <span
                      className={`text-xs sm:text-sm px-2 py-1 rounded-full`}
                      style={{
                        backgroundColor: activity.category.bgColor,
                        color: activity.category.textColor,
                      }}
                    >
                      {activity.category.name}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {activity.month}, {activity.source}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">
                    {activity.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
