'use client';

import React from 'react';

import { Marquee } from '@/components/magicui/marquee';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Comment {
  id: number;
  user: {
    name: string;
    avatar?: string;
    role?: string;
  };
  content: string;
  rating: number;
  date: string;
}

const mockComments: Comment[] = [
  {
    id: 1,
    user: {
      name: '王芳',
      role: '自由职业者',
    },
    content:
      '作为一名自由撰稿人，我每天需要处理大量的文献和笔记。ThinkAI 的多源引用式回答功能真的太棒了！现在我可以快速找到相关资料，写作效率提升了至少200%。特别是划词提问功能，让我在阅读时能即时获得深入解析。',
    rating: 5,
    date: '2024-01-15',
  },
  {
    id: 2,
    user: {
      name: '陈雅洁',
      role: 'UI/UX设计师',
    },
    content:
      '作为设计师，我特别需要管理大量的设计灵感和资源。无限画布功能让我可以自由组织设计思路，而智能知识采集让我能一键保存看到的优秀设计案例。现在我的设计库变得井井有条，再也不用担心灵感丢失了！',
    rating: 5,
    date: '2024-01-14',
  },
  {
    id: 3,
    user: {
      name: '刘洋',
      role: '高中物理教师',
    },
    content:
      '思维导图功能真的革命性地改变了我的教学方式！我可以将复杂的物理概念用可视化的方式展现给学生，他们的理解速度明显提升。而且AI头脑风暴帮我设计了很多有趣的教学场景，学生们都很喜欢这种互动式学习。',
    rating: 5,
    date: '2024-01-13',
  },
  {
    id: 4,
    user: {
      name: '张三',
      role: '产品经理',
    },
    content:
      '本地优先的存储策略让我对数据安全完全放心，同时云同步功能确保我在任何设备上都能访问最新内容。MCP工作流拆解功能特别实用，帮我自动化了很多繁琐的调研工作，现在做竞品分析轻松多了。强烈推荐给所有产品人！',
    rating: 5,
    date: '2024-01-12',
  },
  {
    id: 5,
    user: {
      name: '李四',
      role: '全栈工程师',
    },
    content:
      'Agent深度协同功能让我印象最深刻！可以自主搭建专属的代码审查和文档生成工作流，大大减少了重复性工作。而且跨形态知识联动支持让我能统一管理技术文档、视频教程和代码片段，开发效率提升显著。',
    rating: 5,
    date: '2024-01-11',
  },
  {
    id: 6,
    user: {
      name: '赵敏',
      role: '市场运营总监',
    },
    content:
      'AI驱动结构化功能解决了我最大的痛点！以前整理市场调研报告要花费大量时间，现在AI能自动识别关联内容并生成框架。富文本编辑器的diff功能让团队协作更高效，再也不用担心版本混乱的问题了。',
    rating: 5,
    date: '2024-01-10',
  },
  {
    id: 7,
    user: {
      name: '孙小玲',
      role: '研究生',
    },
    content:
      '作为在读研究生，文献管理一直是我的大难题。智能标签和双链笔记功能帮我建立了完整的知识网络，现在写论文时能快速找到相关研究。AI问答功能更是学习神器，遇到不懂的概念立即就能得到详细解释！',
    rating: 5,
    date: '2024-01-09',
  },
  {
    id: 8,
    user: {
      name: '马强',
      role: '创业者',
    },
    content:
      '作为初创公司CEO，我需要快速学习各个领域的知识。ThinkAI的多模态知识管理让我能高效整合从播客、文章、视频中获取的信息。特别是AI头脑风暴功能，帮我从零散的想法中挖掘出了几个很有潜力的商业方向。',
    rating: 5,
    date: '2024-01-08',
  },
  {
    id: 9,
    user: {
      name: '林雪',
      role: '内容创作者',
    },
    content:
      '智能知识采集功能简直是内容创作者的福音！一键剪藏网页内容，AI自动去重和分类，让我的素材库变得井然有序。现在写文章时灵感不断，而且引用资料也更加准确和丰富。创作效率至少提升了3倍！',
    rating: 5,
    date: '2024-01-07',
  },
  {
    id: 10,
    user: {
      name: '王建国',
      role: '企业培训师',
    },
    content:
      '无限画布配合思维导图功能，让我的课程设计变得生动有趣。学员们可以直观看到知识点之间的连接关系，学习效果明显改善。而且支持团队协作，现在我们整个培训团队都在用这个工具共同开发课程内容。',
    rating: 5,
    date: '2024-01-06',
  },
];

interface UserCommentsCarouselProps {
  className?: string;
}

const UserCommentsCarousel: React.FC<UserCommentsCarouselProps> = ({ className }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={cn('text-lg', i < rating ? 'text-yellow-400' : 'text-gray-300')}>
        ★
      </span>
    ));
  };

  const CommentCard = ({ comment }: { comment: Comment }) => (
    <Card className="!h-50 mx-3 !w-80 flex-shrink-0 rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-md">
      <CardContent className="px-6">
        {/* 用户信息和评分 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-[#6e6bee]/10 text-sm font-medium text-[#6e6bee]">
                {comment.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-gray-900">{comment.user.name}</div>
              {comment.user.role && <div className="text-xs text-gray-500">{comment.user.role}</div>}
            </div>
          </div>

          {/* 评分 - 右侧显示 */}
          <div className="flex items-center gap-0.5">{renderStars(comment.rating)}</div>
        </div>

        {/* 评论内容 */}
        <p className="line-clamp-4 text-sm leading-relaxed text-gray-600">{comment.content}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className={cn('mx-auto w-[80%] px-4', className)}>
      {/* 使用 Marquee 实现持续滚动 */}
      <div className="relative overflow-hidden">
        <Marquee pauseOnHover className="[--duration:40s]">
          {mockComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </Marquee>

        {/* 左右淡入淡出效果 */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F7F9FB] to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F7F9FB] to-transparent"></div>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default UserCommentsCarousel;
