import Hero from '@/features/landing/components/hero';
import ProblemSection from '@/features/landing/components/problem-section';
import SolutionSection from '@/features/landing/components/solution-section';
import FeatureSection from '@/features/landing/components/feature-section';
import CTASection from '@/features/landing/components/cta-section';
import Footer from '@/components/footer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ThinkerAI - 新一代 AI 知识管理与创意工作空间',
  description:
    '连接你的想法，释放你的创造力。将零散信息转化为可视化知识网络，AI 助力深度思考。阅读、写作、思考的无缝整合。',
  keywords: ['AI', '知识管理', '思维导图', '笔记', '写作', '创意', '协作'],
  openGraph: {
    title: 'ThinkerAI - 连接你的想法，释放你的创造力',
    description: '新一代 AI 知识管理平台，让知识工作变得更加高效',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeatureSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
