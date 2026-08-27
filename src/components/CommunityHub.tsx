'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import {
  MessageSquare,
  Pin,
  Megaphone,
  Send,
  ShieldCheck,
  Search,
  Info,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

export const CommunityHub: React.FC = () => {
  const {
    currentUser,
    chatMessages,
    sendChatMessage,
    pinChatMessage,
    setLoginModalOpen,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isAnnouncementToggle, setIsAnnouncementToggle] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'announcements' | 'pinned' | 'guidelines'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    if (activeTab !== 'guidelines') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages.length, activeTab]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    if (currentUser.role === 'guest') {
      alert('Please sign in to post messages in the community group chat.');
      setLoginModalOpen(true);
      return;
    }

    sendChatMessage(inputMessage.trim(), isAnnouncementToggle);
    setInputMessage('');
    setIsAnnouncementToggle(false);
  };

  // Helper for generating initials from sender name
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Helper for avatar background color
  const getAvatarBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-gradient-to-br from-rose-500 to-red-600 text-white ring-2 ring-rose-200 dark:ring-rose-900/60 shadow-sm';
      case 'teacher':
        return 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white ring-2 ring-blue-200 dark:ring-blue-900/60 shadow-sm';
      case 'student':
        return 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white ring-2 ring-emerald-200 dark:ring-emerald-900/60 shadow-sm';
      default:
        return 'bg-stone-300 dark:bg-stone-700 text-stone-700 dark:text-stone-300';
    }
  };

  // Filter messages based on active tab and search query
  const filteredMessages = chatMessages.filter((msg) => {
    const matchesTab =
      activeTab === 'all'
        ? true
        : activeTab === 'announcements'
        ? msg.isAnnouncement
        : activeTab === 'pinned'
        ? msg.isPinned
        : false;

    const matchesSearch =
      searchQuery.trim() === '' ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.senderName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const announcementCount = chatMessages.filter((m) => m.isAnnouncement).length;
  const pinnedCount = chatMessages.filter((m) => m.isPinned).length;

  return (
    <div className="space-y-4 py-2">
      {/* Filter Tabs & Search Header (Fixed Top) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
        {/* Navigation Tabs */}
        <div className="flex items-center bg-stone-100 dark:bg-stone-800/80 p-1 rounded-xl gap-1 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            All ({chatMessages.length})
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'announcements'
                ? 'bg-white dark:bg-stone-700 text-amber-700 dark:text-amber-300 shadow-xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-amber-500" />
            <span>Announcements ({announcementCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('pinned')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'pinned'
                ? 'bg-white dark:bg-stone-700 text-red-600 dark:text-red-400 shadow-xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Pin className="w-3.5 h-3.5 text-red-500" />
            <span>Pinned ({pinnedCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'guidelines'
                ? 'bg-white dark:bg-stone-700 text-sage-700 dark:text-sage-300 shadow-xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
            <span>Guidelines</span>
          </button>
        </div>

        {/* Search Bar (Only visible when not on Guidelines tab) */}
        {activeTab !== 'guidelines' && (
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="pl-8 pr-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs w-full sm:w-52 focus:w-64 transition-all focus:outline-none focus:ring-1 focus:ring-sage-500"
            />
          </div>
        )}
      </div>

      {/* Content Area */}
      {activeTab === 'guidelines' ? (
        /* Guidelines View */
        <div className="py-8 px-4 space-y-6 max-w-3xl mx-auto w-full">
          <div className="text-center space-y-2">
            <div className="p-3 bg-sage-100 dark:bg-sage-900/50 text-sage-600 rounded-2xl w-fit mx-auto border border-sage-200 dark:border-sage-800">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              Campus Community Guidelines
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Rules & best practices for productive academic discussions.
            </p>
          </div>

          <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <strong className="block font-bold text-stone-900 dark:text-white">Respectful Discussion</strong>
                <span>Share study notes, exam questions, or course inquiries respectfully with peers and faculty.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <strong className="block font-bold text-stone-900 dark:text-white">Official System Announcements</strong>
                <span>System administrators can post official system announcements and platform updates.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <strong className="block font-bold text-stone-900 dark:text-white">Academic Integrity</strong>
                <span>Follow university academic code of conduct. Do not share active live exam solutions while an exam is in progress.</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-stone-400 shrink-0" />
              <span>Active Account Session:</span>
            </div>
            <span className="font-bold text-stone-900 dark:text-white capitalize">
              {currentUser.name} ({currentUser.role})
            </span>
          </div>
        </div>
      ) : (
        /* Messages Stream Container & Input */
        <>
          {/* Chat Messages Container */}
          <div className="space-y-3.5 max-h-[calc(100vh-230px)] overflow-y-auto pr-1 py-1">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => {
                const isMine = msg.senderName === currentUser.name;
                const canPin = currentUser.role === 'admin' || currentUser.role === 'teacher';
                const avatarInitials = getInitials(msg.senderName);

                return (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-2xl transition-all space-y-2 border ${
                      msg.isAnnouncement
                        ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                        : isMine
                        ? 'bg-sage-50/70 dark:bg-sage-950/40 border-sage-200 dark:border-sage-800/80 ml-2 md:ml-4'
                        : 'bg-white dark:bg-stone-800/50 border-stone-200/80 dark:border-stone-700/60 mr-2 md:mr-4 shadow-xs'
                    }`}
                  >
                    {/* Message Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        {/* User Initial Avatar */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 ${getAvatarBadgeClass(
                            msg.role
                          )}`}
                        >
                          {avatarInitials}
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-stone-900 dark:text-white text-xs">
                            {msg.senderName}
                          </span>

                          {isMine && (
                            <span className="text-[9px] font-semibold text-sage-700 dark:text-sage-300 bg-sage-100 dark:bg-sage-900/60 px-1.5 py-0.2 rounded">
                              You
                            </span>
                          )}

                          <span
                            className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                              msg.role === 'admin'
                                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                                : msg.role === 'teacher'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            }`}
                          >
                            {msg.role}
                          </span>

                          {msg.isAnnouncement && (
                            <span className="inline-flex items-center gap-1 bg-amber-200/80 dark:bg-amber-900/80 text-amber-900 dark:text-amber-100 text-[9px] font-bold px-2 py-0.5 rounded-full">
                              <Megaphone className="w-2.5 h-2.5" /> Announcement
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Timestamp & Pin action */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-[10px] text-stone-400">{msg.timestamp}</span>
                        {canPin ? (
                          <button
                            onClick={() => pinChatMessage(msg.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              msg.isPinned
                                ? 'text-red-500 font-bold bg-red-100/60 dark:bg-red-950/80 border border-red-300 dark:border-red-800'
                                : 'text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                            }`}
                            title={msg.isPinned ? 'Unpin message' : 'Pin message'}
                          >
                            <Pin className={`w-3.5 h-3.5 ${msg.isPinned ? 'fill-red-500 text-red-500' : ''}`} />
                          </button>
                        ) : (
                          msg.isPinned && (
                            <div
                              className="p-1.5 rounded-lg text-red-500 font-bold bg-red-100/60 dark:bg-red-950/80 border border-red-300 dark:border-red-800"
                              title="Pinned message"
                            >
                              <Pin className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Message Body */}
                    <p className="text-stone-800 dark:text-stone-200 text-xs leading-relaxed pl-9 font-normal">
                      {msg.message}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center space-y-2">
                <MessageSquare className="w-8 h-8 mx-auto text-stone-300 dark:text-stone-600" />
                <p className="text-xs text-stone-400 font-medium">No messages found for this filter.</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form Panel */}
          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-2">
            {currentUser.role === 'admin' && (
              <div className="flex items-center gap-2 px-1">
                <input
                  type="checkbox"
                  id="announcementCheck"
                  checked={isAnnouncementToggle}
                  onChange={(e) => setIsAnnouncementToggle(e.target.checked)}
                  className="w-3.5 h-3.5 text-amber-600 rounded focus:ring-amber-500 accent-amber-600"
                />
                <label
                  htmlFor="announcementCheck"
                  className="text-xs font-semibold text-amber-800 dark:text-amber-400 cursor-pointer flex items-center gap-1.5"
                >
                  <Megaphone className="w-3.5 h-3.5 text-amber-600" />
                  <span>Post as Official System Announcement</span>
                </label>
              </div>
            )}

            <form onSubmit={handleSend} className="flex items-center gap-2">
              {/* Current User Avatar Preview */}
              <div
                className={`w-8.5 h-8.5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getAvatarBadgeClass(
                  currentUser.role
                )}`}
              >
                {getInitials(currentUser.name)}
              </div>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  currentUser.role === 'guest'
                    ? 'Please sign in to post messages in community...'
                    : 'Type your discussion message or question...'
                }
                className="flex-grow px-4 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:ring-2 focus:ring-sage-500 focus:outline-none transition-all"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() && currentUser.role !== 'guest'}
                className="btn-sage text-xs py-2.5 px-5 font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50 transition-all shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
