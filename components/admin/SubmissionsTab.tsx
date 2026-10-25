'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Trash2, Loader2, Inbox, ArrowUpRight } from 'lucide-react';
import { ContactSubmission } from '@/types/portfolio';
import { PortfolioStore } from '@/lib/data/portfolio-store';

export function SubmissionsTab() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await PortfolioStore.getContactSubmissions();
        setSubmissions(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-[#85E4FF]/40">
        <h2 className="text-xl sm:text-3xl font-extrabold text-white">Contact Inquiries</h2>
        <p className="text-xs sm:text-sm text-[#A8C2DA] mt-1">
          Messages delivered through the public contact form.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center">
          <Loader2 className="w-8 h-8 text-[#85E4FF] animate-spin mx-auto" />
        </div>
      ) : submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#85E4FF]/20 pb-3">
                <div>
                  <h4 className="text-base font-bold text-white">{sub.name}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#A8C2DA] mt-0.5">
                    <span className="flex items-center space-x-1">
                      <Mail className="w-3.5 h-3.5 text-[#85E4FF]" />
                      <a href={`mailto:${sub.email}`} className="text-[#85E4FF] hover:underline">
                        {sub.email}
                      </a>
                    </span>
                    {sub.phone && (
                      <span className="flex items-center space-x-1">
                        <Phone className="w-3.5 h-3.5 text-[#85E4FF]" />
                        <a href={`tel:${sub.phone}`} className="text-[#85E4FF] hover:underline">
                          {sub.phone}
                        </a>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#168BFF]/20 text-[#85E4FF] border border-[#85E4FF]/30">
                    {sub.project_type || 'General Inquiry'}
                  </span>
                  <span className="text-[10px] text-[#A8C2DA]/70">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#F5FAFF] leading-relaxed whitespace-pre-wrap">
                {sub.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto space-y-3 border border-[#85E4FF]/30">
          <Inbox className="w-10 h-10 text-[#85E4FF] mx-auto opacity-70" />
          <h3 className="text-base font-bold text-white">No Inquiries Yet</h3>
          <p className="text-xs text-[#A8C2DA]">
            Inquiries sent through the &quot;Get in Touch&quot; form on the website will be cataloged here.
          </p>
        </div>
      )}
    </div>
  );
}
