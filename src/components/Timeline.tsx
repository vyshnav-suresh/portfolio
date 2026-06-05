const timelineItems = [
  {
    title: "Software Engineer",
    organisation: "UVJ Technologies Pvt. Ltd",
    date: "June 2023 – Present",
    type: "Work",
    location: "Kakkanad, Kerala",
    highlights: [
      "Built React.js/Next.js dashboard with analytics, RBAC, and real-time data updates",
      "Advanced state management with TanStack Query and TanStack Table",
      "Real-time asthma device data analysis app using MongoDB and Node.js",
      "Designed n8n automation workflows for notifications, DB updates, and API interactions",
      "Secure RESTful APIs with JWT + OAuth 2.0; NestJS microservices architecture",
      "Optimised database queries and caching — reduced API response times by 40%",
      "Automated data workflows via Google App Script for reporting and validation",
    ]
  },
  {
    title: "Master of Computer Applications (MCA)",
    organisation: "Amal Jyothi College of Engineering",
    date: "August 2021 – May 2023",
    type: "Education",
    location: "Kerala",
    highlights: []
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    organisation: "Christ (Autonomous) College",
    date: "August 2018 – May 2021",
    type: "Education",
    location: "Kerala",
    highlights: []
  }
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="mb-12">
          <span className="text-primary text-[11px] font-medium uppercase tracking-widest mb-2 block">Timeline</span>
          <h2 className="font-display text-4xl md:text-5xl text-gray-900">Professional Journey</h2>
        </div>
        
        <div className="relative border-l border-gray-200 ml-4 md:ml-6 space-y-12 pb-8">
          {timelineItems.map((item, index) => (
            <div key={index} className="relative pl-8 md:pl-10">
              <div className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full -left-[9px] top-1.5 shadow-sm"></div>
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 gap-2 md:gap-4">
                <div>
                  <h3 className="font-medium text-xl text-gray-900">{item.title}</h3>
                  <div className="text-sm text-primary font-medium mt-1">{item.organisation}</div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500 whitespace-nowrap">{item.date}</span>
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-md uppercase tracking-wider ${
                    item.type === 'Work' 
                      ? 'bg-light-blue text-primary' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.type}
                  </span>
                </div>
              </div>
              
              {item.highlights && item.highlights.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm text-gray-600 list-disc pl-4 marker:text-gray-400">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="leading-relaxed">{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
