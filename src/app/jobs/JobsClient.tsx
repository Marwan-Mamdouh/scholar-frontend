"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, User, Briefcase, Code, Globe, AlertCircle } from 'lucide-react';

const getCompanyColor = (companyName: string) => {
  const colors = [
    'bg-blue-600',
    'bg-cyan-600',
    'bg-red-600',
    'bg-emerald-600',
    'bg-purple-600',
    'bg-orange-600',
    'bg-pink-600',
    'bg-indigo-600'
  ];
  if (!companyName) return colors[0];
  let hash = 0;
  for (let i = 0; i < companyName.length; i++) {
    hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

interface JobData {
  id: string | number;
  title: string;
  company?: string;
  tags_json?: string;
  location?: string;
  url?: string;
  job_type?: string;
  first_seen_at?: string;
}

export default function JobsClient({ initialJobs, serverError }: { initialJobs: JobData[], serverError?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  const filteredJobs = useMemo(() => {
    let result = (initialJobs || []);

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(job => 
        job.title?.toLowerCase().includes(lowerQuery) || 
        job.company?.toLowerCase().includes(lowerQuery) ||
        job.tags_json?.toLowerCase().includes(lowerQuery)
      );
    }

    if (selectedCompany) {
      result = result.filter(job => job.company?.toLowerCase() === selectedCompany.toLowerCase());
    }

    // Simplified filtering logic for demo
    return result;
  }, [initialJobs, searchQuery, selectedCompany]);

  const uniqueCompanies = useMemo(() => {
    const comps = new Set((initialJobs || []).map(j => j.company).filter(Boolean));
    return Array.from(comps).sort() as string[];
  }, [initialJobs]);

  return (
    <div className="min-h-screen bg-[#09111e] font-main tracking-eyebrow pt-32 pb-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      
      {/* Background Glows matching Figma */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-900/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-8 tracking-wide uppercase">
          Global Career Map
        </h1>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12 bg-[#1a2332]/80 backdrop-blur-md p-2 rounded-2xl border border-white/5 shadow-lg">
          
          {/* Countries Dropdown */}
          <div className="relative flex-1 lg:max-w-[280px]">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Globe className="h-4 w-4 text-neutral-400" />
            </div>
            <select 
              className="w-full appearance-none bg-[#111827]/50 border border-white/5 text-neutral-300 text-sm rounded-xl py-3.5 pl-11 pr-10 focus:outline-none focus:border-white/20 cursor-pointer"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="" className="bg-[#0f172a]">Select Countries (0)</option>
              <option value="EG" className="bg-[#0f172a]">Egypt</option>
              <option value="US" className="bg-[#0f172a]">United States</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-neutral-400" />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-400" />
            </div>
            <input
              type="text"
              className="w-full bg-[#111827]/50 border border-white/5 text-neutral-200 text-sm rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-white/20 placeholder-neutral-500"
              placeholder="Search position, stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Disciplines Dropdown */}
          <div className="relative flex-1 lg:max-w-[280px]">
            <select 
              className="w-full appearance-none bg-[#111827]/50 border border-white/5 text-neutral-300 text-sm rounded-xl py-3.5 pl-5 pr-10 focus:outline-none focus:border-white/20 cursor-pointer"
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
            >
              <option value="" className="bg-[#0f172a]">All Disciplines</option>
              <option value="engineering" className="bg-[#0f172a]">Engineering</option>
              <option value="software" className="bg-[#0f172a]">Software</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-neutral-400" />
            </div>
          </div>

          {/* Companies Dropdown */}
          <div className="relative flex-1 lg:max-w-[280px]">
            <select 
              className="w-full appearance-none bg-[#111827]/50 border border-white/5 text-neutral-300 text-sm rounded-xl py-3.5 pl-5 pr-10 focus:outline-none focus:border-white/20 cursor-pointer"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="" className="bg-[#0f172a]">All Companies</option>
              {uniqueCompanies.map((c: string) => (
                <option key={c} value={c} className="bg-[#0f172a]">{c}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-neutral-400" />
            </div>
          </div>
          
        </div>

        {serverError && (
          <div className="max-w-2xl mx-auto bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center mb-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-400">Database Connection Error</h3>
            <p className="text-red-300 mt-2">{serverError}</p>
          </div>
        )}

        {/* Job Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job: JobData) => {
            
            let parsedTags = [];
            try {
                parsedTags = typeof job.tags_json === 'string' ? JSON.parse(job.tags_json) : (job.tags_json || []);
            } catch {}
            
            // Extract some mockup tags for display matching Figma
            const seniority = parsedTags.find((t: string) => t.toLowerCase().includes('senior') || t.toLowerCase().includes('junior') || t.toLowerCase().includes('mid')) || 'Mid-Level';
            const discipline = parsedTags.filter((t: string) => !t.toLowerCase().includes('senior') && !t.toLowerCase().includes('junior') && !t.toLowerCase().includes('mid')).slice(0, 3).join(', ') || 'Engineering';
            const locationShort = (job.location?.includes('Egypt') || job.location?.includes('Cairo')) ? 'EG' : 'Remote';
            
            return (
              <div 
                key={job.id} 
                onClick={() => window.open(job.url, '_blank')}
                className="bg-[#151c2c]/80 backdrop-blur-sm border border-white/5 hover:border-white/10 hover:bg-[#1a2336] transition-all cursor-pointer rounded-2xl p-6 flex flex-col relative group"
              >
                {/* Top Row: Logo and EG Badge */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-sm ${getCompanyColor(job.company || '')}`}>
                    {job.company ? job.company.charAt(0).toUpperCase() : 'C'}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300 text-xs font-bold tracking-wider">
                      EG
                    </div>
                  </div>
                </div>

                {/* Title and Company */}
                <h3 className="text-white font-bold text-[17px] leading-snug mb-1.5 line-clamp-2">
                  {job.title}
                </h3>
                <p className="text-neutral-400 text-sm mb-6">
                  {job.company || 'Unknown Company'}
                </p>

                {/* Tags (Bottom) */}
                <div className="mt-auto flex flex-wrap gap-2">
                  
                  {/* Seniority */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <User className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold">{seniority}</span>
                  </div>
                  
                  {/* Job Type */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold">{job.job_type || 'Full-time'}</span>
                  </div>
                  
                  {/* Discipline / Tags */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 max-w-[200px]">
                    <Code className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-[11px] font-bold truncate">{discipline}</span>
                  </div>
                  
                  {/* Location Code */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-[11px] font-bold">{locationShort}</span>
                  </div>
                  
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
