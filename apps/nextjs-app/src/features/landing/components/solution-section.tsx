import { Palette, Bot, BookOpen, PenTool, Tag } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: '无限画布',
    description: '可视化思维',
    detail: '在无限大的工作空间中自由创作，用直观的方式组织和连接你的想法',
  },
  {
    icon: Bot,
    title: 'AI 助手',
    description: '智能洞察',
    detail: '基于个人知识库的智能对话，获得个性化的分析和创意启发',
  },
  {
    icon: BookOpen,
    title: 'PDF 整合',
    description: '深度阅读',
    detail: '流畅的在线阅读体验，智能标注和一键转化为知识节点',
  },
  {
    icon: PenTool,
    title: '富文本编辑',
    description: '流畅创作',
    detail: '现代化编辑器支持 Markdown，让你专注于内容创作',
  },
  {
    icon: Tag,
    title: '智能标签',
    description: '灵活组织',
    detail: '多维度标签系统，让知识管理变得井井有条',
  },
];

const SolutionSection = () => {
  return (
    <section className="bg-white py-16 sm:py-24 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            一个平台，满足所有知识管理需求
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            ThinkerAI 整合了现代知识工作者所需的全部功能，让思考和创作变得更加高效
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:from-gray-800 dark:to-gray-900"
              >
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 opacity-0 transition-opacity group-hover:opacity-100 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-emerald-950/20" />

                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>

                  <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">{feature.description}</p>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{feature.detail}</p>
                </div>

                {/* Decorative elements */}
                <div className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-gradient-to-br from-blue-200/50 to-purple-200/50 opacity-0 transition-opacity group-hover:opacity-100 dark:from-blue-800/30 dark:to-purple-800/30" />
                <div className="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-gradient-to-br from-emerald-200/50 to-cyan-200/50 opacity-0 transition-opacity group-hover:opacity-100 dark:from-emerald-800/30 dark:to-cyan-800/30" />
              </div>
            );
          })}
        </div>

        {/* Integration Showcase */}
        <div className="mt-20">
          <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 dark:from-blue-950/20 dark:to-purple-950/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">无缝集成的工作流程</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                从阅读到思考，从记录到创作，一站式完成所有知识工作
              </p>
            </div>

            {/* Workflow Steps */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
              {[
                { step: '1', title: '导入内容', desc: 'PDF、网页、笔记' },
                { step: '2', title: '智能标注', desc: '高亮重点信息' },
                { step: '3', title: '可视化组织', desc: '构建知识网络' },
                { step: '4', title: 'AI 洞察', desc: '发现新的连接' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
