import { Button } from '@/components/ui/button';

const KnowledgeHeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-12">
          <h1 className="mb-6 text-6xl font-bold text-gray-900 lg:text-8xl">构建知识网络！</h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">基于思维导图和知识图谱的全新学习和创作平台</p>
          <Button className="rounded-full bg-black px-8 py-4 text-lg text-white hover:bg-gray-800">开始使用 →</Button>
        </div>

        {/* Stats Section */}
        <div className="mb-8 mt-16">
          <p className="mb-6 text-gray-600">信息吸纳速度提升</p>
          <div className="flex items-center justify-center space-x-12 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">73%</div>
              <div className="mt-2 text-sm text-gray-500">学习效率提升</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">40%</div>
              <div className="mt-2 text-sm text-gray-500">知识保留率</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">5+</div>
              <div className="mt-2 text-sm text-gray-500">思维工具集成</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHeroSection;
