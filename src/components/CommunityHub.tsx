'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  MessageSquare,
  Pin,
  Megaphone,
  Send,
  ShieldCheck,
  User as UserIcon,
  CheckCircle,
  AlertCircle,
  Radio,
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

  const pinnedMsg = chatMessages.find((m) => m.isPinned);

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

  return (
    <div className="space-y-8 py-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-sage-600" />
            <span>Campus Community Group Chat</span>
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Open discussion forum for Students, Faculty Teachers, and System Administrators.
          </p>
        </div>

        <span className="badge-sage px-4 py-1.5 font-bold flex items-center gap-1.5">
          <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span>Live Chat Active</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar Info & Pinned Post */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-bold text-stone-900 dark:text-white text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sage-600" />
              <span>Group Chat Info</span>
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Welcome to the official University Community Chat! Share questions, study tips, or course inquiries here.
            </p>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl space-y-1 text-xs">
              <strong className="text-amber-900 dark:text-amber-300 font-bold block">
                Admin & Faculty Privileges:
              </strong>
              <p className="text-amber-800/80 dark:text-amber-400 text-[11px]">
                Administrators & Faculty can post official system announcements and pin important schedule updates to the header.
              </p>
            </div>
          </div>

          {/* Pinned Announcement Card */}
          <div className="glass-card p-6 space-y-3 border-2 border-red-500/40">
            <h4 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
              <Pin className="w-4 h-4 text-red-500" />
              <span>Pinned Announcement</span>
            </h4>
            
            {pinnedMsg ? (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-red-900 dark:text-red-300 text-[11px]">
                  <span>{pinnedMsg.senderName} ({pinnedMsg.role})</span>
                  <span className="font-mono text-[10px]">{pinnedMsg.timestamp}</span>
                </div>
                <p className="text-stone-800 dark:text-stone-200 font-medium">{pinnedMsg.message}</p>
              </div>
            ) : (
              <p className="text-xs text-stone-400 italic">No message pinned at the moment.</p>
            )}
          </div>
        </div>

        {/* Chat Stream & Message Input */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-bold text-stone-900 dark:text-white text-base">
                Public Discussion Stream
              </h3>
              <span className="text-xs text-stone-400 font-semibold">
                {chatMessages.length} Messages
              </span>
            </div>

            {/* Messages Stream */}
            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
              {chatMessages.map((msg) => {
                const isMine = msg.senderName === currentUser.name;
                const canPin = currentUser.role === 'admin' || currentUser.role === 'teacher';

                return (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-2xl space-y-1.5 transition-all ${
                      msg.isAnnouncement
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-400 dark:border-amber-700'
                        : isMine
                        ? 'bg-sage-50 dark:bg-sage-950/60 border border-sage-200 dark:border-sage-800 ml-6'
                        : 'bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 mr-6'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 dark:text-white text-xs">
                          {msg.senderName}
                        </span>
                        <span
                          className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                            msg.role === 'admin'
                              ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                              : msg.role === 'teacher'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-sage-100 text-sage-800 dark:bg-sage-950 dark:text-sage-300'
                          }`}
                        >
                          {msg.role}
                        </span>
                        {msg.isAnnouncement && (
                          <span className="badge-sage bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-[9px] font-extrabold">
                            <Megaphone className="w-3 h-3" /> Official Announcement
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-stone-400">{msg.timestamp}</span>
                        {canPin && (
                          <button
                            onClick={() => pinChatMessage(msg.id)}
                            className={`p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 ${
                              msg.isPinned ? 'text-red-500 font-bold' : ''
                            }`}
                            title="Pin message"
                          >
                            <Pin className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-stone-800 dark:text-stone-200 text-xs leading-relaxed font-medium">
                      {msg.message}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Input Form Panel */}
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 space-y-3">
              {(currentUser.role === 'admin' || currentUser.role === 'teacher') && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="announcementCheck"
                    checked={isAnnouncementToggle}
                    onChange={(e) => setIsAnnouncementToggle(e.target.checked)}
                    className="w-4 h-4 text-sage-600 rounded focus:ring-sage-500"
                  />
                  <label htmlFor="announcementCheck" className="text-xs font-bold text-amber-800 dark:text-amber-400 cursor-pointer flex items-center gap-1">
                    <Megaphone className="w-3.5 h-3.5 text-amber-600" /> Post as Official System Announcement
                  </label>
                </div>
              )}

              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={
                    currentUser.role === 'guest'
                      ? 'Please sign in to post messages...'
                      : 'Type your discussion message here...'
                  }
                  className="flex-grow px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:ring-2 focus:ring-sage-500 focus:outline-none"
                />
                <button type="submit" className="btn-sage text-xs py-2.5 px-5 font-bold flex items-center gap-1.5 shadow-sm">
                  <Send className="w-4 h-4" /> Send
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
