'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

import { Title } from './title';
import { FreeButton } from './free-button';
import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8, Icon9, Icon10 } from '../assets/icons';
import Image1 from '../assets/images/image1.png';
import Image2 from '../assets/images/image2.png';
import Image3 from '../assets/images/image3.png';
import Image4 from '../assets/images/image4.png';
import Image5 from '../assets/images/image5.png';
import Image6 from '../assets/images/image6.png';
import Image7 from '../assets/images/image7.png';
import Image8 from '../assets/images/image8.png';
import Image9 from '../assets/images/image9.png';
import Image10 from '../assets/images/image10.png';

const CoreFeatureExperience: React.FC = () => {
  const [active, setActive] = useState(0);
  const FEATURE_LIST = [
    {
      title: '多源引用式回答',
      icon: <Icon1 active={active === 0} />,
      image: Image1,
      subTitle: ['AI 驱动多源知识问答，', '类cursor式全库交互'],
      list: [
        '支持引用节点、文章、文章片段等多类型知识，像 Cursor 一样基于整个知识库做上下文问答',
        '划词即可触发提问，AI 结合全量知识储备深度解析，答案更精准',
        '搭配预设指令模板 + 自定义 Agent，适配科研、企业等不同场景的交互需求',
      ],
    },
    {
      title: 'Agent深度协同',
      icon: <Icon2 active={active === 1} />,
      image: Image2,
      subTitle: ['多模型协同接力，', '自主搭建专属Agent'],
      list: [
        '文本节点直连模型节点，自主搭建专属 Agent 流程',
        '输入内容经多模型接力深度处理',
        '针对性处理文本片段，生成高度定制的专业成果（论文改写、行业分析报告 ）',
      ],
    },
    {
      title: 'MCP工作流拆解',
      icon: <Icon3 active={active === 2} />,
      image: Image3,
      subTitle: ['MCP配置助力，', 'AI 让操作自动化+可视化'],
      list: [
        '支持自主配置 MCP 能力，AI 智能拆解用户工作流',
        '模型可驱动浏览器操作（如搜索论文、下载文件至本地），替代手动执行',
        '全流程可视化呈现，知识获取与执行既自动化又透明可控',
      ],
    },
    {
      title: 'AI头脑风暴',
      icon: <Icon4 active={active === 3} />,
      image: Image4,
      subTitle: ['基于当前节点+知识库，', 'AI智能拓展创意'],
      list: [
        '基于当前节点与整个知识库双维度，AI 智能拓展创意方向',
        '快速将零散想法梳理成体系化灵感（如科研思路推导、内容创意延伸）',
        '无需手动整合，直接生成结构化灵感框架，助力创意高效落地',
      ],
    },
    {
      title: '无限画布',
      icon: <Icon5 active={active === 4} />,
      image: Image5,
      subTitle: ['无限画布，', '让你的思绪自由流动'],
      list: ['无限大的可视化工作空间', '直观的拖拽和连线操作', '富文本节点和自定义样式', '思维导图、流程图等多种结构'],
    },
    {
      title: '跨形态知识联动',
      icon: <Icon6 active={active === 5} />,
      image: Image6,
      subTitle: ['划词生成节点，', '多载体精准绑定跳转'],
      list: [
        'PDF/ 文本 / 视频统一管理，覆盖全形态知识资产',
        '划词自动生成思维导图节点，关联原文精准定位',
        '视频帧级定位、音频自动转写，精准提取关键信息',
      ],
    },
    {
      title: '智能知识采集',
      icon: <Icon7 active={active === 6} />,
      image: Image7,
      subTitle: ['AI预筛去重，', '让剪藏更自由高效'],
      list: [
        '插件 “一键剪藏” 全场景覆盖，搞定网页/片段/视频',
        'AI 预筛自动去重，避免重复采集',
        '采集即入库，告别零散整理流程',
      ],
    },
    {
      title: 'AI驱动结构化',
      icon: <Icon8 active={active === 7} />,
      image: Image8,
      subTitle: ['AI匹配知识相似度，', '关联推荐内容一步到位'],
      list: [
        'AI 深度挖掘跨形态知识关联，串联碎片化内容',
        '输入关键词，AI 基于知识库自动构建知识框架',
        '告别手动梳理，让知识结构化更智能',
      ],
    },
    {
      title: '富文本编辑',
      icon: <Icon9 active={active === 8} />,
      image: Image9,
      subTitle: ['AI 驱动内容对比整合，', '让创作更高效精准'],
      list: [
        '现代化编辑器支持 Markdown，专注内容创作流程',
        '实现模型回答与原始回答 diff 比对，清晰呈现内容差异',
        '支持用户自主选择保留片段，灵活整合优质内容 ，创作更高效',
      ],
    },
    {
      title: '智能标签',
      icon: <Icon10 active={active === 9} />,
      image: Image10,
      subTitle: ['双链笔记+标签', '告别混乱，玩转知识组织'],
      list: [
        '多维度标签赋能，实现 Dataview 式筛选与总结',
        '项目/分类管理，搭配灵活组织架构适配不同需求',
        '高效检索关联，快速定位目标知识，告别手动查找',
      ],
    },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#EFF1FF] pb-[900px] pt-[150px]">
      {/* 核心功能深度体验组件 */}
      <Title title="核心功能" subtitle="深度体验" description="每个功能都经过精心设计，为你的知识工作提供最佳体验" />
      <div className="relative mt-[50px] flex w-[843px] flex-wrap justify-between gap-y-6">
        {FEATURE_LIST.map((item, index) => {
          return (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => setActive(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActive(index);
                }
              }}
              className={cn(
                'flex h-[125px] w-[158px] cursor-pointer flex-col items-center justify-center rounded-[10px]',
                {
                  'bg-black text-white': active === index,
                },
              )}
            >
              <div className="flex flex-col items-center gap-4 font-medium">
                {item.icon}
                <p>{item.title}</p>
              </div>
              <div
                style={{
                  zIndex: active === index ? 10 : 1,
                }}
                className="-bottom-22 -translate-1/2 absolute left-1/2 flex w-[1604px] translate-y-[100%] flex-nowrap justify-between rounded-[20px] bg-[#fff] p-[61px]"
              >
                <div className="flex w-[390px] flex-col justify-center gap-[30px]">
                  <div className="text-[25px] font-bold leading-loose text-black">
                    {item.subTitle.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </div>
                  <ul className="list-disc space-y-2 pl-6 text-[16px] leading-loose text-[#000]">
                    {item.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                  <div>
                    <FreeButton />
                  </div>
                </div>
                <div>
                  <Image className="w-[950px]" src={item.image} alt={item.title} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoreFeatureExperience;
