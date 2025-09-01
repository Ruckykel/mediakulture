"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";

interface Event {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  time: string;
  type: 'post' | 'campaign' | 'meeting' | 'deadline';
  platform: string;
  status: 'scheduled' | 'published' | 'draft' | 'overdue';
}

function formatISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function monthName(date: Date) {
  return date.toLocaleString(undefined, { month: 'long' });
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// Generate dummy events across current + next month for demo
function generateDummyEvents(anchor: Date): Event[] {
  const currentMonth = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const nextMonth = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1);
  const months = [currentMonth, nextMonth];
  const titles = [
    'IG Reel: Tips & Tricks',
    'Campaign Kickoff',
    'YouTube Upload',
    'Deadline: Report',
    'Post: Customer Story',
    'Draft: Product Teaser',
  ];
  const platforms = ['Instagram', 'All Platforms', 'YouTube', 'Analytics', 'Twitter/X'];
  const types: Event['type'][] = ['post', 'campaign', 'post', 'deadline', 'post'];
  const statuses: Event['status'][] = ['scheduled', 'published', 'draft', 'overdue'];
  const events: Event[] = [];
  let idCounter = 1000;
  months.forEach((m, idx) => {
    const daysInMonth = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    for (let i = 0; i < 12; i++) {
      const day = 1 + Math.floor(Math.random() * daysInMonth);
      const date = new Date(m.getFullYear(), m.getMonth(), day);
      events.push({
        id: String(idCounter++),
        title: titles[(i + idx) % titles.length],
        date: formatISODate(date),
        time: `${String(9 + (i % 8)).padStart(2, '0')}:00`,
        type: types[i % types.length] ?? 'post',
        platform: platforms[i % platforms.length],
        status: statuses[i % statuses.length] ?? 'scheduled',
      });
    }
  });
  return events;
}

