import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import Navbar from '@/components/navbar';
import Hero from '@/features/home/components/hero';
import KnowledgeNetworkSection from '@/features/home/components/knowledge-network-section';
import { queryClient } from '@/lib/query-client';
import KnowledgeDilemmaSection from '@/features/home/components/knowledge-dilemma-section';
import KnowledgeManagementPlatform from '@/features/home/components/knowledge-management-platform';
import CoreFeatureExperience from '@/features/home/components/core-feature-experience';

export default async function Home() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <Navbar />
        <main className="relative">
          <Hero />
          <KnowledgeDilemmaSection />
          <KnowledgeManagementPlatform />
          <CoreFeatureExperience />
          <KnowledgeNetworkSection />
        </main>
      </div>
    </HydrationBoundary>
  );
}
