import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Activity {
  date: string;
  month: string;
  category: {
    name: string;
    color: string;
  };
  source: string;
  title: string;
}

const activities: Activity[] = [
  {
    date: "2024,06",
    month: "11/Jun/2024",
    category: {
      name: "Product & Services",
      color: "text-green-600",
    },
    source: "New York Times",
    title:
      "Apple sees a rise in PC shipments, says report - The Financial Express",
  },
  {
    date: "2024,05",
    month: "11/Jun/2024",
    category: {
      name: "Financing & Investment",
      color: "text-blue-500",
    },
    source: "New York Times",
    title: "Exploring Google's Latest Milestone in Acknowledgment Tech",
  },
  {
    date: "2024,04",
    month: "11/Jun/2024",
    category: {
      name: "Corporate Strategy",
      color: "text-purple-600",
    },
    source: "New York Times",
    title: "Breaking Down Google's Innovative Acknowledgment Launch",
  },
  {
    date: "2024,03",
    month: "11/Jun/2024",
    category: {
      name: "Corporate Social Responsibilities",
      color: "text-pink-600",
    },
    source: "New York Times",
    title: "evolutionizing Recognition: Inside Google's Mega Acknowledgment",
  },
  {
    date: "2023,11",
    month: "11/Jun/2024",
    category: {
      name: "Financial Performance",
      color: "text-blue-600",
    },
    source: "New York Times",
    title: "How Google's New Acknowledgment Feature Will Impact Us",
  },
];

export function LatestActivities() {
  return (
    <Card className="bg-white mt-5 mx-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-semibold">
            Latest Activities
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            (Recent 12 Month)
          </span>
        </div>
        <Button
          variant="link"
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          See Less
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="relative">
          <div className="absolute left-2 top-0 h-full w-px bg-border" />
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.date} className="relative flex gap-4">
                <div className="absolute left-0 h-4 w-4 rounded-full border-2 border-background bg-white ring-2 ring-border" />
                <div className="flex-1 ml-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{activity.date}</span>
                    <span className={`text-sm ${activity.category.color}`}>
                      {activity.category.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {activity.month}, {activity.source}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{activity.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
