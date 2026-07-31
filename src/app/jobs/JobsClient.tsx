"use client";

import React, { useState, useMemo } from 'react';
import { MapPin, Briefcase, Building, ExternalLink, Calendar, Search, AlertCircle, Filter } from 'lucide-react';

export default function JobsClient({ initialJobs, serverError }: { initialJobs: any[], serverError?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [seniorities, setSeniorities] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [providers, setProviders] = useState<string[]>([]);

  const filteredJobs = useMemo(() => {
    let result = initialJobs || [];

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((job) => {
        const titleMatch = job.title?.toLowerCase().includes(lowerQuery);
        const companyMatch = job.company?.toLowerCase().includes(lowerQuery);
        const locationMatch = job.location?.toLowerCase().includes(lowerQuery);
        return titleMatch || companyMatch || locationMatch;
      });
    }

    if (categories.length > 0) {
      result = result.filter(job => {
        const searchString = `${job.title} ${job.tags_json}`.toLowerCase();
        return categories.some(cat => searchString.includes(cat.toLowerCase()));
      });
    }

    if (seniorities.length > 0) {
      result = result.filter(job => {
        const searchString = `${job.title} ${job.tags_json}`.toLowerCase();
        return seniorities.some(sen => searchString.includes(sen.toLowerCase()));
      });
    }

    if (locations.length > 0) {
      result = result.filter(job => {
        const isRemote = job.is_remote === 1 || job.location?.toLowerCase().includes('remote');
        const matchesRemote = locations.includes('remote') && isRemote;
        const matchesOnsite = locations.includes('onsite') && !isRemote;
        return matchesRemote || matchesOnsite;
      });
    }

    if (providers.length > 0) {
      result = result.filter(job => providers.includes(job.source?.toLowerCase()));
    }

    return result;
  }, [initialJobs, searchQuery, categories, seniorities, locations, providers]);

  const toggleFilter = (setFilter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setFilter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const FilterSection = ({ title, options, state, setState }: { title: string, options: { label: string, value: string }[], state: string[], setState: React.Dispatch<React.SetStateAction<string[]>> }) => (
    <div className="mb-6">
      <h3 className="font-bold text-primary-300 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={state.includes(option.value)}
              onChange={() => toggleFilter(setState, option.value)}
              className="h-4 w-4 text-accent-400 border-neutral-600 rounded focus:ring-accent-400 cursor-pointer bg-white/10"
            />
            <span className="text-neutral-100 group-hover:text-accent-300 transition-colors text-sm font-medium">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent font-main tracking-eyebrow py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-primary-200 sm:text-5xl">
            Software Engineering Jobs
          </h1>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-accent-200/50 rounded-xl leading-5 bg-white/5 text-neutral-50 placeholder-neutral-300 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300 sm:text-lg shadow-sm transition duration-150 ease-in-out"
              placeholder="Search by title, company, skills, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <div className="bg-white/5 p-6 rounded-xl shadow-sm border border-accent-200/50 sticky top-4">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <Filter className="w-5 h-5 text-neutral-300" />
                <h2 className="text-lg font-bold text-primary-200">Filters</h2>
              </div>
              
              <FilterSection 
                title="Category" 
                state={categories} 
                setState={setCategories}
                options={[
                  { label: "Web Development", value: "web development" },
                  { label: "Full Stack", value: "full stack" }
                ]} 
              />
              
              <FilterSection 
                title="Seniority Level" 
                state={seniorities} 
                setState={setSeniorities}
                options={[
                  { label: "Junior", value: "junior" },
                  { label: "Mid-Level", value: "mid" },
                  { label: "Senior", value: "senior" }
                ]} 
              />
              
              <FilterSection 
                title="Work Location" 
                state={locations} 
                setState={setLocations}
                options={[
                  { label: "Remote", value: "remote" },
                  { label: "Onsite", value: "onsite" }
                ]} 
              />
              
              <FilterSection 
                title="Website Provider" 
                state={providers} 
                setState={setProviders}
                options={[
                  { label: "LinkedIn", value: "linkedin" },
                  { label: "Wuzzuf", value: "wuzzuf" }
                ]} 
              />
            </div>
          </aside>

          {/* Main Grid */}
          <main className="w-full lg:w-3/4">
            {/* States */}
            {serverError ? (
              <div className="max-w-2xl mx-auto bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-red-400">Database Connection Error</h3>
                <p className="text-red-300 mt-2">{serverError}</p>
                <p className="text-red-400/80 text-sm mt-2">Have you configured POSTGRES_URL in Vercel?</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="max-w-2xl mx-auto bg-white/5 border border-accent-200/50 rounded-xl p-10 text-center shadow-sm">
                <Search className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-accent-300">No jobs found</h3>
                <p className="text-neutral-100 mt-2">
                  {searchQuery || categories.length || seniorities.length || locations.length || providers.length 
                    ? "We couldn't find any jobs matching your criteria. Try adjusting your filters." 
                    : "The database is empty or hasn't synced yet."}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredJobs.map((job: any) => {
                  let parsedTags = [];
                  try {
                      parsedTags = typeof job.tags_json === 'string' ? JSON.parse(job.tags_json) : (job.tags_json || []);
                  } catch (e) {}

                  // Deduplicate remote tag
                  parsedTags = parsedTags.filter((tag: string) => tag.toLowerCase() !== 'remote');

                  return (
                  <div key={job.id} className="bg-white/10 overflow-hidden rounded-xl shadow-sm border border-accent-200/50 hover:shadow-md transition-shadow duration-300 flex flex-col">
                    <div className="p-6 flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-200 capitalize border border-primary-500/30">
                          {job.source}
                        </span>
                        <span className="text-xs text-neutral-300 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(job.first_seen_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-primary-200 mb-2 line-clamp-2">
                        {job.title}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        {job.company && (
                          <div className="flex items-center text-sm text-neutral-100">
                            <Building className="w-4 h-4 mr-2 text-neutral-400" />
                            <span className="font-medium text-neutral-50 line-clamp-1">{job.company}</span>
                          </div>
                        )}
                        
                        {job.location && (
                          <div className="flex items-center text-sm text-neutral-100">
                            <MapPin className="w-4 h-4 mr-2 text-neutral-400" />
                            <span className="line-clamp-1">{job.location}</span>
                            {job.is_remote === 1 && (
                              <span className="ml-2 inline-flex flex-shrink-0 items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-600/20 text-accent-300 border border-accent-600/30">
                                Remote
                              </span>
                            )}
                          </div>
                        )}
                        
                        {job.job_type && (
                          <div className="flex items-center text-sm text-neutral-100">
                            <Briefcase className="w-4 h-4 mr-2 text-neutral-400" />
                            <span className="line-clamp-1">{job.job_type}</span>
                          </div>
                        )}
                      </div>

                      {parsedTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {parsedTags.slice(0, 3).map((tag: string, i: number) => (
                            <span key={i} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/5 text-neutral-300 border border-white/10 line-clamp-1">
                              {tag}
                            </span>
                          ))}
                          {parsedTags.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/5 text-neutral-400 border border-white/10">
                              +{parsedTags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="px-6 py-4 bg-black/20 border-t border-white/5 mt-auto">
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-accent-600 rounded-lg hover:bg-accent-500 transition-colors"
                      >
                        Apply Now
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                )})}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
