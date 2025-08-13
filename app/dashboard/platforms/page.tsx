"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ConnectionStatus = "connected" | "disconnected" | "syncing";

interface Platform {
  id: string;
  name: string;
  icon: string;
  brandColor: string;
  status: ConnectionStatus;
  lastSynced?: string;
}

const initialPlatforms: Platform[] = [
  { id: "instagram", name: "Instagram", icon: "📸", brandColor: "#E4405F", status: "connected", lastSynced: "2h ago" },
  { id: "facebook", name: "Facebook", icon: "📘", brandColor: "#1877F2", status: "connected", lastSynced: "1h ago" },
  { id: "twitter", name: "Twitter/X", icon: "🐦", brandColor: "#000000", status: "disconnected" },
  { id: "linkedin", name: "LinkedIn", icon: "💼", brandColor: "#0A66C2", status: "connected", lastSynced: "45m ago" },
  { id: "youtube", name: "YouTube", icon: "▶️", brandColor: "#FF0000", status: "disconnected" },
  { id: "tiktok", name: "TikTok", icon: "🎵", brandColor: "#010101", status: "disconnected" },
];

export default function PlatformsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms);

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

  const handleConnect = (id: string) => {
    setPlatforms(prev => prev.map(p => p.id === id ? { ...p, status: "syncing" } : p));
    setTimeout(() => {
      setPlatforms(prev => prev.map(p => p.id === id ? { ...p, status: "connected", lastSynced: "Just now" } : p));
    }, 1200);
  };

  const handleDisconnect = (id: string) => {
    setPlatforms(prev => prev.map(p => p.id === id ? { ...p, status: "disconnected", lastSynced: undefined } : p));
  };

  const handleSync = (id: string) => {
    setPlatforms(prev => prev.map(p => p.id === id ? { ...p, status: "syncing" } : p));
    setTimeout(() => {
      setPlatforms(prev => prev.map(p => p.id === id ? { ...p, status: "connected", lastSynced: "Just now" } : p));
    }, 800);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Platforms</h1>
            <p className="text-gray-600 mt-1">Connect and manage your social accounts in one place.</p>
          </div>
          <button className="hidden sm:inline-flex bg-[#20408B] text-white px-5 py-2.5 rounded-lg hover:bg-[#16306a] transition-colors shadow-sm">
            + Connect Platform
          </button>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <div key={platform.id} className="relative overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-10" style={{ backgroundColor: platform.brandColor }} />
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: `${platform.brandColor}1a`, color: platform.brandColor }}>
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {platform.status === "connected" && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">Connected</span>
                        )}
                        {platform.status === "disconnected" && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">Disconnected</span>
                        )}
                        {platform.status === "syncing" && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">Syncing…</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  {platform.lastSynced ? (
                    <span>Last synced {platform.lastSynced}</span>
                  ) : (
                    <span>Not connected</span>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  {platform.status === "connected" ? (
                    <>
                      <button onClick={() => handleSync(platform.id)} className="px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-800 hover:bg-gray-200">Sync</button>
                      <button className="px-3 py-2 rounded-lg text-sm bg-white border border-gray-200 text-gray-800 hover:bg-gray-50">Manage</button>
                      <button onClick={() => handleDisconnect(platform.id)} className="px-3 py-2 rounded-lg text-sm bg-red-50 text-red-700 hover:bg-red-100">Disconnect</button>
                    </>
                  ) : platform.status === "disconnected" ? (
                    <>
                      <button onClick={() => handleConnect(platform.id)} className="col-span-2 px-3 py-2 rounded-lg text-sm bg-[#20408B] text-white hover:bg-[#16306a]">Connect</button>
                      <button className="px-3 py-2 rounded-lg text-sm bg-white border border-gray-200 text-gray-800 hover:bg-gray-50">Learn more</button>
                    </>
                  ) : (
                    <button className="col-span-3 px-3 py-2 rounded-lg text-sm bg-blue-600 text-white opacity-80 cursor-wait">Syncing…</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Helpers */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-dashed border-gray-300 p-6 bg-gradient-to-br from-gray-50 to-white">
            <h4 className="font-semibold text-gray-900 mb-1">Why connect platforms?</h4>
            <p className="text-sm text-gray-600">Schedule content, pull analytics, and manage engagement from one place.</p>
          </div>
          <div className="rounded-2xl border border-dashed border-gray-300 p-6 bg-gradient-to-br from-gray-50 to-white">
            <h4 className="font-semibold text-gray-900 mb-1">Permissions</h4>
            <p className="text-sm text-gray-600">We ask only for the permissions needed to publish and read insights.</p>
          </div>
          <div className="rounded-2xl border border-dashed border-gray-300 p-6 bg-gradient-to-br from-gray-50 to-white">
            <h4 className="font-semibold text-gray-900 mb-1">Security</h4>
            <p className="text-sm text-gray-600">Your data is encrypted in transit and at rest. Disconnect anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


