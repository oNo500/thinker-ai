'use client';

import { useState } from 'react';
import { Palette, Bot, BookOpen, PenTool, FolderOpen, ArrowRight } from 'lucide-react';
import { Button } from '@repo/ui/components/button';

const features = [
  {
    id: 'canvas',
    icon: Palette,
    title: '无限画布，让你的思绪自由流动',
    shortTitle: '无限画布',
    description: [
      '无限大的可视化工作空间',
      '直观的拖拽和连线操作',
      '富文本节点和自定义样式',
      '思维导图、流程图等多种结构',
    ],
    image: '/api/placeholder/600/400',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
  },
  {
    id: 'ai',
    icon: Bot,
    title: 'AI 驱动，让知识为你所用',
    shortTitle: 'AI 智能助手',
    description: ['基于个人知识库的对话', '智能引用文档和节点内容', '概念解释和创意激发', '内容总结和分析'],
    image: '/api/placeholder/600/400',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
  },
  {
    id: 'pdf',
    icon: BookOpen,
    title: '阅读不止于表面，让标注成为创意的起点',
    shortTitle: 'PDF 整合',
    description: ['流畅的 PDF 在线阅读', '高亮标注和批注功能', '一键转化为画布节点', '原文关联和回溯查阅'],
    image: '/api/placeholder/600/400',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20',
  },
  {
    id: 'editor',
    icon: PenTool,
    title: '灵感捕捉，轻松记录与整理',
    shortTitle: '富文本编辑',
    description: ['Lexical Editor 流畅体验', 'Markdown 语法支持', '节点内容和独立笔记', '多媒体内容支持'],
    image: '/api/placeholder/600/400',
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
  },
  {
    id: 'organize',
    icon: FolderOpen,
    title: '告别混乱，用你喜欢的方式组织一切',
    shortTitle: '项目管理',
    description: ['项目和分类管理', '多维度标签系统', '灵活的组织架构', '高效检索和关联'],
    image: '/api/placeholder/600/400',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20',
  },
];

