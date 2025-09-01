"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface Content {
  id: string;
  title: string;
  type: 'post' | 'story' | 'video' | 'article';
  platform: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  engagement: number;
  reach: number;
  createdAt: string;
  scheduledFor?: string;
}

const contentItems: Content[] = [
  {
    id: '1',
    title: 'Product Launch Announcement',
    type: 'post',
    platform: 'Instagram',
    status: 'published',
    engagement: 1247,
    reach: 15600,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Behind the Scenes Story',
    type: 'story',
    platform: 'Instagram',
    status: 'scheduled',
    engagement: 0,
    reach: 0,
    createdAt: '2024-01-16',
    scheduledFor: '2024-01-18 10:00'
  },
  {
    id: '3',
    title: 'How-to Tutorial Video',
    type: 'video',
    platform: 'YouTube',
    status: 'draft',
    engagement: 0,
    reach: 0,
    createdAt: '2024-01-17'
  },
  {
    id: '4',
    title: 'Industry Insights Article',
    type: 'article',
    platform: 'LinkedIn',
    status: 'published',
    engagement: 892,
    reach: 8900,
    createdAt: '2024-01-14'
  }
];

const platformOptions = ['Instagram', 'Facebook', 'Twitter/X', 'LinkedIn', 'TikTok', 'YouTube'];

export default function ContentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'draft' | 'scheduled' | 'published'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Generator state
  const [prompt, setPrompt] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram']);
  const [tone, setTone] = useState<'informative' | 'playful' | 'professional'>('informative');
  const [generating, setGenerating] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState<string>('');
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [scheduleAt, setScheduleAt] = useState<string>(''); // e.g. 2025-09-01T18:00

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
      case 'story': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
      case 'video': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
      case 'article': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      );
      default: return null;
    }
  };

  const filteredContent = contentItems.filter(item => {
    const matchesFilter = filter === 'all' || item.status === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  function togglePlatform(p: string) {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  function simpleHashtagify(text: string): string[] {
    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3)
      .slice(0, 6);
    const uniques: string[] = [];
    for (const w of words) {
      if (!uniques.includes(w)) uniques.push(w);
    }
    return uniques.map(w => `#${w.replace(/\s+/g, '')}`);
  }

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setGenerating(true);
    const tonePrefix = tone === 'playful' ? '🎉' : tone === 'professional' ? '🔷' : '💡';
    const caption = `${tonePrefix} ${prompt.trim()} — ${selectedPlatforms.join(', ')} audience in mind.`;
    const hashtags = simpleHashtagify(prompt);
    const ideas = [
      `Hook: ${prompt.slice(0, 60)}...`,
      'CTA: Tell us your thoughts in the comments!',
      'Variant: Turn this into a short video + carousel.'
    ];
    await new Promise(r => setTimeout(r, 500));
    setGeneratedCaption(caption);
    setGeneratedHashtags(hashtags);
    setGeneratedIdeas(ideas);
    setGenerating(false);
  }

  function handleCopy(text: string) {
    if (typeof window !== 'undefined') navigator.clipboard.writeText(text);
  }

  function handlePostNow() {
    alert('Post queued to publish now to: ' + selectedPlatforms.join(', '));
  }

  function handleSchedule() {
    if (!scheduleAt) {
      alert('Pick a schedule date/time');
      return;
    }
    alert(`Scheduled for ${scheduleAt} on ${selectedPlatforms.join(', ')}`);
  }

  const posted = useMemo(() => contentItems.filter(c => c.status === 'published').slice(0, 5), []);
  const drafts = useMemo(() => contentItems.filter(c => c.status === 'draft').slice(0, 5), []);
  const scheduled = useMemo(() => contentItems.filter(c => c.status === 'scheduled').slice(0, 5), []);
  const [recentTab, setRecentTab] = useState<'posted' | 'drafts' | 'scheduled'>('posted');

  return (
    <div className="px-4 py-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Content</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              + Create Content
            </button>
          </div>
        </div>

        {/* AI Content Generator */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Content Generator</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Prompt and options */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder="Describe what you want to post about..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platforms</label>
                  <div className="flex flex-wrap gap-2">
                    {platformOptions.map(p => (
                      <button
                        key={p}
                        onClick={() => togglePlatform(p)}
                        className={`px-3 py-1 rounded-full text-sm border ${selectedPlatforms.includes(p) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="informative">Informative</option>
                    <option value="playful">Playful</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={generating || !prompt.trim()}
                  className={`px-4 py-2 rounded-lg text-white ${generating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                >
                  {generating ? 'Generating…' : 'Generate'}
                </button>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700">Schedule</label>
                  <input
                    type="datetime-local"
                    value={scheduleAt}
                    onChange={(e) => setScheduleAt(e.target.value)}
                    className="px-2 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <button onClick={handlePostNow} disabled={!generatedCaption} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Post Now</button>
                <button onClick={handleSchedule} disabled={!generatedCaption || !scheduleAt} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Schedule</button>
              </div>
            </div>

            {/* Right: Generated output */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Caption</label>
                  {generatedCaption && (
                    <button onClick={() => handleCopy(generatedCaption)} className="text-xs text-blue-600 hover:underline">Copy</button>
                  )}
                </div>
                <textarea readOnly rows={6} value={generatedCaption} className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Hashtags</label>
                  {generatedHashtags.length > 0 && (
                    <button onClick={() => handleCopy(generatedHashtags.join(' '))} className="text-xs text-blue-600 hover:underline">Copy</button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {generatedHashtags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{tag}</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quick Ideas</label>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {generatedIdeas.map((idea, idx) => (
                    <li key={idx}>{idea}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <div className="flex gap-2">
              <button onClick={() => setRecentTab('posted')} className={`px-3 py-1 rounded-lg text-sm ${recentTab === 'posted' ? 'bg-blue-600 text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>Posted</button>
              <button onClick={() => setRecentTab('drafts')} className={`px-3 py-1 rounded-lg text-sm ${recentTab === 'drafts' ? 'bg-blue-600 text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>Drafts</button>
              <button onClick={() => setRecentTab('scheduled')} className={`px-3 py-1 rounded-lg text-sm ${recentTab === 'scheduled' ? 'bg-blue-600 text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>Scheduled</button>
            </div>
          </div>
          <div className="space-y-3">
            {(recentTab === 'posted' ? posted : recentTab === 'drafts' ? drafts : scheduled).map(item => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.platform} • {item.createdAt}{item.scheduledFor ? ` • ${item.scheduledFor}` : ''}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {(['all', 'draft', 'scheduled', 'published'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.platform}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Engagement</span>
                  <span className="font-medium">{item.engagement.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Reach</span>
                  <span className="font-medium">{item.reach.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium">{item.createdAt}</span>
                </div>
                {item.scheduledFor && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Scheduled</span>
                    <span className="font-medium text-blue-600">{item.scheduledFor}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                  Edit
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200 transition-colors">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 