import { Button } from '@/components/ui/button';

const CTASection = () => {
  const features = [
    '构建个人知识图谱',
    '智能内容分类整理',
    '多维度信息检索',
    '团队协作与分享',
    '数据安全保护',
    '跨平台同步访问',
  ];

  const stats = [
    { label: '活跃用户', value: '10万+' },
    { label: '知识条目', value: '500万+' },
    { label: '用户满意度', value: '98%' },
    { label: '数据安全', value: '100%' },
  ];

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* 主要CTA区域 */}
        <div className="mb-16 rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-12 text-center text-white">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">开始构建您的知识网络</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">加入千万用户的选择，让每个想法都找到合适的位置</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="rounded-full bg-white px-8 py-4 text-lg font-medium text-purple-600 hover:bg-gray-100"
            >
              免费开始使用
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white px-8 py-4 text-lg font-medium text-white hover:bg-white hover:text-purple-600"
            >
              观看演示视频
            </Button>
          </div>
        </div>

        {/* 特性列表 */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <span className="text-sm text-green-600">✓</span>
              </div>
              <span className="font-medium text-gray-800">{feature}</span>
            </div>
          ))}
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <div className="mb-2 text-3xl font-bold text-purple-600">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
