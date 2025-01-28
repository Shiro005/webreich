import { React, useState, useEffect } from 'react';

function Code() {
  const [learningPaths, setLearningPaths] = useState(null);

  useEffect(() => {
    fetch('/api/code')
      .then(res => res.json())
      .then(data => setLearningPaths(data));
  }, []);

  if (!learningPaths) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-orange-600 mb-8">Learning Paths</h1>
      <div className="space-y-12">
        {learningPaths.paths.map((path, index) => (
          <div key={index} className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">
              {path.title}
            </h2>
            <div className="space-y-4">
              {path.stages.map((stage, stageIndex) => (
                <div key={stageIndex} className="border-l-2 border-orange-600 pl-4">
                  <h3 className="text-xl font-semibold mb-2">{stage.title}</h3>
                  <ul className="space-y-2">
                    {stage.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="text-gray-300">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Code;