export default function CalendarPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [anchorDate, setAnchorDate] = useState(new Date()); // drives visible month/week
  const [selectedDate, setSelectedDate] = useState(new Date()); // defaults to today so content shows by default
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showYearPicker, setShowYearPicker] = useState(false);
  const yearPickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (!showYearPicker) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (yearPickerRef.current && !yearPickerRef.current.contains(target)) {
        setShowYearPicker(false);
      }
    };
    document.addEventListener('mousedown', onDocClick, true);
    return () => document.removeEventListener('mousedown', onDocClick, true);
  }, [showYearPicker]);

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
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
      case 'campaign': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
      case 'meeting': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
      case 'deadline': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      default: return null;
    }
  };

  const allEvents = useMemo(() => {
    return generateDummyEvents(anchorDate);
  }, [anchorDate]);

  // Visible ranges
  const monthGridDates = useMemo(() => {
    const firstOfMonth = startOfMonth(anchorDate);
    const gridStart = startOfWeek(firstOfMonth);
    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      days.push(addDays(gridStart, i));
    }
    return days;
  }, [anchorDate]);

  const selectedDayEvents = useMemo(() => {
    const iso = formatISODate(selectedDate);
    return allEvents.filter(e => e.date === iso);
  }, [selectedDate, allEvents]);

  const weekDates = useMemo(() => {
    const start = startOfWeek(selectedDate);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [selectedDate]);

  const changeMonth = (delta: number) => {
    setAnchorDate(new Date(anchorDate.getFullYear(), anchorDate.getMonth() + delta, 1));
  };

  const changeYear = (year: number) => {
    setAnchorDate(new Date(year, anchorDate.getMonth(), 1));
    setShowYearPicker(false);
  };

  const yearOptions = useMemo(() => {
    const base = anchorDate.getFullYear();
    const years: number[] = [];
    for (let y = base - 6; y <= base + 6; y++) years.push(y);
    return years;
  }, [anchorDate]);

  return (
    <div className="px-4 py-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <div className="flex items-center space-x-4">
            <div className="flex bg-white border border-gray-200 rounded-lg">
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  view === 'month' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 text-sm font-medium ${
                  view === 'week' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  view === 'day' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Day
              </button>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              + New Event
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Calendar Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Grid */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6 relative">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-semibold text-gray-900">{monthName(anchorDate)}</span>
                  <div className="relative" ref={yearPickerRef}>
                    <button
                      className="inline-flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-md text-gray-900 hover:bg-gray-50"
                      onClick={() => setShowYearPicker(v => !v)}
                      aria-haspopup="listbox"
                      aria-expanded={showYearPicker}
                    >
                      <span className="text-xl font-semibold">{anchorDate.getFullYear()}</span>
                      <svg className={`w-4 h-4 transition-transform ${showYearPicker ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {showYearPicker && (
                      <div className="absolute left-0 top-full mt-2 w-40 max-h-60 overflow-auto bg-white border border-gray-200 rounded-lg shadow">
                        {yearOptions.map(y => (
                          <button
                            key={y}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${y === anchorDate.getFullYear() ? 'bg-blue-50 text-blue-700' : ''}`}
                            onClick={() => changeYear(y)}
                          >
                            {y}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700" aria-label="Prev month" onClick={() => changeMonth(-1)}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700" aria-label="Next month" onClick={() => changeMonth(1)}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Month View */}
              {view === 'month' && (
                <div>
                  <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                    {monthGridDates.map((date, i) => {
                      const inMonth = date.getMonth() === anchorDate.getMonth();
                      const iso = formatISODate(date);
                      const hasEvents = allEvents.some(e => e.date === iso);
                      const isSelected = isSameDay(date, selectedDate);
                      return (
                        <button
                          key={`${iso}-${i}`}
                          onClick={() => setSelectedDate(date)}
                          className={`p-2 min-h-[80px] border text-left transition-colors ${
                            inMonth ? 'border-gray-100 hover:bg-gray-50' : 'border-gray-50 bg-gray-50/50 text-gray-400'
                          } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${inMonth ? 'text-gray-900' : 'text-gray-400'}`}>{date.getDate()}</span>
                            {hasEvents && <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Week View */}
              {view === 'week' && (
                <div>
                  <div className="grid grid-cols-7 gap-1">
                    {weekDates.map((date) => {
                      const iso = formatISODate(date);
                      const isSelected = isSameDay(date, selectedDate);
                      const dayEvents = allEvents.filter(e => e.date === iso);
                      return (
                        <button
                          key={iso}
                          onClick={() => setSelectedDate(date)}
                          className={`p-2 min-h-[120px] border text-left transition-colors ${isSelected ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-900">{date.getDate()}</span>
                            {dayEvents.length > 0 && <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />}
                          </div>
                          <div className="mt-2 space-y-1">
                            {dayEvents.slice(0, 3).map(e => (
                              <div key={e.id} className="text-xs text-gray-700 truncate flex items-center gap-1">
                                {getTypeIcon(e.type)}
                                <span>{e.title}</span>
                              </div>
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Day View */}
              {view === 'day' && (
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-700 mb-3">
                    <span>{selectedDate.toDateString()}</span>
                    <div className="space-x-2">
                      <button className="px-2 py-1 border rounded" onClick={() => setSelectedDate(addDays(selectedDate, -1))}>Prev</button>
                      <button className="px-2 py-1 border rounded" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>Next</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {selectedDayEvents.length === 0 && (
                      <div className="text-sm text-gray-600">No events for this day.</div>
                    )}
                    {selectedDayEvents.map(e => (
                      <div key={e.id} className="p-3 border rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(e.type)}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{e.title}</p>
                            <p className="text-xs text-gray-500">{e.time} • {e.platform}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(e.status)}`}>{e.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Side Panel */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Events on {monthName(selectedDate)} {selectedDate.getDate()}, {selectedDate.getFullYear()}</h3>
              <div className="space-y-4">
                {selectedDayEvents.length === 0 && (
                  <div className="text-sm text-gray-600">No content scheduled or posted on this date.</div>
                )}
                {selectedDayEvents.map((event) => (
                  <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(event.type)}
                        <span className="text-sm font-medium text-gray-900">{event.title}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{event.date} at {event.time}</span>
                      <span className="text-blue-600">{event.platform}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Schedule Content</h3>
              </div>
              <p className="text-gray-600 mb-4">Plan and schedule your content across all platforms with our advanced scheduling tools.</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Create Schedule
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Campaign Planning</h3>
              </div>
              <p className="text-gray-600 mb-4">Design comprehensive campaigns with multiple touchpoints and automated workflows.</p>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Plan Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 