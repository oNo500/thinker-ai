'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { ArrowRight, Check, Star, Users, BookOpen, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const pricingFeatures = [
  '无限画布和节点创建',
  'AI 智能对话和分析',
  'PDF 在线阅读和标注',
  '富文本编辑器',
  '项目和标签管理',
  '云端同步和备份',
];

const stats = [
  { icon: Users, value: '10,000+', label: '活跃用户' },
  { icon: BookOpen, value: '500万+', label: '处理文档' },
  { icon: Zap, value: '99.9%', label: '服务可用性' },
  { icon: Star, value: '4.9', label: '用户评分' },
];

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24 dark:from-blue-950/20 dark:via-gray-950 dark:to-purple-950/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Social Proof */}
        <motion.div ref={statsRef} className="mb-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center"
                >
                  <motion.div
                    className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                    initial={{ scale: 0 }}
                    animate={statsVisible ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1, type: 'spring' }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={ctaVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-1"
        >
          <div className="rounded-2xl bg-white p-8 sm:p-12 dark:bg-gray-900">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              {/* Left Column - Content */}
              <div>
                <motion.h2
                  className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={ctaVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  开始构建你的
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    知识网络
                  </span>
                </motion.h2>

                <motion.p
                  className="mt-4 text-lg text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={ctaVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  加入数万名知识工作者，体验全新的思考和创作方式
                </motion.p>

                {/* Features List */}
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {pricingFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={ctaVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </motion.div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column - Registration Form */}
              <div>
                <motion.div
                  className="rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-lg dark:from-gray-800 dark:to-gray-700"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">立即免费注册</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">无需信用卡，30天免费试用</p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="输入你的邮箱地址"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all hover:shadow-xl"
                        disabled={isSubmitted}
                      >
                        <motion.div
                          initial={false}
                          animate={isSubmitted ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5 }}
                          className="flex items-center justify-center"
                        >
                          {isSubmitted ? (
                            <>
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                                <Check className="mr-2 h-5 w-5" />
                              </motion.div>
                              注册成功！
                            </>
                          ) : (
                            <>
                              开始构建知识网络
                              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                                <ArrowRight className="ml-2 h-5 w-5" />
                              </motion.div>
                            </>
                          )}
                        </motion.div>
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ctaVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-950/30 dark:text-green-400"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="h-4 w-4" />
            30天免费试用 · 随时可取消 · 数据安全保障
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
