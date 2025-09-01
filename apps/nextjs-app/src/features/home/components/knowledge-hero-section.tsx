import { Button } from '@/components/ui/button';

const KnowledgeHeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 mb-6">
            构建知识网络！
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            基于思维导图和知识图谱的全新学习和创作平台
          </p>
          <Button className="bg-black text-white px-8 py-4 text-lg rounded-full hover:bg-gray-800">
            开始使用 →
          </Button>
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 mb-8">
          <p className="text-gray-600 mb-6">信息吸纳速度提升</p>
          <div className="flex justify-center items-center space-x-12 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">73%</div>
              <div className="text-sm text-gray-500 mt-2">学习效率提升</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">40%</div>
              <div className="text-sm text-gray-500 mt-2">知识保留率</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">5+</div>
              <div className="text-sm text-gray-500 mt-2">思维工具集成</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHeroSection;