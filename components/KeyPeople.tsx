import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin } from "lucide-react";
import Image from "next/image";

interface Person {
  name: string;
  title: string;
  description: string;
  email: string;
  linkedin: string;
}

interface KeyPeopleProps {
  people: Person[];
}

export function KeyPeople({ people }: KeyPeopleProps) {
  return (
    <Card className="mx-6 mt-5 mb-20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Key People</CardTitle>
        <Button
          variant="link"
          className="text-purple-600 hover:text-purple-700 p-0"
        >
          View More
        </Button>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {people.map((person, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{person.name}</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        (window.location.href = `mailto:${person.email}`)
                      }
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => window.open(person.linkedin, "_blank")}
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{person.title}</p>
                <p className="text-sm text-muted-foreground">
                  {person.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
