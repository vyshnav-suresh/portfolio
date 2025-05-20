'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils';

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  [key: string]: Skill[];
}

const skillCategories: SkillCategory = {
  frontend: [
    { name: "React", icon: "devicon-react-original colored" },
    { name: "Next.js", icon: "devicon-nextjs-plain colored" },
    { name: "HTML5", icon: "devicon-html5-plain colored" },
    { name: "CSS3", icon: "devicon-css3-plain colored" },
    { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored" },
    { name: "Framer Motion", icon: "devicon-framer-plain colored" },
  ],
  backend: [
    { name: "Node.js", icon: "devicon-nodejs-plain colored" },
    { name: "Express", icon: "devicon-express-original colored" },
    { name: "GraphQL", icon: "devicon-graphql-plain colored" },
    { name: "REST API", icon: "ri:restart-line" },
    { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
    { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
  ],
  devops: [
    { name: "Docker", icon: "devicon-docker-plain colored" },
    { name: "Kubernetes", icon: "devicon-kubernetes-plain colored" },
    { name: "AWS", icon: "devicon-amazonwebservices-original colored" },
    { name: "Git", icon: "devicon-git-plain colored" },
    { name: "GitHub Actions", icon: "devicon-githubactions-plain colored" },
    { name: "Linux", icon: "devicon-linux-plain colored" },
  ],
  tools: [
    { name: "VS Code", icon: "devicon-vscode-plain colored" },
    { name: "Figma", icon: "devicon-figma-plain colored" },
    { name: "Postman", icon: "devicon-postman-plain colored" },
    { name: "Jest", icon: "devicon-jest-plain colored" },
    { name: "Storybook", icon: "devicon-storybook-plain colored" },
  ],
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function getCategoryIcon(category: string): string {
  switch (category) {
    case 'frontend':
      return 'ri:computer-line';
    case 'backend':
      return 'ri:server-line';
    case 'devops':
      return 'ri:cloud-line';
    case 'tools':
      return 'ri:tools-line';
    default:
      return 'ri:code-box-line';
  }
}

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-accent text-accent-foreground mb-4">
            Technical Skills
          </Badge>
          <Heading className="text-2xl md:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-500 mb-4">
            My Expertise
          </Heading>
          <Text as="p" className="max-w-2xl mx-auto text-muted-foreground">
            Here are the technologies and tools I work with on a daily basis to create amazing digital experiences.
          </Text>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {Object.entries(skillCategories).map(([category, skills], idx) => (
            <motion.div
              key={category}
              custom={idx * 0.2}
              variants={fadeInUp}
              className={cn(
                'bg-card border border-border rounded-xl p-6',
                'transition-all duration-300 hover:shadow-lg hover:shadow-accent/5',
                'flex flex-col h-full'
              )}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mr-3">
                  <i className={`${getCategoryIcon(category)} text-accent text-xl`} />
                </div>
                <Text as="p" className="font-semibold capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </Text>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    custom={skillIdx * 0.1}
                    variants={fadeInUp}
                    whileHover={{ y: -2 }}
                    className="flex items-center bg-muted/50 rounded-full px-3 py-1.5 text-sm"
                  >
                    <i className={`${skill.icon} mr-1.5 text-lg`} />
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
