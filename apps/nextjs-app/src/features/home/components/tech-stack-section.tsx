const TechStackSection = () => {
  const techItems = [
    {
      name: '智能分析',
      description: 'AI驱动的内容理解和分类',
      icon: '🤖',
    },
    {
      name: '云端同步',
      description: '多设备无缝同步您的知识库',
      icon: '☁️',
    },
    {
      name: '协作共享',
      description: '与团队成员共享知识和见解',
      icon: '👥',
    },
    {
      name: '安全保护',
      description: '企业级安全保护您的重要信息',
      icon: '🔒',
    },
  ];

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">无缝集成多元化工具</h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600">
            连接您喜爱的应用和工具，构建完整的知识管理生态系统
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {techItems.map((item, index) => (
            <div key={index} className="rounded-2xl bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100">
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h3 className="mb-3 text-lg font-bold text-gray-900">{item.name}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
