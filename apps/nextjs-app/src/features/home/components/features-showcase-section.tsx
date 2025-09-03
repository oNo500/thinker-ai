import { Button } from '@/components/ui/button';

const FeaturesShowcaseSection = () => {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Feature 1 */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">一个平台，展现无限创造潜能</h2>
            <p className="mx-auto max-w-2xl text-gray-600">集成多种思维工具，让知识管理变得简单高效</p>
          </div>
          <Button className="mx-auto block rounded-full bg-black px-6 py-2 text-white hover:bg-gray-800">
            探索更多 →
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="rounded-lg bg-gray-50 p-6 text-center">
            <h3 className="mb-2 font-semibold text-gray-900">无限画布创作</h3>
            <p className="text-sm text-gray-600">自由发挥创意思维</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6 text-center">
            <h3 className="mb-2 font-semibold text-gray-900">智能关联推荐</h3>
            <p className="text-sm text-gray-600">AI 驱动的关联建议</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6 text-center">
            <h3 className="mb-2 font-semibold text-gray-900">多格式文档支持</h3>
            <p className="text-sm text-gray-600">支持各种文档格式</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6 text-center">
            <h3 className="mb-2 font-semibold text-gray-900">实时协作编辑</h3>
            <p className="text-sm text-gray-600">团队协作更高效</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">支持各种研究场景</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">无论是学术研究还是商业分析，都能找到适合的工具</p>
          <Button className="rounded-full bg-black px-6 py-2 text-white hover:bg-gray-800">了解详情 →</Button>
        </div>

        {/* Workflow Cards */}
        <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="rounded-lg bg-blue-50 p-4 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-blue-100"></div>
            <h4 className="text-sm font-medium">文献研究</h4>
          </div>
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-green-100"></div>
            <h4 className="text-sm font-medium">数据分析</h4>
          </div>
          <div className="rounded-lg bg-purple-50 p-4 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-purple-100"></div>
            <h4 className="text-sm font-medium">项目管理</h4>
          </div>
          <div className="rounded-lg bg-orange-50 p-4 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-orange-100"></div>
            <h4 className="text-sm font-medium">创意设计</h4>
          </div>
          <div className="rounded-lg bg-red-50 p-4 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-red-100"></div>
            <h4 className="text-sm font-medium">教学培训</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcaseSection;
