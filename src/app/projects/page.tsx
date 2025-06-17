import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-background via-accent/10 to-muted text-foreground">
      <Container size="default" padding="default" className="flex flex-col items-center justify-center text-center">
        <Heading as="h1" size="display" variant="gradient" align="center" className="mb-4">
          Projects
        </Heading>
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-accent to-primary mx-auto mb-6" />
        <Text as="p" size="lg" variant="muted" align="center" className="mb-8">
          A showcase of my work and side projects will appear here soon.
        </Text>
      </Container>
    </div>
  );
}
