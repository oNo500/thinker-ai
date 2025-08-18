import { Github, Twitter, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
              <span className="text-xl font-bold">ThinkerAI</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              新一代 AI 知识管理与创意工作空间，连接你的想法，释放你的创造力。
            </p>
            <div className="mt-6 flex gap-4">
              <button type="button" className="text-gray-400 transition-colors hover:text-white" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </button>
              <button type="button" className="text-gray-400 transition-colors hover:text-white" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </button>
              <button type="button" className="text-gray-400 transition-colors hover:text-white" aria-label="Email">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">产品</h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: '功能特性', href: '#' },
                { name: '定价方案', href: '#' },
                { name: '产品更新', href: '#' },
                { name: 'API 文档', href: '#' },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-gray-400 transition-colors hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold">支持</h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: '帮助中心', href: '#' },
                { name: '使用教程', href: '#' },
                { name: '联系我们', href: '#' },
                { name: '状态页面', href: '#' },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-gray-400 transition-colors hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">公司</h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: '关于我们', href: '#' },
                { name: '博客', href: '#' },
                { name: '招聘', href: '#' },
                { name: '媒体资源', href: '#' },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-gray-400 transition-colors hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-400">© {currentYear} ThinkerAI. 保留所有权利。</p>
            <div className="flex gap-6">
              <button type="button" className="text-sm text-gray-400 transition-colors hover:text-white">
                隐私政策
              </button>
              <button type="button" className="text-sm text-gray-400 transition-colors hover:text-white">
                服务条款
              </button>
              <button type="button" className="text-sm text-gray-400 transition-colors hover:text-white">
                Cookie 政策
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
