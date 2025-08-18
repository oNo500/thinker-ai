'use client';

import { FileText, Brain, Clock, Search } from 'lucide-react';
import { motion } from 'framer-motion';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const problems = [
  {
    icon: FileText,
    title: '文档散落各处',
    description: '重要信息分散在不同平台，查找困难，整理费时',
  },
  {
    icon: Brain,
    title: '想法缺乏关联',
    description: '零散的思考无法形成体系，创新思维受限',
  },
  {
    icon: Clock,
    title: '工具切换频繁',
    description: '在多个应用间反复切换，时间浪费，效率低下',
  },
  {
    icon: Search,
    title: '信息孤岛效应',
    description: '无法发现知识间的潜在联系，缺少深度洞察',
  },
];

const ProblemSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="bg-gray-50 py-16 sm:py-24 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            信息时代的知识管理困境
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            现代知识工作者面临着前所未有的信息管理挑战
          </p>
        </motion.div>

        <motion.div ref={gridRef} className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={gridVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-800"
              >
                {/* Background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative">
                  <motion.div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </motion.div>

                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{problem.title}</h3>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{problem.description}</p>
                </div>

                {/* Decorative element */}
                <motion.div
                  className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-gradient-to-br from-red-200/50 to-orange-200/50 dark:from-red-800/30 dark:to-orange-800/30"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-800"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { stat: '73%', desc: '的知识工作者表示查找信息占用过多时间' },
              { stat: '5+', desc: '平均每天需要切换的工作应用数量' },
              { stat: '40%', desc: '的创意想法因为记录分散而丢失' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  className="text-3xl font-bold text-gray-900 dark:text-white"
                  initial={{ opacity: 0 }}
                  animate={statsVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                >
                  {item.stat}
                </motion.div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
