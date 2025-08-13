"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ToolCard {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  actionLabel: string;
  color: string;
}

function Icon({ path }: { path: string }) {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
  );
}

const tools: ToolCard[] = [
  {
    id: "scheduler",
    name: "Smart Scheduler",
    description: "Automatically find the best time to post across platforms.",
    icon: <Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    actionLabel: "Open Scheduler",
    color: "#2563EB",
  },
  {
    id: "hashtag",
    name: "Hashtag Optimizer",
    description: "Discover high-performing hashtags with AI suggestions.",
    icon: <Icon path="M7 7h.01M12 7h.01M17 7h.01M7 12h10M7 17h10" />,
    actionLabel: "Optimize Hashtags",
    color: "#16A34A",
  },
  {
    id: "analytics",
    name: "Performance Analytics",
    description: "Track reach, engagement, and conversions in one dashboard.",
    icon: <Icon path="M3 3v18h18M7 13l3 3 7-7" />,
    actionLabel: "View Analytics",
    color: "#9333EA",
  },
  {
    id: "assets",
    name: "Asset Library",
    description: "Manage brand assets and reuse content across campaigns.",
    icon: <Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586l5.414 5.414A1 1 0 0118 9v10a2 2 0 01-2 2z" />,
    actionLabel: "Open Library",
    color: "#EA580C",
  },
  {
    id: "calendar",
    name: "Campaign Calendar",
    description: "Visualize all scheduled content and campaigns.",
    icon: <Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    actionLabel: "Go to Calendar",
    color: "#0EA5E9",
  },
  {
    id: "inbox",
    name: "Unified Inbox",
    description: "Respond to comments and messages from all platforms.",
    icon: <Icon path="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    actionLabel: "Open Inbox",
    color: "#DB2777",
  },
];

export default function ToolsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Tools</h1>
            <p className="text-gray-600 mt-1">Powerful utilities to help you plan, create, and analyze.</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50">Browse Templates</button>
            <button className="px-4 py-2 rounded-lg bg-[#20408B] text-white hover:bg-[#16306a]">New Project</button>
          </div>
        </div>

        {/* Tool Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <div
              key={tool.id}
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              onMouseEnter={() => setActive(tool.id)}
              onMouseLeave={() => setActive(prev => (prev === tool.id ? null : prev))}
            >
              <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-10" style={{ backgroundColor: tool.color }} />
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: tool.color }}>
                  {tool.icon}
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{tool.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{tool.description}</p>

                <div className="mt-6 flex items-center justify-between">
                  <button className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: `${tool.color}1a`, color: tool.color }}>
                    {tool.actionLabel}
                  </button>
                  <span className={`text-xs px-2 py-1 rounded-full ${active === tool.id ? 'bg-gray-100 text-gray-700' : 'text-gray-400'}`}>Beta</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-dashed border-gray-300 p-6 bg-gradient-to-br from-gray-50 to-white">
            <h4 className="font-semibold text-gray-900 mb-1">Workflow</h4>
            <p className="text-sm text-gray-600">Create a project, add content tasks, and assign to your team.</p>
          </div>
          <div className="rounded-2xl border border-dashed border-gray-300 p-6 bg-gradient-to-br from-gray-50 to-white">
            <h4 className="font-semibold text-gray-900 mb-1">AI Assistance</h4>
            <p className="text-sm text-gray-600">Use our AI tools to generate captions, hashtags, and ideas.</p>
          </div>
          <div className="rounded-2xl border border-dashed border-gray-300 p-6 bg-gradient-to-br from-gray-50 to-white">
            <h4 className="font-semibold text-gray-900 mb-1">Integrations</h4>
            <p className="text-sm text-gray-600">Connect your cloud storage and design tools for faster work.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


