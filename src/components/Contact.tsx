import { Mail, Phone, Linkedin, Github } from "lucide-react";

const contacts = [
  {
    label: "Email",
    value: "vyshnavofc@gmail.com",
    href: "mailto:vyshnavofc@gmail.com",
    icon: <Mail size={20} className="text-primary" />
  },
  {
    label: "Phone",
    value: "+91 80753 86169",
    href: "tel:+918075386169",
    icon: <Phone size={20} className="text-primary" />
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/vyshnav-suresh",
    href: "https://linkedin.com/in/vyshnav-suresh",
    icon: <Linkedin size={20} className="text-primary" />
  },
  {
    label: "GitHub",
    value: "github.com/vyshnav-suresh",
    href: "https://github.com/vyshnav-suresh",
    icon: <Github size={20} className="text-primary" />
  }
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
        <div className="mb-12">
          <span className="text-primary text-[11px] font-medium uppercase tracking-widest mb-2 block">Contact</span>
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Available for full-time roles and freelance opportunities. Feel free to reach out if you want to collaborate on a project!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contacts.map((contact, index) => (
            <a 
              key={index} 
              href={contact.href}
              target={contact.label !== "Email" && contact.label !== "Phone" ? "_blank" : undefined}
              rel={contact.label !== "Email" && contact.label !== "Phone" ? "noopener noreferrer" : undefined}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col items-center justify-center space-y-3 hover:border-primary/50 hover:bg-white hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-light-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {contact.icon}
              </div>
              <div className="w-full text-center overflow-hidden">
                <div className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">{contact.label}</div>
                <div className="text-sm font-medium text-gray-900 truncate">{contact.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
