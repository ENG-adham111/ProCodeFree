import React, { useEffect, useState } from 'react';
import { AuthorProfile } from '../types';
import { storageService } from '../services/storageService';
import { Mail, Twitter, Globe, Linkedin, ExternalLink } from 'lucide-react';

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState<AuthorProfile | null>(null);

  useEffect(() => {
    const data = storageService.getProfile();
    setProfile(data);
  }, []);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#fafafa] font-serif text-stone-800">
      {/* Cover Image */}
      <div className="h-64 md:h-80 w-full overflow-hidden">
        <img src={profile.coverImageUrl} alt="Cover" className="w-full h-full object-cover opacity-90" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 mb-20">
        {/* Profile Header */}
        <div className="bg-white p-8 rounded-none shadow-xl border-t-4 border-stone-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0 -mt-20 bg-stone-200">
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-grow space-y-2">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900">{profile.name}</h1>
              <p className="text-lg text-stone-500 font-sans font-medium uppercase tracking-wider">{profile.tagline}</p>
            </div>

            <div className="flex gap-4 text-stone-400">
               {profile.social.twitter && (
                 <a href={profile.social.twitter} target="_blank" rel="noreferrer" className="hover:text-stone-900 transition-colors"><Twitter size={24} /></a>
               )}
               {profile.social.linkedin && (
                 <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-stone-900 transition-colors"><Linkedin size={24} /></a>
               )}
               {profile.social.website && (
                 <a href={profile.social.website} target="_blank" rel="noreferrer" className="hover:text-stone-900 transition-colors"><Globe size={24} /></a>
               )}
               {profile.social.email && (
                 <a href={`mailto:${profile.social.email}`} className="hover:text-stone-900 transition-colors"><Mail size={24} /></a>
               )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-stone-100">
            <h3 className="font-sans text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">About the Author</h3>
            <p className="text-lg leading-relaxed text-stone-700 max-w-3xl">
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Books Section */}
        <div className="mt-16 space-y-12">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-3xl font-bold text-stone-900">Published Works</h2>
            <div className="h-px bg-stone-300 flex-grow"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {profile.books.map(book => (
              <div key={book.id} className="flex gap-6 group">
                <div className="w-32 h-48 shrink-0 shadow-md rounded-md overflow-hidden transition-transform group-hover:-translate-y-1">
                  <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">{book.title}</h3>
                    <p className="text-stone-600 leading-relaxed text-sm line-clamp-3">{book.description}</p>
                  </div>
                  <a 
                    href={book.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-stone-900 font-sans font-semibold text-sm uppercase tracking-wide border-b-2 border-stone-200 hover:border-stone-900 pb-1 transition-all w-fit mt-4"
                  >
                    Buy Now <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Articles Section */}
        <div className="mt-20 space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-3xl font-bold text-stone-900">Selected Articles</h2>
            <div className="h-px bg-stone-300 flex-grow"></div>
          </div>

          <div className="grid gap-6">
            {profile.articles.map(article => (
              <a 
                key={article.id} 
                href={article.link}
                target="_blank"
                rel="noreferrer" 
                className="block group bg-white p-6 border border-stone-200 hover:border-stone-400 transition-colors shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-xl font-bold text-stone-900 group-hover:underline decoration-stone-400 underline-offset-4 mb-2">
                      {article.title}
                    </h3>
                    {article.publication && (
                      <span className="font-sans text-xs font-bold text-stone-500 uppercase tracking-widest">
                        {article.publication}
                      </span>
                    )}
                  </div>
                  {article.publishedDate && (
                    <span className="font-sans text-sm text-stone-400 whitespace-nowrap ml-4">
                      {article.publishedDate}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};