import { Button } from '@/components/ui/button';

const img202508151114408831 = 'http://localhost:3845/assets/3b7e743dd1ebb73987bcc394c0403663975cd11c.png';

const KnowledgeNetworkSection = () => {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background Image */}
      <div
        className="bg-size-[100%_139.89%] absolute inset-0 bg-[0%_28.66%] bg-no-repeat opacity-70"
        style={{ backgroundImage: `url('${img202508151114408831}')` }}
        data-node-id="162:2710"
      />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                  开始构建你的<span className="text-blue-600">知识网络</span>
                </h2>
                <p className="mb-8 text-lg text-gray-600">加入数万名知识工作者，体验全新的思考和创作方式</p>
              </div>

              {/* Feature List */}
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-900"></div>
                  <span>无限画布和笔记创建</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-900"></div>
                  <span>富文本编辑器</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-900"></div>
                  <span>AI 智能分析和分析</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-900"></div>
                  <span>项目和知识管理</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-900"></div>
                  <span>PDF 在线阅读和标注</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-900"></div>
                  <span>云端同步和备份</span>
                </div>
              </div>
            </div>

            {/* Right Content - Signup Form */}
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
              <h3 className="mb-2 text-center text-2xl font-bold">立即免费注册</h3>
              <p className="mb-8 text-center text-blue-500">无需信用卡，30天免费试用</p>

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="输入您的邮箱地址"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />

                <Button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-black py-3 font-medium text-white hover:bg-gray-800">
                  <span>开始构建知识网络</span>
                  <span>→</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeNetworkSection;
