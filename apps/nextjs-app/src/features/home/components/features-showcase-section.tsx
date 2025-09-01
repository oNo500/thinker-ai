import { Button } from '@/components/ui/button';

const FeaturesShowcaseSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Feature 1 */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              一个平台，展现无限创造潜能
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              集成多种思维工具，让知识管理变得简单高效
            </p>
          </div>
          <Button className="mx-auto block bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
            探索更多 →
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">无限画布创作</h3>
            <p className="text-sm text-gray-600">自由发挥创意思维</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">智能关联推荐</h3>
            <p className="text-sm text-gray-600">AI 驱动的关联建议</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">多格式文档支持</h3>
            <p className="text-sm text-gray-600">支持各种文档格式</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">实时协作编辑</h3>
            <p className="text-sm text-gray-600">团队协作更高效</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            支持各种研究场景
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            无论是学术研究还是商业分析，都能找到适合的工具
          </p>
          <Button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
            了解详情 →
          </Button>
        </div>

        {/* Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-20">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3"></div>
            <h4 className="font-medium text-sm">文献研究</h4>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3"></div>
            <h4 className="font-medium text-sm">数据分析</h4>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3"></div>
            <h4 className="font-medium text-sm">项目管理</h4>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3"></div>
            <h4 className="font-medium text-sm">创意设计</h4>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg mx-auto mb-3"></div>
            <h4 className="font-medium text-sm">教学培训</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcaseSection;