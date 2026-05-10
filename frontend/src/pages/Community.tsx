import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, MessageCircle, Share2, Image, Send, Plus, Globe, TrendingUp, Users } from 'lucide-react'
import { GlowCard } from '../components/ui/GlowCard'
// API: import { CommunityAPI } from '../lib/api'
// Backend: CommunityAPI.getPosts(), CommunityAPI.createPost(), CommunityAPI.like(), CommunityAPI.comment()

const MOCK_POSTS = [
  {
    id: '1', user: 'Priya Sharma', avatar: 'PS', location: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600&auto=format&fit=crop',
    content: 'Just finished my 10-day Europe trip! Santorini was absolutely magical. The sunset at Oia is something I\'ll never forget. Budget tip: eat at local tavernas instead of tourist spots — half the price, twice the taste! 🌅',
    likes: 234, comments: 18, time: '2 hours ago', tags: ['Europe', 'Santorini', 'BudgetTravel'], liked: false,
  },
  {
    id: '2', user: 'Rahul Mehta', avatar: 'RM', location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop',
    content: 'Cherry blossom season in Kyoto 🌸 Visited Arashiyama bamboo grove at 6AM before the crowds — totally worth it! Pro tip: get a 7-day JR Pass, it pays for itself.',
    likes: 512, comments: 42, time: '5 hours ago', tags: ['Japan', 'Kyoto', 'CherryBlossom'], liked: true,
  },
  {
    id: '3', user: 'Ananya Patel', avatar: 'AP', location: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop',
    content: 'Ubud rice terraces at golden hour — this view cost me ₹0. Sometimes the best things in travel are completely free. Bali on a budget is totally doable, the key is staying in guesthouses and renting a scooter!',
    likes: 389, comments: 27, time: '1 day ago', tags: ['Bali', 'Budget', 'SoloTravel'], liked: false,
  },
]

const TRENDING_TAGS = ['#SoloTravel', '#BudgetTravel', '#Japan2026', '#EuroTrip', '#DigitalNomad', '#BackpackIndia']

export function Community() {
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [search, setSearch] = useState('')
  const [showCompose, setShowCompose] = useState(false)
  const [newPost, setNewPost] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [activeComment, setActiveComment] = useState<string | null>(null)
  const [commentText, setCommentText] = useState('')

  const toggleLike = (postId: string) => {
    setPosts(ps => ps.map(p =>
      p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ))
  }

  const filtered = posts
    .filter(p => search === '' || p.content.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => sortBy === 'popular' ? b.likes - a.likes : 0)

  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-end justify-between">
        <div>
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-2">Community</motion.h1>
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-slate-400">
            Share your experiences and discover journeys from fellow travelers.
          </motion.p>
        </div>
        <button
          onClick={() => setShowCompose(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-medium transition-colors"
        >
          <Plus className="w-5 h-5" /> Share Experience
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Feed */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search + Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search posts, places, tags..." className="w-full bg-surface/50 border border-slate-700 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500" />
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-surface/50 border border-slate-700 text-sm text-slate-300 rounded-2xl px-4 focus:outline-none focus:border-brand-500 cursor-pointer">
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          <AnimatePresence>
            {filtered.map((post, idx) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
                <GlowCard className="bg-surface border border-slate-800 rounded-3xl overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between p-5 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-500 to-teal-300 flex items-center justify-center text-background font-bold text-sm">{post.avatar}</div>
                      <div>
                        <p className="font-semibold text-white">{post.user}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1"><Globe className="w-3 h-3" />{post.location} · {post.time}</p>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="overflow-hidden">
                    <img src={post.image} alt="" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-slate-200 text-sm leading-relaxed mb-3">{post.content}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-full">#{tag}</span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6 pt-3 border-t border-slate-800">
                      <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-2 text-sm font-medium transition-colors ${post.liked ? 'text-red-400' : 'text-slate-400 hover:text-red-400'}`}>
                        <Heart className={`w-5 h-5 transition-transform ${post.liked ? 'fill-red-400 scale-110' : ''}`} />
                        {post.likes}
                      </button>
                      <button onClick={() => setActiveComment(activeComment === post.id ? null : post.id)} className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-brand-400 transition-colors">
                        <MessageCircle className="w-5 h-5" /> {post.comments}
                      </button>
                      <button className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-brand-400 transition-colors ml-auto">
                        <Share2 className="w-4 h-4" /> Share
                      </button>
                    </div>

                    {/* Comment Box */}
                    <AnimatePresence>
                      {activeComment === post.id && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4">
                          <div className="flex gap-2">
                            <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Write a comment..." className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500" />
                            <button className="px-4 py-2 bg-brand-500 rounded-xl text-sm font-medium text-white hover:bg-brand-600 transition-colors">
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <GlowCard className="bg-surface/50 border border-slate-800 rounded-3xl p-5">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-brand-400" /> Trending</h3>
            <div className="space-y-2">
              {TRENDING_TAGS.map((tag, i) => (
                <button key={tag} onClick={() => setSearch(tag.slice(1))} className="flex items-center justify-between w-full px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors text-left">
                  <span className="text-brand-400 text-sm font-medium">{tag}</span>
                  <span className="text-xs text-slate-500">#{i + 1}</span>
                </button>
              ))}
            </div>
          </GlowCard>

          <GlowCard className="bg-surface/50 border border-slate-800 rounded-3xl p-5">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-purple-400" /> Top Explorers</h3>
            <div className="space-y-3">
              {['Priya Sharma', 'Rahul Mehta', 'Ananya Patel'].map((name, i) => {
                const initials = name.split(' ').map(n => n[0]).join('')
                return (
                  <div key={name} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-400 flex items-center justify-center text-white text-xs font-bold">{initials}</div>
                    <div>
                      <p className="text-sm font-medium text-white">{name}</p>
                      <p className="text-xs text-slate-500">{[24, 18, 15][i]} posts</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </GlowCard>
        </div>
      </div>

      {/* Compose Modal */}
      <AnimatePresence>
        {showCompose && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-center p-8" onClick={() => setShowCompose(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} className="bg-surface border border-slate-700 rounded-3xl p-8 w-full max-w-lg" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-bold mb-6">Share Your Experience</h3>
              <textarea value={newPost} onChange={e => setNewPost(e.target.value)} rows={5} className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 resize-none text-sm" placeholder="What was your most memorable travel moment?" />
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800">
                <button className="flex items-center gap-2 text-slate-400 hover:text-brand-400 text-sm"><Image className="w-5 h-5" /> Add Photos</button>
                <div className="flex gap-3">
                  <button onClick={() => setShowCompose(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white">Cancel</button>
                  <button className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-medium transition-colors">Post</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
