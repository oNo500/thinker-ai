const FeaturesSection = () => {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">一个本事，量身可定制的高效管理</h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600">智能化管理系统，让每个想法都能找到合适的位置</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-purple-100">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">智能笔记</h3>
            <p className="text-sm text-gray-600">自动整理和分类您的想法</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">知识图谱</h3>
            <p className="text-sm text-gray-600">构建您的个人知识网络</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-green-100">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">快速检索</h3>
            <p className="text-sm text-gray-600">瞬间找到需要的信息</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-orange-100">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">智能推荐</h3>
            <p className="text-sm text-gray-600">发现相关的知识连接</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
