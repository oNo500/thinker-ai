const StatsSection = () => {
  const stats = [
    {
      value: '73%',
      label: '用户认为管理工具能提升效率',
      icon: '📊',
    },
    {
      value: '40%',
      label: '用户因工作过度而心烦意乱',
      icon: '⏰',
    },
    {
      value: '5+',
      label: '平均每人使用的管理工具数量',
      icon: '🛠️',
    },
  ];

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">情感化作品管理</h2>
          <p className="text-lg text-gray-600">将每个想法都整理成有序的知识体系</p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 text-4xl">{stat.icon}</div>
              <div className="mb-2 text-4xl font-bold text-purple-600 md:text-5xl">{stat.value}</div>
              <p className="text-sm leading-relaxed text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          <div className="py-6">
            <div className="mb-2 text-2xl font-bold text-gray-900">无缝整理结构</div>
            <p className="text-sm text-gray-600">轻松管理</p>
          </div>
          <div className="py-6">
            <div className="mb-2 text-2xl font-bold text-gray-900">智能化任务系统</div>
            <p className="text-sm text-gray-600">高效执行</p>
          </div>
          <div className="py-6">
            <div className="mb-2 text-2xl font-bold text-gray-900">一站式项目管理</div>
            <p className="text-sm text-gray-600">全面覆盖</p>
          </div>
          <div className="py-6">
            <div className="mb-2 text-2xl font-bold text-gray-900">智能化决策支持</div>
            <p className="text-sm text-gray-600">科学决策</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
