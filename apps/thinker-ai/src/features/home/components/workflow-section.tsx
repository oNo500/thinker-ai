const WorkflowSection = () => {
  const workflows = [
    {
      title: '收集整理',
      description: '快速收集各种想法和信息',
      icon: '📥',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      title: '结构化组织',
      description: '将信息组织成有序的知识结构',
      icon: '🗂️',
      color: 'bg-green-50 border-green-200',
    },
    {
      title: '连接发现',
      description: '发现知识之间的关联性',
      icon: '🔗',
      color: 'bg-purple-50 border-purple-200',
    },
    {
      title: '智能应用',
      description: '将知识转化为实际的行动力',
      icon: '⚡',
      color: 'bg-orange-50 border-orange-200',
    },
  ];

  return (
    <section className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">无缝集成工作流程支持</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">从想法萌生到知识应用的完整流程管理</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {workflows.map((workflow, index) => (
            <div
              key={index}
              className={`rounded-2xl border p-6 ${workflow.color} transition-all duration-300 hover:shadow-lg`}
            >
              <div className="mb-4 text-3xl">{workflow.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{workflow.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{workflow.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
