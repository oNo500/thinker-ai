'use client';
import { useEffect, useState } from 'react';

import { PDF_PRD_URL } from '@/lib/constant';

import bg2 from '../assets/images/bg2.png';
import {
  AIAssistantIcon,
  AgentCollaborationIcon,
  BrainstormIcon,
  CrossModalIcon,
  InfiniteCanvasIcon,
  KnowledgeCollectionIcon,
  KnowledgeNetworkIcon,
  KnowledgeSedimentationIcon,
  MCPToolIcon,
  PDFIntegrationIcon,
  RichTextEditorIcon,
  SmartTagIcon,
} from './platform-icons';
import { Title } from './title';
import { FreeButton } from './free-button';

const KnowledgeManagementPlatform = () => {
  return (
    <section className="relative bg-white px-0 py-24 pb-0">
      <div className="flex flex-col items-center justify-center pb-32">
        <Title
          title="一个平台，满足"
          subtitle="所有知识管理需求"
          description="ThinkerAl整合了现代知识工作者所需的全部功能，让思考和创作变得更加高效"
        />
        <FreeButton className="mt-6" />
      </div>
      <Carousel />
      <WorkflowStep />
    </section>
  );
};

// 轮播图数据
const DATA_LIST = [
  {
    title: '无限画布',
    subTitle: '可视化思维',
    description: '在无限大的工作空间中自由创作，用直观的方式组织和连接你的想法。',
    icon: <InfiniteCanvasIcon />,
  },
  {
    title: '跨形态知识联动',
    subTitle: '多形态管理',
    description: '划词自动生成思维导图节点，关联原文精准定位。PDF/文本/视频统一管理，覆盖全形态知识资产。',
    icon: <CrossModalIcon />,
  },
  {
    title: '多源引用问答',
    subTitle: '类Cursor交互',
    description: '划词关联知识库提问；预设指令模板+自定义Agent，适配科研、企业等多元场景需求。',
    icon: <InfiniteCanvasIcon />,
  },
  {
    title: 'Agent深度协同',
    subTitle: '多模型接力处理',
    description: '文本节点直连模型节点，搭建专属Agent。多模型接力处理，深度生成如论文、行业报告等专业内容。',
    icon: <AgentCollaborationIcon />,
  },
  {
    title: '智能工作流系统',
    subTitle: '操作自动透明',
    description: '类 Manus 功能，拆解用户工作流，模型驱动电脑操作，让任务执行自动化、可视化。',
    icon: <MCPToolIcon />,
  },
  {
    title: 'AI头脑风暴',
    subTitle: '智能拓展创意',
    description: '基于当前节点+知识库，AI智能拓展创意，零散思考秒变体系化灵感，帮助科研思路推导、创意延伸。',
    icon: <BrainstormIcon />,
  },
  {
    title: '自定义专属工具',
    subTitle: '让AI更懂你的需求',
    description: '无需编程就能构建专属工具、记忆Prompt并灵活调用，还能在工具市场分享共建生态。',
    icon: <PDFIntegrationIcon />,
  },
  {
    title: '智能知识采集',
    subTitle: 'AI预筛去重',
    description: '打破形态限制，支持网页/视频/音频等全形态知识，同时支持AI预筛去重，告别低效采集。',
    icon: <KnowledgeCollectionIcon />,
  },
  {
    title: 'AI知识关联',
    subTitle: '匹配相似片段',
    description: 'AI挖掘知识关联、串联碎片，输入关键词自动构建框架，让梳理更智能。',
    icon: <AIAssistantIcon />,
  },
  {
    title: '富文本编辑',
    subTitle: '智能Diff比对',
    description: '支持Markdown，还能 Diff 比对模型回答与原内容，自由选留，让创作更高效！',
    icon: <RichTextEditorIcon />,
  },
  {
    title: '智能标签',
    subTitle: '灵活组织',
    description: '多维度标签支持Dataview式筛选，帮助项目管理与高效检索。',
    icon: <SmartTagIcon />,
  },
  {
    title: '知识沉淀归档',
    subTitle: '让知识更系统',
    description: '节点内容、模型回答片段及文献片段一键引用到记事本沉淀，同时标记来源，形成个人知识库。',
    icon: <KnowledgeSedimentationIcon />,
  },
];

