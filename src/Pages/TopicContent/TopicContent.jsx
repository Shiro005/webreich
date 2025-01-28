import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    Code2,
    Youtube,
    ExternalLink,
    ChevronRight,
    Copy,
    Check,
    ArrowLeft,
    Menu,
    X,
    Home
} from 'lucide-react';
import topicsData from '../../../topics.json';

export default function TopicContent() {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const [topic, setTopic] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState(null);
    const [copiedStates, setCopiedStates] = useState({});
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const foundTopic = topicsData.categories
            .flatMap(category => category.topics)
            .find(t => t.id === topicId);

        setTopic(foundTopic);
        setIsLoading(false);
        setActiveSection(foundTopic?.content?.sections[0]?.title);

        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [topicId]);

    const handleCopyCode = (code, index) => {
        navigator.clipboard.writeText(code);
        setCopiedStates({ ...copiedStates, [index]: true });
        setTimeout(() => {
            setCopiedStates({ ...copiedStates, [index]: false });
        }, 2000);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading || !topic) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <motion.div
                    animate={{
                        rotate: 360,
                        borderRadius: ["25%", "25%", "50%", "50%", "25%"]
                    }}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    className="h-16 w-16 border-t-4 border-r-4 border-orange-600"
                />
            </div>
        );
    }

    const allTopics = topicsData.categories.flatMap(category => category.topics);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="fixed top-4 right-4 z-50 lg:hidden bg-gray-900 p-2 rounded-lg"
            >
                <Menu className="w-6 h-6 text-orange-500" />
            </button>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween' }}
                        className="fixed inset-0 z-50 bg-black lg:hidden"
                    >
                        <div className="h-full overflow-y-auto bg-gray-900 p-6">
                            <div className="flex justify-between items-center mb-8">
                                <Link to="/" className="flex items-center text-orange-500">
                                    <Home className="w-6 h-6 mr-2" />
                                    Home
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 hover:bg-gray-800 rounded-lg"
                                >
                                    <X className="w-6 h-6 text-orange-500" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {allTopics.map((t) => (
                                    <div key={t.id} className="space-y-2">
                                        <button
                                            onClick={() => {
                                                navigate(`/topic/${t.id}`);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`w-full text-left p-4 rounded-lg transition-all ${t.id === topicId
                                                    ? 'bg-orange-600/10 text-orange-500'
                                                    : 'text-gray-400 hover:bg-gray-800'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <ChevronRight className="w-5 h-5 mr-2" />
                                                {t.title}
                                            </div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block fixed w-64 h-screen bg-gray-900 border-r border-gray-800 overflow-y-auto">
                <div className="p-6">
                    <Link
                        to="/"
                        className="flex items-center text-orange-500 hover:text-orange-400 mb-8 p-2 rounded-lg hover:bg-gray-800 transition-all"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>

                    <div className="space-y-4">
                        {allTopics.map((t) => (
                            <Link
                                key={t.id}
                                to={`/topic/${t.id}`}
                                className={`block p-4 rounded-lg transition-all ${t.id === topicId
                                        ? 'bg-orange-600/10 text-orange-500 shadow-lg'
                                        : 'text-gray-400 hover:bg-gray-800'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <ChevronRight
                                        className={`w-5 h-5 mr-2 transition-transform ${t.id === topicId ? 'rotate-90' : ''
                                            }`}
                                    />
                                    {t.title}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:pl-64">
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                        className="space-y-12"
                    >
                        {topic.content.sections.map((section, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: { y: 0, opacity: 1 }
                                }}
                                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-xl"
                                id={section.title.toLowerCase().replace(/\s+/g, '-')}
                            >
                                <h2 className="text-3xl font-bold text-orange-500 mb-6 flex items-center">
                                    <BookOpen className="w-6 h-6 mr-3" />
                                    {section.title}
                                </h2>
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                        {section.content}
                                    </p>
                                    {section.codeExample && (
                                        <div className="relative mt-6">
                                            <div className="absolute top-0 right-0 mt-4 mr-4">
                                                <button
                                                    onClick={() => handleCopyCode(section.codeExample, index)}
                                                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                                                >
                                                    {copiedStates[index] ? (
                                                        <Check className="w-4 h-4 text-green-500" />
                                                    ) : (
                                                        <Copy className="w-4 h-4 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                            <div className="bg-black rounded-lg p-6 overflow-x-auto">
                                                <pre className="text-orange-400">
                                                    <code>{section.codeExample}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Resources Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16"
                    >
                        <h2 className="text-3xl font-bold text-orange-600 mb-8 flex items-center">
                            <ExternalLink className="w-6 h-6 mr-3" />
                            Additional Resources
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {topic.content.resources.map((resource, index) => (
                                <motion.a
                                    key={index}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl hover:shadow-xl transition-all duration-300 border border-gray-800 hover:border-orange-600/30"
                                >
                                    <h3 className="text-xl font-semibold text-orange-500 mb-3 flex items-center">
                                        <Code2 className="w-5 h-5 mr-2" />
                                        {resource.title}
                                    </h3>
                                    <p className="text-gray-400">{resource.type}</p>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Video Tutorials */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16"
                    >
                        <h2 className="text-3xl font-bold text-orange-600 mb-8 flex items-center">
                            <Youtube className="w-6 h-6 mr-3" />
                            Video Tutorials
                        </h2>
                        <div className="grid grid-cols-1 gap-8">
                            {topic.content.videos.map((video, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.01 }}
                                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl"
                                >
                                    <div className="aspect-w-16 aspect-h-9">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${video.embedId}`}
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-orange-500 mb-3">
                                            {video.title}
                                        </h3>
                                        <p className="text-gray-400">{video.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-500 transition-colors z-50"
                    >
                        <ArrowLeft className="w-6 h-6 rotate-90" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}