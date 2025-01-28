import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code, 
  Globe2, 
  Palette, 
  Server, 
  Database, 
  Terminal,
  Cpu,
  GitBranch,
  Layout,
  Smartphone
} from 'lucide-react';
import topicsData from '../../../topics.json';

const iconComponents = {
  html: Globe2,
  css: Palette,
  javascript: Code,
  nodejs: Server,
  mongodb: Database,
  git: GitBranch,
  react: Layout,
  mobile: Smartphone,
  python: Terminal,
  dsa: Cpu
};

export default function AllTopics() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCategories(topicsData.categories);
    setIsLoading(false);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
            borderRadius: ["25%", "25%", "50%", "50%", "25%"]
          }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Infinity
          }}
          className="h-16 w-16 border-t-4 border-r-4 border-orange-600"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <div className="text-center mb-16">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-6"
          >
            Learning Paths
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Master the latest technologies with our comprehensive learning paths
          </motion.p>
        </div>

        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="mb-16"
          >
            <motion.h2
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-orange-500 mb-8 pl-4 border-l-4 border-orange-600"
            >
              {category.title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
              {category.topics.map((topic) => {
                const IconComponent = iconComponents[topic.id] || Code;
                
                return (
                  <motion.div
                    key={topic.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Link to={`/topic/${topic.id}`}>
                      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-orange-600/20 hover:shadow-2xl border border-gray-800 hover:border-orange-600/50">
                        <div className="absolute top-0 right-0 mt-4 mr-4 bg-orange-600/10 p-2 rounded-lg group-hover:bg-orange-600/20 transition-all duration-300">
                          <IconComponent className="w-6 h-6 text-orange-500" />
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-orange-500 mb-3 mt-2 group-hover:text-orange-400">
                          {topic.title}
                        </h3>

                        <p className="text-gray-400 group-hover:text-gray-300 mb-4 text-sm md:text-base">
                          {topic.shortDescription}
                        </p>

                        <div className="flex items-center text-orange-500 text-sm font-medium group-hover:text-orange-400">
                          Explore Path
                          <motion.svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ x: 0 }}
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </motion.svg>
                        </div>

                        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ width: '100%' }} />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}