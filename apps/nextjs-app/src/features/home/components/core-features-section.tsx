const CoreFeaturesSection = () => {
  return (
    <section className="bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">核心功能亮点体验</h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600">为您提供最全面的知识管理解决方案</p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">数据可视化</h3>
                <p className="text-gray-600">将复杂的信息通过图表和图形直观展现，帮助您更好地理解数据关系</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                <span className="text-xl">🔍</span>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">全文搜索</h3>
                <p className="text-gray-600">强大的搜索引擎，支持关键词、标签、内容等多维度快速定位信息</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                <span className="text-xl">🎨</span>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">个性化定制</h3>
                <p className="text-gray-600">根据您的使用习惯和偏好，自定义界面布局和功能模块</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-blue-100">
              <div className="text-center">
                <div className="mb-4 text-6xl">💡</div>
                <p className="text-gray-600">功能演示区域</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreFeaturesSection;
