"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Briefcase, Building, ExternalLink, Calendar, Search, AlertCircle } from 'lucide-react';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/data/jobs.json');
        if (!res.ok) throw new Error('Failed to fetch jobs data');
        const data = await res.json();
        setJobs(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while loading jobs.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return jobs;
    
    const lowerQuery = searchQuery.toLowerCase();
    return jobs.filter((job) => {
      const titleMatch = job.title?.toLowerCase().includes(lowerQuery);
      const companyMatch = job.company?.toLowerCase().includes(lowerQuery);
      const locationMatch = job.location?.toLowerCase().includes(lowerQuery);
      const tagsMatch = job.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery));
      return titleMatch || companyMatch || locationMatch || tagsMatch;
    });
  }, [jobs, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
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
              className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-lg shadow-sm transition duration-150 ease-in-out"
              placeholder="Search by title, company, skills, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* States */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500 font-medium">Loading latest jobs...</p>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-800">Error Loading Jobs</h3>
            <p className="text-red-600 mt-2">{error}</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No jobs found</h3>
            <p className="text-gray-500 mt-2">
              {searchQuery ? `We couldn't find any jobs matching "${searchQuery}". Try adjusting your keywords.` : "The scraper hasn't run yet or no jobs were found."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job: any) => (
              <div key={job.id} className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {job.source}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(job.first_seen_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {job.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    {job.company && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium text-gray-900">{job.company}</span>
                      </div>
                    )}
                    
                    {job.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{job.location}</span>
                        {job.is_remote && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Remote
                          </span>
                        )}
                      </div>
                    )}
                    
                    {job.job_type && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{job.job_type}</span>
                      </div>
                    )}
                  </div>

                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.tags.slice(0, 4).map((tag: string, i: number) => (
                        <span key={i} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                          {tag}
                        </span>
                      ))}
                      {job.tags.length > 4 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-500">
                          +{job.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
