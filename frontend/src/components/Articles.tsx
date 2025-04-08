import React from 'react';
import { motion } from 'framer-motion';
import { User, Clock } from 'lucide-react';

export default function Articles() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <ArticleCard
        title="The Future of Web Development"
        summary="Exploring the latest trends and technologies shaping the future of web development..."
        author="John Doe"
        date="Mar 15, 2024"
        image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800"
      />
      <ArticleCard
        title="Mastering React Hooks"
        summary="A comprehensive guide to using React Hooks effectively in your applications..."
        author="Jane Smith"
        date="Mar 14, 2024"
        image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800"
      />
    </div>
  );
}

function ArticleCard({ title, summary, author, date, image }: {
  title: string;
  summary: string;
  author: string;
  date: string;
  image: string;
}) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#4A90E2] mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{summary}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <User size={16} />
            <span>{author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
