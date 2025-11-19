import React, { useEffect, useState } from 'react';
import { Save, Plus, Trash2, Image as ImageIcon, Link as LinkIcon, Book } from 'lucide-react';
import { AuthorProfile, Book as BookType, Article } from '../types';
import { storageService } from '../services/storageService';

export const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<AuthorProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'books' | 'articles'>('details');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(storageService.getProfile());
  }, []);

  const handleSave = () => {
    if (profile) {
      storageService.saveProfile(profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const updateField = (field: keyof AuthorProfile, value: any) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  const updateSocial = (key: string, value: string) => {
    if (profile) {
      setProfile({
        ...profile,
        social: { ...profile.social, [key]: value }
      });
    }
  };

  // Book Handlers
  const addBook = () => {
    if (!profile) return;
    const newBook: BookType = {
      id: Date.now().toString(),
      title: 'New Book Title',
      coverUrl: 'https://via.placeholder.com/300x450',
      link: '#',
      description: 'Brief description of your book.'
    };
    setProfile({ ...profile, books: [...profile.books, newBook] });
  };

  const updateBook = (id: string, field: keyof BookType, value: string) => {
    if (!profile) return;
    const updatedBooks = profile.books.map(b => 
      b.id === id ? { ...b, [field]: value } : b
    );
    setProfile({ ...profile, books: updatedBooks });
  };

  const deleteBook = (id: string) => {
    if (!profile) return;
    setProfile({ ...profile, books: profile.books.filter(b => b.id !== id) });
  };

  // Article Handlers
  const addArticle = () => {
    if (!profile) return;
    const newArticle: Article = {
      id: Date.now().toString(),
      title: 'New Article Title',
      link: '#',
      publication: 'Publication Name',
      publishedDate: new Date().toISOString().split('T')[0]
    };
    setProfile({ ...profile, articles: [...profile.articles, newArticle] });
  };

  const updateArticle = (id: string, field: keyof Article, value: string) => {
    if (!profile) return;
    const updatedArticles = profile.articles.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    );
    setProfile({ ...profile, articles: updatedArticles });
  };

  const deleteArticle = (id: string) => {
    if (!profile) return;
    setProfile({ ...profile, articles: profile.articles.filter(a => a.id !== id) });
  };

  if (!profile) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 sticky top-16 z-40 px-4 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {['details', 'books', 'articles'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-stone-900 text-white' 
                    : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors shadow-sm w-full sm:w-auto justify-center"
          >
            <Save size={18} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {activeTab === 'details' && (
          <div className="space-y-6 animate-fade-in">
            <Section title="Profile Information">
              <Input label="Full Name" value={profile.name} onChange={e => updateField('name', e.target.value)} />
              <Input label="Tagline / Role" value={profile.tagline} onChange={e => updateField('tagline', e.target.value)} />
              <div className="space-y-1">
                <label className="block text-sm font-medium text-stone-700">Bio</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-stone-500 focus:border-transparent outline-none min-h-[120px]"
                  value={profile.bio}
                  onChange={e => updateField('bio', e.target.value)}
                />
              </div>
            </Section>

            <Section title="Images">
              <Input label="Avatar URL" value={profile.avatarUrl} onChange={e => updateField('avatarUrl', e.target.value)} icon={<ImageIcon size={16} />} />
              <Input label="Cover Image URL" value={profile.coverImageUrl} onChange={e => updateField('coverImageUrl', e.target.value)} icon={<ImageIcon size={16} />} />
            </Section>

            <Section title="Social Links">
              <Input label="Twitter / X" value={profile.social.twitter || ''} onChange={e => updateSocial('twitter', e.target.value)} icon={<LinkIcon size={16} />} />
              <Input label="Website" value={profile.social.website || ''} onChange={e => updateSocial('website', e.target.value)} icon={<LinkIcon size={16} />} />
              <Input label="Email" value={profile.social.email || ''} onChange={e => updateSocial('email', e.target.value)} icon={<LinkIcon size={16} />} />
              <Input label="LinkedIn" value={profile.social.linkedin || ''} onChange={e => updateSocial('linkedin', e.target.value)} icon={<LinkIcon size={16} />} />
            </Section>
          </div>
        )}

        {activeTab === 'books' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold text-stone-900">Your Books</h2>
              <button onClick={addBook} className="flex items-center gap-2 px-4 py-2 bg-stone-200 hover:bg-stone-300 rounded-lg text-sm font-medium transition-colors">
                <Plus size={16} /> Add Book
              </button>
            </div>
            
            {profile.books.map((book, index) => (
              <div key={book.id} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm relative group">
                <button 
                  onClick={() => deleteBook(book.id)}
                  className="absolute top-4 right-4 p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid md:grid-cols-[100px_1fr] gap-6">
                  <div className="aspect-[2/3] bg-stone-100 rounded-lg overflow-hidden">
                    <img src={book.coverUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-4">
                    <Input label="Title" value={book.title} onChange={e => updateBook(book.id, 'title', e.target.value)} />
                    <Input label="Description" value={book.description || ''} onChange={e => updateBook(book.id, 'description', e.target.value)} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Cover URL" value={book.coverUrl} onChange={e => updateBook(book.id, 'coverUrl', e.target.value)} />
                      <Input label="Purchase Link" value={book.link} onChange={e => updateBook(book.id, 'link', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold text-stone-900">Articles</h2>
              <button onClick={addArticle} className="flex items-center gap-2 px-4 py-2 bg-stone-200 hover:bg-stone-300 rounded-lg text-sm font-medium transition-colors">
                <Plus size={16} /> Add Article
              </button>
            </div>
            
            {profile.articles.map((article) => (
              <div key={article.id} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm relative group">
                <button 
                  onClick={() => deleteArticle(article.id)}
                  className="absolute top-4 right-4 p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
                <div className="space-y-4">
                  <Input label="Article Title" value={article.title} onChange={e => updateArticle(article.id, 'title', e.target.value)} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="Publication Name" value={article.publication || ''} onChange={e => updateArticle(article.id, 'publication', e.target.value)} />
                    <Input label="Date" type="date" value={article.publishedDate || ''} onChange={e => updateArticle(article.id, 'publishedDate', e.target.value)} />
                    <Input label="Link" value={article.link} onChange={e => updateArticle(article.id, 'link', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
    <h3 className="text-lg font-bold text-stone-900 mb-4 border-b border-stone-100 pb-2">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const Input = ({ label, value, onChange, icon, type = "text" }: any) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-stone-700">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">{icon}</div>}
      <input
        type={type}
        className={`w-full ${icon ? 'pl-10' : 'px-4'} py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-stone-500 focus:border-transparent outline-none transition-shadow`}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);