const FeatureSection = () => {
  const [activeFeature, setActiveFeature] = useState('canvas');

  const currentFeature = features.find((f) => f.id === activeFeature);

  return (
    <section className="bg-gray-50 py-16 sm:py-24 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            核心功能深度体验
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            每个功能都经过精心设计，为你的知识工作提供最佳体验
          </p>
        </div>

        <div className="mt-16">
          {/* Feature Navigation */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isActive = activeFeature === feature.id;

              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`group flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white text-gray-900 shadow-lg dark:bg-gray-800 dark:text-white'
                      : 'text-gray-600 hover:bg-white/50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                  <span className="hidden sm:block">{feature.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Feature Content */}
          {currentFeature && (
            <div className="mt-12">
              <div className={`rounded-3xl bg-gradient-to-br p-1 ${currentFeature.color}`}>
                <div className={`rounded-2xl bg-gradient-to-br p-8 ${currentFeature.bgColor}`}>
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                        {currentFeature.title}
                      </h3>

                      <ul className="mt-6 space-y-3">
                        {currentFeature.description.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-1 h-2 w-2 rounded-full bg-current opacity-60" />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        <Button
                          className="group inline-flex items-center gap-2"
                          onClick={() => {
                            window.open('https://pdf-git-onthesnow1s-projects.vercel.app/', '_self');
                          }}
                        >
                          立即体验
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>

                    {/* Visual Preview */}
                    <div className="relative">
                      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-800">
                        {/* Feature-specific preview */}
                        {currentFeature.id === 'canvas' && (
                          <div className="p-6">
                            <div className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                              无限画布工作空间
                            </div>
                            <div className="relative h-full rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                              {/* Mock canvas nodes */}
                              <div className="absolute left-4 top-4 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-700">
                                <div className="h-2 w-16 rounded bg-blue-200 dark:bg-blue-800" />
                                <div className="mt-1 h-1 w-12 rounded bg-gray-200 dark:bg-gray-600" />
                              </div>
                              <div className="absolute right-8 top-16 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-700">
                                <div className="h-2 w-20 rounded bg-purple-200 dark:bg-purple-800" />
                                <div className="mt-1 h-1 w-14 rounded bg-gray-200 dark:bg-gray-600" />
                              </div>
                              <div className="absolute bottom-8 left-12 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-700">
                                <div className="w-18 h-2 rounded bg-emerald-200 dark:bg-emerald-800" />
                                <div className="mt-1 h-1 w-10 rounded bg-gray-200 dark:bg-gray-600" />
                              </div>
                              {/* Connection lines */}
                              <svg className="absolute inset-0 h-full w-full">
                                <path
                                  d="M 80 40 Q 150 60 200 80"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  className="text-gray-400"
                                />
                                <path
                                  d="M 60 60 Q 100 100 140 120"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  className="text-gray-400"
                                />
                              </svg>
                            </div>
                          </div>
                        )}

                        {currentFeature.id === 'ai' && (
                          <div className="p-6">
                            <div className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">AI 智能对话</div>
                            <div className="space-y-3">
                              <div className="max-w-xs rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-700">
                                帮我分析一下这个概念的相关联系
                              </div>
                              <div className="ml-8 max-w-xs rounded-lg bg-blue-100 p-3 text-sm dark:bg-blue-900">
                                基于您的知识库，我发现了3个相关概念，它们之间存在以下联系...
                              </div>
                              <div className="max-w-xs rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-700">
                                请具体展开说明
                              </div>
                            </div>
                          </div>
                        )}

                        {currentFeature.id === 'pdf' && (
                          <div className="p-6">
                            <div className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                              PDF 阅读与标注
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                              <div className="space-y-2">
                                <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-600" />
                                <div className="h-2 w-5/6 rounded bg-gray-200 dark:bg-gray-600" />
                                <div className="h-2 w-4/5 rounded bg-yellow-200 dark:bg-yellow-800" />
                                <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-600" />
                                <div className="h-2 w-3/4 rounded bg-gray-200 dark:bg-gray-600" />
                              </div>
                              <div className="mt-4 rounded bg-yellow-100 p-2 text-xs dark:bg-yellow-900/30">
                                💡 已标注重要概念
                              </div>
                            </div>
                          </div>
                        )}

                        {currentFeature.id === 'editor' && (
                          <div className="p-6">
                            <div className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                              富文本编辑器
                            </div>
                            <div className="rounded-lg border border-gray-200 dark:border-gray-600">
                              <div className="border-b border-gray-200 p-2 dark:border-gray-600">
                                <div className="flex gap-1">
                                  <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-600" />
                                  <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-600" />
                                  <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-600" />
                                </div>
                              </div>
                              <div className="space-y-2 p-3">
                                <div className="h-3 w-32 rounded bg-gray-800 dark:bg-gray-200" />
                                <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-600" />
                                <div className="h-2 w-4/5 rounded bg-gray-200 dark:bg-gray-600" />
                                <div className="h-2 w-3/4 rounded bg-gray-200 dark:bg-gray-600" />
                              </div>
                            </div>
                          </div>
                        )}

                        {currentFeature.id === 'organize' && (
                          <div className="p-6">
                            <div className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                              项目组织结构
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded bg-blue-200 dark:bg-blue-800" />
                                <div className="h-2 w-20 rounded bg-gray-200 dark:bg-gray-600" />
                              </div>
                              <div className="ml-6 space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded bg-green-200 dark:bg-green-800" />
                                  <div className="h-2 w-16 rounded bg-gray-200 dark:bg-gray-600" />
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded bg-yellow-200 dark:bg-yellow-800" />
                                  <div className="h-2 w-14 rounded bg-gray-200 dark:bg-gray-600" />
                                </div>
                              </div>
                              <div className="mt-4 flex flex-wrap gap-1">
                                <div className="rounded bg-purple-100 px-2 py-1 text-xs dark:bg-purple-900">AI</div>
                                <div className="rounded bg-blue-100 px-2 py-1 text-xs dark:bg-blue-900">研究</div>
                                <div className="rounded bg-green-100 px-2 py-1 text-xs dark:bg-green-900">创新</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
