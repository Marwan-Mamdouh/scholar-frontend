import { Icon } from "@iconify/react";
import Badge from "../components/ui/Badge/Badge";
import Card from "../components/ui/Card/Card";

export default function Home() {
  return (
    <main>
      <Card
        variant="solid"
        intent="primary"
        title="card title"
        description="card description"
        callToAction="call to action"
        badge={
          <Badge variant="outlined" intent="primary">
            new badge
          </Badge>
        }
        icon={<Icon className="h-full w-full" icon="fe:arrow-right" />}
      />
      <Card
        variant="solid"
        intent="primary"
        title="card title"
        description="card description"
        callToAction="call to action"
        badge={
          <Badge variant="outlined" intent="primary">
            new badge
          </Badge>
        }
        clickable
        icon={<Icon className="h-full w-full" icon="fe:arrow-right" />}
      />
    </main>
  );
}
