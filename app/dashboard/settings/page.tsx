"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type SessionInfo = {
	id: string;
	device: string;
	location: string;
	lastActive: string;
	current?: boolean;
};

type ApiKey = {
	id: string;
	label: string;
	key: string; // masked for display
	createdAt: string;
	active: boolean;
};

export default function SettingsPage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	// Profile
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [timezone, setTimezone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");

	// Notifications
	const [notifyEmail, setNotifyEmail] = useState<boolean>(true);
	const [notifyPush, setNotifyPush] = useState<boolean>(true);
	const [notifyDigest, setNotifyDigest] = useState<boolean>(false);

	// Scheduling
	const [workDays, setWorkDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);
	const [postWindow, setPostWindow] = useState<{ start: string; end: string }>({ start: "09:00", end: "18:00" });

	// Security
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [twoFactor, setTwoFactor] = useState<boolean>(false);
	const [twoFactorMethod, setTwoFactorMethod] = useState<"authenticator" | "sms">("authenticator");

	// Sessions
	const [sessions, setSessions] = useState<SessionInfo[]>([
		{ id: "s_cur", device: "Windows • Chrome", location: "Lagos, NG", lastActive: "Just now", current: true },
		{ id: "s_1", device: "iPhone • Safari", location: "Lagos, NG", lastActive: "2 days ago" },
		{ id: "s_2", device: "Mac • Chrome", location: "London, UK", lastActive: "1 month ago" },
	]);

	// API Keys & Webhooks
	const [apiKeys, setApiKeys] = useState<ApiKey[]>([
		{ id: "k_1", label: "Primary", key: "mk_live_************************1234", createdAt: "2024-10-01", active: true },
	]);
	const [newKeyLabel, setNewKeyLabel] = useState("");
	const [webhookUrl, setWebhookUrl] = useState("");
	const [webhookSecret, setWebhookSecret] = useState("");
	const [webhookEvents, setWebhookEvents] = useState<{ posted: boolean; scheduled: boolean; failed: boolean }>({ posted: true, scheduled: true, failed: true });

	// Billing (demo)
	const [plan] = useState("Pro");
	const [usage] = useState({ postsThisMonth: 42, postLimit: 200 });
	const usagePct = useMemo(() => Math.min(100, Math.round((usage.postsThisMonth / usage.postLimit) * 100)), [usage]);

	// Content Defaults
	const [defaultTone, setDefaultTone] = useState<"informative" | "playful" | "professional">("informative");
	const [defaultHashtags, setDefaultHashtags] = useState<string>("#marketing #media #growth");
	const [autoUtm, setAutoUtm] = useState<boolean>(false);
	const [utmSource, setUtmSource] = useState("mediakulture");
	const [utmMedium, setUtmMedium] = useState("social");
	const [utmCampaign, setUtmCampaign] = useState("q3_campaign");

	// Privacy & Accessibility
	const [shareAnalytics, setShareAnalytics] = useState(true);
	const [personalizeAI, setPersonalizeAI] = useState(true);
	const [reduceMotion, setReduceMotion] = useState(false);
	const [fontScale, setFontScale] = useState(100);

	// Integrations
	const [integrations, setIntegrations] = useState<{ platform: string; connected: boolean }[]>([
		{ platform: "Instagram", connected: true },
		{ platform: "Facebook", connected: false },
		{ platform: "Twitter/X", connected: false },
		{ platform: "LinkedIn", connected: true },
		{ platform: "YouTube", connected: false },
		{ platform: "TikTok", connected: false },
	]);

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth/login");
		}
	}, [status, router]);

	useEffect(() => {
		if (session?.user) {
			setName(session.user.name || "");
			setEmail(session.user.email || "");
		}
	}, [session]);

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

	const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	function toggleDay(d: string) {
		setWorkDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
	}

	function toggleIntegration(p: string) {
		setIntegrations(prev => prev.map(i => i.platform === p ? { ...i, connected: !i.connected } : i));
	}

	function handleSaveProfile(e: React.FormEvent) {
		e.preventDefault();
		alert("Profile saved (demo)");
	}

	function handleSaveNotifications(e: React.FormEvent) {
		e.preventDefault();
		alert("Notification preferences saved (demo)");
	}

	function handleSaveScheduling(e: React.FormEvent) {
		e.preventDefault();
		alert("Scheduling preferences saved (demo)");
	}

	function handleChangePassword(e: React.FormEvent) {
		e.preventDefault();
		if (!currentPassword || newPassword.length < 8 || newPassword !== confirmPassword) {
			alert("Please check your password inputs.");
			return;
		}
		alert("Password updated (demo)");
		setCurrentPassword("");
		setNewPassword("");
		setConfirmPassword("");
	}

	function handleTwoFactorToggle() {
		setTwoFactor(v => !v);
	}

	function revokeOtherSessions() {
		setSessions(prev => prev.filter(s => s.current));
		alert("Signed out from other sessions (demo)");
	}

	function generateApiKey() {
		if (!newKeyLabel.trim()) {
			alert("Add a label for the new key");
			return;
		}
		const id = `k_${Math.random().toString(36).slice(2, 8)}`;
		const secretTail = Math.random().toString(36).slice(2, 6);
		const key = `mk_live_************************${secretTail}`;
		setApiKeys(prev => [{ id, label: newKeyLabel.trim(), key, createdAt: new Date().toISOString().slice(0, 10), active: true }, ...prev]);
		setNewKeyLabel("");
	}

	function revokeKey(id: string) {
		setApiKeys(prev => prev.map(k => k.id === id ? { ...k, active: false } : k));
	}

	function saveWebhook() {
		alert("Webhook settings saved (demo)");
	}

	function manageBilling() {
		alert("Redirecting to billing portal (demo)");
	}

	function saveContentDefaults(e: React.FormEvent) {
		e.preventDefault();
		alert("Content defaults saved (demo)");
	}

	function exportData() {
		alert("Data export requested (demo)");
	}

	function deleteAccount() {
		if (confirm("This will permanently delete your account. Continue?")) {
			alert("Account deletion scheduled (demo)");
		}
	}

	return (
		<div className="px-4 py-6 md:p-8">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Left rail */}
					<div className="space-y-6 lg:col-span-2">
						{/* Profile */}
						<form onSubmit={handleSaveProfile} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
									<input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
									<input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
									<select value={timezone} onChange={e => setTimezone(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
										<option value={timezone}>{timezone}</option>
										<option value="UTC">UTC</option>
										<option value="America/New_York">America/New_York</option>
										<option value="Europe/London">Europe/London</option>
										<option value="Africa/Lagos">Africa/Lagos</option>
									</select>
								</div>
							</div>
							<div className="mt-4 flex gap-3">
								<button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save Profile</button>
								<button type="button" className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Change Password</button>
							</div>
						</form>

						{/* Security */}
						<form onSubmit={handleChangePassword} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Current password</label>
									<input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
									<input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Confirm new password</label>
									<input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
								</div>
							</div>
							<div className="mt-4 flex items-center gap-3">
								<button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Update Password</button>
								<label className="flex items-center gap-2 text-sm text-gray-800 ml-auto">
									<input type="checkbox" checked={twoFactor} onChange={handleTwoFactorToggle} /> Enable 2FA
								</label>
								<select value={twoFactorMethod} onChange={e => setTwoFactorMethod(e.target.value as any)} className="px-2 py-2 border border-gray-300 rounded-lg">
									<option value="authenticator">Authenticator App</option>
									<option value="sms">SMS</option>
								</select>
							</div>
						</form>

						{/* Notifications */}
						<form onSubmit={handleSaveNotifications} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
							<div className="space-y-3">
								<label className="flex items-center gap-3 text-sm text-gray-800">
									<input type="checkbox" checked={notifyEmail} onChange={e => setNotifyEmail(e.target.checked)} /> Email summaries and alerts
								</label>
								<label className="flex items-center gap-3 text-sm text-gray-800">
									<input type="checkbox" checked={notifyPush} onChange={e => setNotifyPush(e.target.checked)} /> Push notifications (browser)
								</label>
								<label className="flex items-center gap-3 text-sm text-gray-800">
									<input type="checkbox" checked={notifyDigest} onChange={e => setNotifyDigest(e.target.checked)} /> Weekly performance digest
								</label>
							</div>
							<div className="mt-4">
								<button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save Preferences</button>
							</div>
						</form>

						{/* Scheduling */}
						<form onSubmit={handleSaveScheduling} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">Scheduling</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Working Days</label>
									<div className="flex flex-wrap gap-2">
										{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
											<button type="button" key={d} onClick={() => toggleDay(d)} className={`px-3 py-1 rounded-full text-sm border ${workDays.includes(d) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>{d}</button>
										))}
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Posting Window</label>
									<div className="flex items-center gap-2">
										<input type="time" value={postWindow.start} onChange={e => setPostWindow({ ...postWindow, start: e.target.value })} className="px-2 py-2 border border-gray-300 rounded-lg" />
										<span className="text-gray-600">to</span>
										<input type="time" value={postWindow.end} onChange={e => setPostWindow({ ...postWindow, end: e.target.value })} className="px-2 py-2 border border-gray-300 rounded-lg" />
									</div>
								</div>
							</div>
							<div className="mt-4">
								<button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save Scheduling</button>
							</div>
						</form>

						{/* Content Defaults */}
						<form onSubmit={(e) => { e.preventDefault(); alert('Content defaults saved (demo)'); }} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">Content Defaults</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Default Tone</label>
									<select value={"informative"} onChange={() => {}} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
										<option value="informative">Informative</option>
										<option value="playful">Playful</option>
										<option value="professional">Professional</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Default Hashtags</label>
									<input value="#marketing #media #growth" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
									<p className="text-xs text-gray-500 mt-1">Separate with spaces</p>
								</div>
							</div>
							<div className="mt-4">
								<button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save Defaults</button>
							</div>
						</form>

						{/* Privacy & Accessibility */}
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Accessibility</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-3">
									<label className="flex items-center gap-3 text-sm text-gray-800">
										<input type="checkbox" defaultChecked /> Share anonymized analytics to improve product
									</label>
									<label className="flex items-center gap-3 text-sm text-gray-800">
										<input type="checkbox" defaultChecked /> Allow AI to personalize suggestions
									</label>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Reduce Motion</label>
									<label className="flex items-center gap-2 text-sm text-gray-800">
										<input type="checkbox" /> Prefer reduced animations
									</label>
									<label className="block text-sm font-medium text-gray-700 mt-3 mb-1">Font size</label>
									<input type="range" min={90} max={120} step={5} defaultValue={100} className="w-full" />
									<p className="text-xs text-gray-500">100%</p>
								</div>
							</div>
							<div className="mt-4 flex gap-3">
								<button onClick={() => alert('Data export requested (demo)')} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Export Data</button>
								<button onClick={() => alert('Account deletion scheduled (demo)')} className="px-4 py-2 rounded-lg border border-red-300 text-red-700 hover:bg-red-50">Delete Account</button>
							</div>
						</div>
					</div>

					{/* Right rail */}
					<div className="space-y-6">
						{/* Integrations */}
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h2>
							<div className="space-y-3">
								{integrations.map(i => (
									<div key={i.platform} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
										<div className="text-sm font-medium text-gray-900">{i.platform}</div>
										<button onClick={() => toggleIntegration(i.platform)} className={`px-3 py-1 rounded-lg text-sm ${i.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
											{i.connected ? 'Connected' : 'Connect'}
										</button>
									</div>
								))}
							</div>
						</div>

						{/* API Keys */}
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">API Keys</h2>
							<div className="flex flex-col sm:flex-row gap-2 mb-3">
								<input placeholder="Label (e.g., server)" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" />
								<button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Generate</button>
							</div>
							<div className="space-y-2">
								<div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-900">Primary</p>
										<p className="text-xs text-gray-500">mk_live_************************1234 • Created 2024-10-01</p>
									</div>
									<div className="flex items-center gap-2">
										<span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Active</span>
										<button className="px-2 py-1 text-xs rounded border border-gray-300 hover:bg-gray-50">Revoke</button>
									</div>
								</div>
							</div>
						</div>

						{/* Webhooks */}
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">Webhooks</h2>
							<div className="space-y-3">
								<input placeholder="Endpoint URL" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
								<input placeholder="Signing Secret" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
								<div className="flex flex-wrap gap-3 text-sm">
									<label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Posted</label>
									<label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Scheduled</label>
									<label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Failed</label>
								</div>
								<button className="mt-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save Webhook</button>
							</div>
						</div>

						{/* Billing & Plan */}
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">Billing & Plan</h2>
							<p className="text-sm text-gray-700 mb-2">Current plan: <span className="font-medium">Pro</span></p>
							<div className="mb-3">
								<div className="h-2 bg-gray-100 rounded-full overflow-hidden">
									<div className="h-full bg-blue-600" style={{ width: `21%` }} />
								</div>
								<p className="text-xs text-gray-500 mt-1">42 / 200 posts this month</p>
							</div>
							<div className="flex gap-2">
								<button className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Update Payment Method</button>
								<button onClick={manageBilling} className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Manage Subscription</button>
							</div>
						</div>

						{/* Active Sessions */}
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h2>
							<div className="space-y-2">
								{sessions.map(s => (
									<div key={s.id} className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
										<div>
											<p className="text-sm font-medium text-gray-900">{s.device}{s.current ? ' • This device' : ''}</p>
											<p className="text-xs text-gray-500">{s.location} • Last active {s.lastActive}</p>
										</div>
										{!s.current && <button className="px-2 py-1 text-xs rounded border border-gray-300 hover:bg-gray-50">Sign out</button>}
									</div>
								))}
							</div>
							<button onClick={revokeOtherSessions} className="mt-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Sign out of other sessions</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
} 