// 轮播图组件
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalItems = DATA_LIST.length;

  // 自动轮播功能
  useEffect(() => {
    if (isHovered) return; // 如果正在悬停，则不启动定时器

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 3000); // 每3秒切换一次

    return () => clearInterval(interval); // 清理定时器
  }, [totalItems, isHovered]);

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex - 2 + i + totalItems) % totalItems;
      items.push({
        ...DATA_LIST[index],
        originalIndex: index,
        position: i,
      });
    }
    return items;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const visibleItems = getVisibleItems();
  const jumpToThinker = () => {
    // window.open(PDF_PRD_URL, '_self');
  };

  return (
    <section className="relative w-full py-20">
      <div
        className="flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label="视频轮播区域"
      >
        {/* 左侧高斯模糊遮罩 */}
        <div
          className="左高斯模糊 pointer-events-none absolute left-0 top-0 z-[60] h-full w-[330px]"
          style={{
            background:
              'linear-gradient(270deg, rgba(255, 255, 255, 0.00) 13.9%, rgba(255, 255, 255, 0.80) 36.7%, rgba(255, 255, 255, 0.70) 74.7%)',
          }}
        />
        {/* 右侧高斯模糊遮罩 */}
        <div
          className="右高斯模糊 pointer-events-none absolute right-0 top-0 z-[60] h-full w-[420px]"
          style={{
            background:
              'linear-gradient(90deg, rgba(255, 255, 255, 0.00) 13.9%, rgba(255, 255, 255, 0.80) 36.7%, rgba(255, 255, 255, 0.80) 74.7%)',
          }}
        />
        <div className="relative flex w-[1641px] items-end justify-center overflow-visible">
          {visibleItems.map((item, index) => {
            const isCenter = index === 2;

            // 计算堆叠层级：越靠近中心层级越高
            const getZIndex = () => {
              if (isCenter) return 'z-50';
              if (index === 1 || index === 3) return 'z-40';
              return 'z-30';
            };

            // 计算重叠间距
            const getMargin = () => {
              if (isCenter) return '-ml-[30px] -mr-[30px]';
              if (index > 0) return '-ml-[16px]';
              return '';
            };

            return (
              <div
                key={`${item.originalIndex}-${index}`}
                className={`relative flex-shrink-0 select-none rounded-3xl border border-gray-100 bg-white shadow-lg transition-all duration-500 ease-in-out ${isCenter ? 'h-[293px] w-[616px] -translate-y-[104px]' : 'h-[293px] w-[293px] border-[#D8D8D8]'} ${getZIndex()} ${getMargin()} `}
                style={{
                  boxShadow: isCenter
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(110, 107, 238, 0.15)'
                    : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* 形态1: 616x293 布局 */}
                {isCenter ? (
                  <div className="relative flex h-full">
                    <div className="flex flex-1 flex-col justify-center rounded-r-3xl p-8">
                      <div className="space-y-4">
                        <div className="flex flex-col items-start gap-3">
                          <h3 className="text-2xl font-bold">{item.title}</h3>
                          <span className="text-lg font-semibold text-[#6E6BEE]">{item.subTitle}</span>
                        </div>
                        <p className="text-base leading-relaxed">{item.description}</p>
                        <div
                          role="button"
                          tabIndex={0}
                          className="flex cursor-pointer items-center gap-2 text-[14px] font-bold text-black"
                          onClick={jumpToThinker}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              jumpToThinker();
                            }
                          }}
                        >
                          VIEW MORE{' '}
                          <svg
                            width="15"
                            height="16"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.12512 3.50244H11.8751M11.8751 3.50244V7.25244M11.8751 3.50244L3.12512 12.2524"
                              stroke="black"
                              stroke-width="1.8"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-full w-[293px] items-center justify-center">
                      <div className="scale-110">{item.icon}</div>
                    </div>

                    {/* 左控制器 - 在形态1卡片左侧外面 */}
                    <button
                      onClick={prevSlide}
                      className="absolute -left-16 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 select-none items-center justify-center transition-all"
                    >
                      <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M28.1437 10.8948L28.2597 10.8848H28.4957L28.6117 10.8948L28.7317 10.9128L28.8357 10.9328L29.0517 10.9968L29.1857 11.0508L29.4497 11.1908L29.6297 11.3208L29.7917 11.4668L29.9577 11.6548L30.0657 11.8088L30.1737 12.0008L30.2077 12.0728L30.2617 12.2068L30.3257 12.4228L30.3457 12.5288L30.3657 12.6488L30.3737 12.7628L30.3777 12.8808V36.8808C30.3777 38.5848 28.4057 39.4748 27.1317 38.4468L26.9637 38.2948L14.9637 26.2948C14.6193 25.9504 14.4124 25.4922 14.3819 25.0061C14.3513 24.5201 14.4991 24.0396 14.7977 23.6548L14.9637 23.4668L26.9637 11.4668L27.1517 11.3008L27.3057 11.1928L27.4977 11.0848L27.5697 11.0508L27.7037 10.9968L27.9197 10.9328L28.0257 10.9128L28.1457 10.8928L28.1437 10.8948Z"
                          fill="black"
                        />
                      </svg>
                    </button>

                    {/* 右控制器 - 在形态1卡片右侧外面 */}
                    <button
                      onClick={nextSlide}
                      className="absolute -right-16 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 select-none items-center justify-center transition-all"
                    >
                      <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M18.623 12.8808C18.623 11.1768 20.595 10.2868 21.869 11.3148L22.037 11.4668L34.037 23.4668C34.3814 23.8112 34.5883 24.2694 34.6188 24.7555C34.6494 25.2415 34.5016 25.722 34.203 26.1068L34.037 26.2948L22.037 38.2948L21.849 38.4608L21.695 38.5688L21.503 38.6768L21.431 38.7108L21.297 38.7648L21.081 38.8288L20.975 38.8488L20.855 38.8688L20.741 38.8768L20.623 38.8808L20.505 38.8768L20.389 38.8668L20.269 38.8488L20.165 38.8288L19.949 38.7648L19.815 38.7108L19.551 38.5708L19.371 38.4408L19.209 38.2948L19.043 38.1068L18.935 37.9528L18.827 37.7608L18.793 37.6888L18.739 37.5548L18.675 37.3388L18.655 37.2328L18.635 37.1128L18.627 36.9988L18.623 12.8808Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  /* 形态2: 293x293 布局 */
                  <div className="flex h-full flex-col items-center justify-center space-y-4 p-6 text-center">
                    <div className="mb-2 scale-90">{item.icon}</div>
                    <div className="z-10 -mt-10 flex w-full flex-col gap-2 pl-4 text-left">
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                      <span className="text-sm font-semibold text-indigo-600">{item.subTitle}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 指示点 */}
      <div className="mt-10 flex justify-center space-x-3">
        {DATA_LIST.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 select-none rounded-full transition-all duration-300 ${
              currentIndex === index ? 'scale-125 bg-[#6E6BEE]' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

const STEP_LIST = [
  {
    title: '知识采集',
    description: '多形态采集，AI预筛去重',
  },
  {
    title: '知识处理',
    description: '结构化节点，跨文档关联',
  },
  {
    title: '知识沉淀',
    description: '划词关联、AI问答',
  },
  {
    title: '应用复利',
    description: '个性化知识仓库',
  },
];

// 无缝集成的工作流 step 组件
const WorkflowStep = () => {
  return (
    <div
      style={{
        background: `url(${bg2.src}) no-repeat center / cover`,
      }}
    >
      <div className="m-auto mt-20 w-[1412px] pb-[100px] pt-[100px]">
        <h4 className="text-center text-[38px] font-[700]">无缝集成的工作流程</h4>
        <p className="py-[30px] text-center text-[20px]">从阅读到思考，从记录到创作，一站式完成所有知识工作</p>
        <div className="mt-[80px] flex w-full flex-row gap-3">
          {STEP_LIST.map((item, index) => (
            <div key={index} className="flex w-1/4 flex-col gap-[25px]">
              <div className="flex items-center">
                <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#6E6BEE] text-[18px] font-semibold text-white">
                  {index + 1}
                </span>
                <span
                  style={{
                    background: 'linear-gradient(90deg, #6E6BEE 0%, rgba(110, 107, 238, 0.00) 100%)',
                  }}
                  className="h-[5px] flex-1"
                />
              </div>
              <h5 className="text-[20px] font-medium">{item.title}</h5>
              <p className={'text-[15px] text-[#848484]'}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeManagementPlatform;
